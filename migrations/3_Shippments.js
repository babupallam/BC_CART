var Shipment = artifacts.require("Shipments");

module.exports = function(deployer) {
    deployer.deploy(Shipment);
};
  