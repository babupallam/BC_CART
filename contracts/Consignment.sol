  pragma solidity ^0.4.21;
contract Shipments {
    address[] public deployedConsignments;
    address public dispatcher;
    uint orderid;
    
    constructor() public payable{
        dispatcher = msg.sender;
    }
    
    function createConsignment(string good, uint price,uint quantity_available) public returns(address) {
        orderid++;
        address newConsignment = new Consignment(good,price,quantity_available,orderid,msg.sender,dispatcher);
        deployedConsignments.push(newConsignment);
        return newConsignment;
    }
    
    function getDeployedConsignments() public view returns (address[]) {
        return deployedConsignments;
    }
}
contract Consignment {

  address public owner;//seller
  address public buyerAddr;//buyer
  address public dispatcher;//dispatcher
  
  struct Shipment {
    address dispatcher;
    uint price; 
    uint quantity;
    uint safepay;
    uint date;
    bool init;
  }
  struct Order {
    uint orderid;
    string goods;
    uint quantity_available;
    uint price; 
    uint safepay;
    Shipment shipment;
    bool init;
  }
  struct Invoice {
    uint orderid; 
    bool init;
  }
  
  Order order ;
  Invoice invoice;

  /// The smart contract's constructor 
  constructor(string good,uint price,uint quantity_available,uint orderid,address creator,address dispatch) public payable {
    /// The seller is the contract's owner
    owner = creator;
    dispatcher = dispatch;
    order.orderid = orderid;
    order.goods = good;
    order.price = price;
    order.quantity_available = quantity_available;
  }

  //by anyone who want to buy that stuff
  function sendOrder(uint quantity_needed) payable public {
    buyerAddr = msg.sender;
    order = Order(order.orderid,order.goods, order.quantity_available,order.price, 0, Shipment(0,0,quantity_needed, 0, 0, false), true);

  }

  /// The function to query orders by orderid
  ///   Constant functions returns custom fields
  function queryOrder() constant public returns (address buyer, string goods, uint quantity, uint price, uint safepay, uint delivery_price, uint delivey_safepay) {
    
    /// Validate the order number
    require(order.init == true ,"The order has to be initiated");

    /// Return the order data
    return(buyerAddr, order.goods, order.shipment.quantity, order.price, order.safepay, order.shipment.price, order.shipment.safepay);
  }

  /// The function to send shipping cost by the dispatcher
  ///  requires fee
  function sendShippingCost(uint price) payable public {
  
    require(msg.sender == dispatcher,"Only dispatcher can call this");

    /// Validate the order
    require(order.init);
    order.shipment.price = price;
    order.shipment.init  = true;

  }

  /// The function to send the value of order's price
  ///  This value will be blocked until the delivery of order
  ///  requires fee
  function sendSafepay() payable public {

    /// Validate the order number
    require(order.init);

    /// Just the buyer can make safepay
    require(buyerAddr == msg.sender, "Only Buyer can call this");

    /// The order's value plus the shipment value must equal to msg.value
    require((order.price + order.shipment.price) == msg.value, "You have to send sum of product cost and shipping cost");

    order.safepay = order.price;
    order.shipment.safepay = order.shipment.price;
  }

  /// The function to send the invoice data
  ///  requires fee
  function sendInvoice(uint delivery_date) payable public {

    /// Validate the order
    require(order.init);

    /// Just the seller can send the invoice
    require(owner == msg.sender,"Only seller can call this function");

    /// Create then Invoice instance and store it
    invoice = Invoice(order.orderid, true);

    /// Update the shipment data
    order.shipment.date    = delivery_date;
    order.shipment.dispatcher = dispatcher;
  }

  /// The function to get the sent invoice
  ///  requires no fee
  function getInvoice() constant public returns (address buyer, uint orderno, uint delivery_date, address dispatch){
  
    /// Validate the invoice 
    require(invoice.init == true, "Invoice hasn't set");
    
    return (buyerAddr, order.orderid, order.shipment.date, order.shipment.dispatcher);
  }

  /// The function to mark an order as delivered
  function delivery(uint orderid) payable public {

    /// Validate the invoice 
    require(invoice.init == true, "Invoce hasn't created");
    /// Just the courier can call this function
    require(order.shipment.dispatcher == msg.sender, " Only dispatcher can call this function");
    /// Payout the Order to the seller
    owner.transfer(order.safepay);

    /// Payout the Shipment to the courier
    order.shipment.dispatcher.transfer(order.shipment.safepay);

  }

}

