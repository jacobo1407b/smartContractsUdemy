const HDWalletProvider = require('truffle-hdwallet-provider');
const nemonic='bubble cheese dose until twelve chaos shadow cousin seed cushion estate walnut';
module.exports = {
  networks: {
    development: {      
      host: 'localhost',
      port: 7545,
      network_id: '*',
      gas: 5000000
    },
    rinkeby:{
      provider: ()=> new HDWalletProvider(nemonic,"https://rinkeby.infura.io/v3/e6ece3210d6d43e7b4649afb1a116f40" ),
     network_id:4
    }
  }

}