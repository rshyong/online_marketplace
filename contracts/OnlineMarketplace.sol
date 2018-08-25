pragma solidity ^0.4.17;

 /** @title Online Marketplace. */
contract OnlineMarketplace {

  /** @dev Address of admin. */
  address public admin;

  /** @dev Number of store owners */
  uint public numStoreOwners = 0;

  /** @dev Array of store owners */
  address[] public storeOwners;

  /** @dev Mapping of store owners to bool. Used to determine if address is new. */
  mapping(address => bool) public storeOwnersAddress;

  /** @dev Product struct. Contains price and quantity of the product. */
  struct Product{
    string name;
    uint price;
    uint quantity;
    string ipfsHash;
  }

  /** @dev Storefront struct. Contains name of store, image (stored as ipfs hash), funds, and a mapping to its products. */
  struct StoreFront{
    string name;
    string ipfsHash;
    uint funds;
    uint numProducts;
    mapping(string => Product) products;
  }

  /** @dev Mapping of store owners to number of storefronts. */
  mapping (address => uint) public numStoreFronts;

  /** @dev Mapping of store owners to a mapping of storefront name to ipfs hash string. */
  mapping (address => StoreFront[]) public storeFronts;

  /** @dev Emit when a new owner is added */
  event EventNewOwner(address indexed _address);

  /** @dev Emit when an owner is deleted */
  event EventDeleteOwner(address indexed _address);

  /** @dev Emit when a new storefront is added */
  event EventNewStoreFront(string indexed _storeName);

  /** @dev Emit when a storefront is deleted */
  event EventDeleteStoreFront(string indexed _storeName);
 
  /** @dev Emit when a product is added */
  event EventAddProduct(string indexed _productName);

  /** @dev Emit when a product is deleted */
  event EventDeleteProduct(string indexed _productName);

  /** @dev Modifier that checks to make sure the sender is an admin. */
  modifier checkAdmin() {
    require(msg.sender == admin);
    _;
  }
  
  /** @dev Modifier that checks to make the sender is an owner. */
  modifier checkOwner() {
    require(storeOwnersAddress[msg.sender]);
    _;
  }

  /** @dev Modifier that checks to make sure owner does not exist already. 
  * @param _address Address to be checked.
  */
  modifier checkNewOwner(address _address) {
    require(!storeOwnersAddress[_address]);
    _;
  }

  /** @dev Modifier that checks storefront name is unique. 
  * @param _name Storefront name to be checked.
  */
  modifier checkStoreFrontName(string _name) {
    bool checkName = true;
    for (uint i = 0; i < numStoreFronts[msg.sender]; i ++) {
      if (keccak256(storeFronts[msg.sender][i].name) == keccak256(_name)) {
        checkName = false;
        break;
      }
    }
    require(checkName);
    _;
  }

  /** @dev Modifier that checks storefront exists. 
  * @param _index Index of storefront to be checked.
  */
  modifier checkStoreFrontExists(uint _index) {
    require(keccak256(storeFronts[msg.sender][_index].name) != keccak256(''));
    _;
  }

  /** @dev Modifier that checks for integer underflow. */
  modifier checkIntegerUnderflow(uint _num) {
    require(_num - 1 < _num);
    _;
  }

  /** @dev Constructor function. Sets admin to be the contract owner. */
  constructor() public {
    admin = msg.sender;
  }
  
  /** @dev Adds an owner to the storeOwners mapping.
  * @param _address Address to be added as store owner.
  */
  function addOwner(address _address) public checkAdmin checkNewOwner(_address) {
    emit EventNewOwner(_address);
    numStoreOwners++;
    storeOwners.push(_address);
    storeOwnersAddress[_address] = true;
  }

  /** @dev Deletes an owner from the storeOwners mapping.
  * @param _index Index of the address to be deleted.
  */
  function deleteOwner(uint _index) public checkAdmin {
    address _address = storeOwners[_index];
    require (storeOwnersAddress[_address] && numStoreOwners - 1 < numStoreOwners);
    emit EventDeleteOwner(_address);
    storeOwnersAddress[_address] = false;
    delete storeOwners[_index];
    numStoreOwners--;
  }
  
  /** @dev Add a storefront.
  * @param _name Storefront name.
  * @param _ipfsHash Storefront image stored as IPFS hash.
  */
  function addStoreFront(string _name, string _ipfsHash) public checkOwner checkStoreFrontName(_name) {
    emit EventNewStoreFront(_name);
    storeFronts[msg.sender].push(StoreFront(_name, _ipfsHash, 0, 0));
    numStoreFronts[msg.sender]++;
  }

  /** @dev Delete a storefront.
  * @param _index Index of storefront to be deleted.
  */
  function deleteStoreFront(uint _index) public checkOwner checkStoreFrontExists(_index) checkIntegerUnderflow(numStoreFronts[msg.sender]) {
    string _name = storeFronts[msg.sender][_index].name;
    emit EventDeleteStoreFront(_name);
    delete storeFronts[msg.sender][_index];
    numStoreFronts[msg.sender]--;
  }

  /** @dev Converts uint to string.
  * @param i Integer to be converted to string.
  * @return Returns string.
  */
  function uint2str(uint i) internal pure returns (string){
    if (i == 0) return "0";
    uint j = i;
    uint length;
    while (j != 0){
        length++;
        j /= 10;
    }
    bytes memory bstr = new bytes(length);
    uint k = length - 1;
    while (i != 0){
        bstr[k--] = byte(48 + i % 10);
        i /= 10;
    }
    return string(bstr);
  }

  /** @dev Add a product to storefront.
  * @param _index Index of storefront where product is to be sold.
  * @param _name Name of product.
  * @param _price Price of product.
  * @param _quantity Quantity of product to be sold.
  */
  function addProduct(uint _index, string _name, uint _price, uint _quantity, string _ipfsHash) public checkOwner checkStoreFrontExists(_index) {
    require(_price > 0 && _quantity > 0);
    emit EventAddProduct(_name);
    uint numProducts = storeFronts[msg.sender][_index].numProducts;
    string memory num = uint2str(numProducts);
    storeFronts[msg.sender][_index].products[num].name = _name;
    storeFronts[msg.sender][_index].products[num].price = _price;
    storeFronts[msg.sender][_index].products[num].quantity = _quantity;
    storeFronts[msg.sender][_index].products[num].ipfsHash = _ipfsHash;
    storeFronts[msg.sender][_index].numProducts++;
  }

  /** @dev Get product from storefront.
  * @param _index Index of storefront where product is to be sold.
  * @param _num Index of product.
  */
  function getProduct(uint _index, string _num) public view returns (string, uint, uint) {
    return (storeFronts[msg.sender][_index].products[_num].name, storeFronts[msg.sender][_index].products[_num].price, storeFronts[msg.sender][_index].products[_num].quantity);
  }

  /** @dev Fallback function. */
  function() public {
    revert();
  }
}