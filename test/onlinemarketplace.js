/**
 * The tests below are covering the basic functionalities of my ecommerce webapp. 
 * This includes being able to add store owners, stores, products within the stores, as well as buying the products and withdrawing the funds.
 * The tests also check to make sure the modifiers are working properly, specifically checkAdmin and checkOwner.
 * Finally, I tested the circuit breaker functions isEmergency and isSafe to make sure they work properly.
 * I wrote these tests to cover most of the important functions that the website would need.
 */

const OnlineMarketplace = artifacts.require("./OnlineMarketplace.sol");

contract('OnlineMarketplace', function(accounts) {
  const admin = accounts[0];
  const owner = accounts[1];
  const customer = accounts[2];

  it('should add an owners address to the array', async function() {
    let onlineMarketplaceInstance = await OnlineMarketplace.deployed();
    await onlineMarketplaceInstance.addOwner(accounts[1], {from: admin, });
    let owner = await onlineMarketplaceInstance.storeOwners(0, {from: admin, });
    assert.equal(owner, accounts[1]);
  });

  it('checkAdmin modifier: only let admin add to the owners array', async function() {
    let onlineMarketplaceInstance = await OnlineMarketplace.deployed();
    let errorMsg = 'Only admins can add to owners array';
    try {
      await onlineMarketplaceInstance.addOwner(customer, {from: owner, });
      assert.fail(errorMsg);
    } catch (e) {
      assert.notEqual(e.actual, errorMsg, errorMsg);
    }
  });

  it('testing circuit breaker functions', async function() {
    let onlineMarketplaceInstance = await OnlineMarketplace.deployed();
    let beforeEmergency = await onlineMarketplaceInstance.stopped({ from: admin, });
    await onlineMarketplaceInstance.isEmergency({from: admin, });
    let afterEmergency = await onlineMarketplaceInstance.stopped({ from: admin, });
    await onlineMarketplaceInstance.isSafe({from: admin, });
    let afterSafe = await onlineMarketplaceInstance.stopped({ from: admin, });
    assert.equal(beforeEmergency, false);
    assert.equal(afterEmergency, true);
    assert.equal(afterSafe, false);
  });

  it('adding a store', async function() {
    let onlineMarketplaceInstance = await OnlineMarketplace.deployed();
    await onlineMarketplaceInstance.addStoreFront('store1', 'ipfsHash', {from: owner, });
    let storefront = await onlineMarketplaceInstance.storeFronts(owner, 0, {from: owner, });
    assert.equal(storefront[0], 'store1');
  });

  it('checkOwner modifier: only owners can add store', async function() {
    let onlineMarketplaceInstance = await OnlineMarketplace.deployed();
    let errorMsg = 'Only owners can add store';
    try {
      await onlineMarketplaceInstance.addStoreFront('store1', 'ipfsHash', {from: admin, });
      assert.fail(errorMsg);
    } catch (e) {
      assert.notEqual(e.actual, errorMsg, errorMsg);
    }
  });

  it('add a product to a store', async function() {
    let onlineMarketplaceInstance = await OnlineMarketplace.deployed();
    await onlineMarketplaceInstance.addProduct(0, 'product1', web3.toWei(1, 'ether'), 10, 'ipfsHash', { from: owner, });
    let product = await onlineMarketplaceInstance.getProduct(owner, 0, '0');
    assert.equal(product[0], 'product1');
  });

  it('can buy a product and the funds go to the right store', async function() {
    let onlineMarketplaceInstance = await OnlineMarketplace.deployed();
    await onlineMarketplaceInstance.buyProduct(owner, 0, '0', 2, {from: customer, value: web3.toWei(2, 'ether'), });
    let product = await onlineMarketplaceInstance.getProduct(owner, 0, '0');
    let storefront = await onlineMarketplaceInstance.storeFronts(owner, 0, {from: owner, });
    assert.equal(product[2], 8);
    assert.equal(storefront[2].toNumber(), web3.toWei(2, 'ether'));
  });

  it('can change price of product', async function() {
    let onlineMarketplaceInstance = await OnlineMarketplace.deployed();
    await onlineMarketplaceInstance.changePrice(0, '0', 30, {from: owner, });
    let product = await onlineMarketplaceInstance.getProduct(owner, 0, '0');
    assert.equal(product[1].c[0], 30);
  });

  it('can withdraw funds from store', async function() {
    let onlineMarketplaceInstance = await OnlineMarketplace.deployed();
    let beforeBalance = web3.eth.getBalance(owner);
    await onlineMarketplaceInstance.withdrawFunds(0, {from: owner, });
    let afterBalance = web3.eth.getBalance(owner);
    let storefront = await onlineMarketplaceInstance.storeFronts(owner, 0, {from: owner, });
    assert.equal(storefront[2].c[0], 0);
    let difference = (afterBalance - beforeBalance) / web3.toWei(1, 'ether');
    assert.isAbove(difference, 1.9);
  });
});