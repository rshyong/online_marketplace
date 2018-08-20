pragma solidity ^0.4.17;

contract OnlineMarketplace {
  address private admin;

  /** List of store owners */
  mapping (address => bool) storeOwners;

  constructor() public {
    admin = msg.sender;
  }

  function addOwner(address newOwner) public {
    storeOwners[newOwner] = true;
  }

  function isOwner(address _address) public returns(bool) {
    return storeOwners[_address];
  }

  function() {
    revert();
  }
}