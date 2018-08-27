# OnlineMarketplace

## Overview

The purpose of this project is to create an online marketplace that operates on the blockchain. There are three types of accounts: admin, store owners, and customers. The admin will be the account that deploys the contract, and will have the ability to add store owners to the website as well as activate/ deactive the circuit breaker (which prevents purchases and withdrawals in case there is a bug). The store owners have the ability to create a store front and add products to their stores. They also have the ability to remove the products, change the price of the products and withdraw funds from the stores. Finally, customers can browse through the different stores and purchase any products that they want.

## Running the App

To run the app locally, first make sure ganache-cli and truffle are installed globally. In the terminal, run ```ganache-cli -l 20000000000``` ( the -l flag sets the gas limit; this is necessary because some of my contract functions exceed the default gas limit). In a separate window, type in ```truffle compile```, ```truffle migrate``` ```npm i``` and then ```npm start```. Finally, make sure to login to metamask with the provided seed from ganache-cli. The admin on the contract will be the first account in metamask (Account 1).

** Please note that for some of the contract functions, metamask incorrectly estimates the amount of gas needed to run it and will therefore return an 'out of gas' error. In instances like these, hit the edit button in metamask and raise the gas limit. **

** When adding products to a store, the contract will sometimes break (if you refresh the page everything seems to have disappeared, including the store). The only way to fix this is to go into Metamask settings and resetting the account.**

This webapp uses the UPort library to login, so please download the UPort app on your phone.

In order to switch accounts, please select a different account in metamask and make sure to refresh the page in order for the app to recognize the new account.

When adding images (i.e. for store fronts and products), it will take a while before the Metamask prompt shows up. This is because the webapp is storing the images on IPFS.


## Testing the App

To run tests, make sure ganache-cli is running first. Then type ```truffle compile```, ```truffle migrate``` and ```truffle test```.