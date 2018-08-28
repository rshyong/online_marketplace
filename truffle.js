const HDWalletProvider = require('truffle-hdwallet-provider');
const mnemonic = 'direct valid old noise concert matter program add bread valley world stuff';

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },
    rinkeby: {
      provider: function() {
        return new HDWalletProvider(mnemonic,'https://rinkeby.infura.io/v3/5684a86d349743b0a30e8ba536290c60');
      },
      network_id: 1
    }
  }
};