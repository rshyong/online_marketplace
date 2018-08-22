pragma solidity ^0.4.17;

contract OnlineMarketplace {
  /** This is the admin */
  address private admin;

  /** Number of store owners */
  uint public numOwners = 0;

  /** List of store owners */
  mapping (uint => address) public storeOwners;

  /** Emit when a new owner is added */
  event newOwner(address indexed _address);

  modifier AdminCheck() {
    require(msg.sender == admin);
    _;
  }

  constructor() public {
    admin = msg.sender;
  }

  function addOwner(address _address) public AdminCheck() {
    emit newOwner(_address);
    storeOwners[numOwners] = _address;
    numOwners++;
  }

  function isOwner() public view returns(bool) {
    return storeOwners[msg.sender];
  }

  function isAdmin() public view returns(bool) {
    return msg.sender == admin;
  }

  function() public {
    revert();
  }
}