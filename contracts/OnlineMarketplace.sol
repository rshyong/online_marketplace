pragma solidity ^0.4.17;

contract OnlineMarketplace {
  /** This is the admin */
  address private admin;

  /** Array of store owners */
  address[] storeOwnersArray;

  /** Mapping of store owners. Used to see if specific address is a store owner. */
  mapping (address => bool) storeOwners;

  /** Emit when a new owner is added */
  event newOwner(address indexed _address);

  /** Checks to make sure user is admin. */
  modifier checkAdmin() {
    require(msg.sender == admin);
    _;
  }
  
  /** Checks to make sure owner does not exist already. */
  modifier checkNewOwner(address _address) {
    require(!storeOwners[_address]);
    _;
  }

  constructor() public {
    admin = msg.sender;
  }
  
  function addOwner(address _address) public checkAdmin checkNewOwner(_address) {
    emit newOwner(_address);
    storeOwners[_address] = true;
    storeOwnersArray.push(_address);
  }

  function isOwner() public view returns(bool) {
    return storeOwners[msg.sender];
  }

  function isAdmin() public view returns(bool) {
    return msg.sender == admin;
  }

  function getOwners() public view checkAdmin returns(address[]) {
    return storeOwnersArray;
  }

  function() public {
    revert();
  }
}