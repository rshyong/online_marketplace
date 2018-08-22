pragma solidity ^0.4.17;

contract OnlineMarketplace {
  address private admin;

  /** List of store owners */
  mapping (address => bool) storeOwners;

  event newOwner(address indexed _address);

  constructor() public {
    admin = msg.sender;
  }

  function addOwner(address _address) public {
    emit newOwner(_address);
    storeOwners[_address] = true;
  }

  function isOwner(address _address) public returns(bool) {
    return storeOwners[_address];
  }

  function() {
    revert();
  }
}