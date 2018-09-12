# OnlineMarketplace

## Overview

The purpose of this project is to create an online marketplace that operates on the blockchain. There are three types of accounts: admin, store owners, and customers. The admin will be the account that deploys the contract, and will have the ability to add store owners to the website as well as activate/ deactive the circuit breaker (which prevents purchases and withdrawals in case there is a bug). The store owners have the ability to create a store and add products to their stores. They also have the ability to remove the products, change the price of the products and withdraw funds from the stores. Finally, customers can browse through the different stores and purchase any products that they want.

## Running the App

To run the app locally, first make sure ganache-cli and truffle are installed globally. 

```npm i -g truffle ganache-cli```

Then download all the node modules.

``` npm i ```

Once that is done, run 

```ganache-cli -l 20000000000```

The -l flag sets the gas limit; this is necessary because some of the contract functions exceed the default gas limit. 

Then run 

```
truffle compile
truffle migrate
npm start
```

to start the app. 

Finally, make sure to login to metamask with the provided seed from ganache-cli. Remember to reset the account in order to prevent nonce mismatch errors. The admin on the contract will be the first account in metamask (Account 1).

**Please note that for some of the contract functions (deleting products and withdrawing funds), metamask incorrectly estimates the amount of gas needed to run it and will therefore return an 'out of gas' error. In instances like these, hit the edit button in metamask and raise the gas limit.**

**If there are any issues with the webapp, try going into the Metamask settings and resetting the account.**

This webapp uses the UPort library to login, so please download the UPort app on your phone.

In order to switch accounts, please select a different account in Metamask and make sure to refresh the page in order for the app to recognize the new account.

When adding images (i.e. for store fronts and products), it will take a while before the Metamask prompt shows up. This is because the webapp is storing the images on IPFS.


## Testing the App

To run tests, make sure ganache-cli is running first. Then type ```truffle compile```, ```truffle migrate``` and ```truffle test```.
