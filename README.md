# Blockchain based online shopping cart: BC_CART

A simple demo application to demonstrate peer to peer communication between buyer and seller.
This demo run on ethereum blockchain,

## Installation

1. Install npm using
	sudo apt install nodejs
2. Install Truffle globally.
    ```javascript
    npm install -g truffle
    ```

2. Install ganache-cli( ethereum development blockchain) globally
    ```javascript
npm install -g ganache-cli
    ```
Ref: https://truffleframework.com/docs/ganache/quickstart

3. installing dependencies
    ```javascript
	npm install
    ```
4. Run the development console.
    Three steps (All are from linux terminal inside the bc_cart directory):
	>  ganache-cli
	> ./StartBC
>  npm run start

#Development Structure



	 |---- Home.js  |--------new.js : for new order bid placing : 
	 |		|
	 |----manage.js-|
	 |		|
	 |----User.js	|--------messages.js : for new requests for bid :
	 |		|
index.js-|----Dispatcher.js
	 |
	 |----Error.js
	 |
	 |----Maintanence.js

Contact:
babupallam@gmail.com
# BC_CART
