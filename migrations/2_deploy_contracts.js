const OnlineMarketplace = artifacts.require("./OnlineMarketplace.sol");
const LibraryDemo = artifacts.require("./LibraryDemo.sol");
const SafeMath = artifacts.require("./SafeMath.sol");

module.exports = function(deployer) {
  deployer.deploy(SafeMath);
  deployer.deploy(OnlineMarketplace);
  deployer.link(SafeMath, LibraryDemo);
  deployer.deploy(LibraryDemo);
};
