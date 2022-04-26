const networks = require('./hardhat.networks');

const RNGBlockhashRinkeby = require('@wooy/rng-contracts/deployments/rinkeby/RNGBlockhash.json');
const RNGBlockhashKovan = require('@wooy/rng-contracts/deployments/kovan/RNGBlockhash.json');

require('@nomiclabs/hardhat-waffle');
require('hardhat-deploy');
require('hardhat-deploy-ethers');
require('solidity-coverage');
require('@nomiclabs/hardhat-etherscan');
require('hardhat-abi-exporter');
require('hardhat-gas-reporter');

const testnetAdmin = '0x0B51b19cf415ea06B613d35397c5F6041aB60c50'; // Account 1
const testnetUser1 = '0xeedDf4937E3A7aBe03E08963C3c20affbD770b51'; // Account 3
const testnetUser2 = '0xcE53382F96FdE0DB592574ed2571B3307dB859Ce'; // Account 4
const testnetUser3 = '0x381843c8b4a4a0Da3C0800708c84AA2d792D22b1'; // Account 5

const optimizerEnabled = !process.env.OPTIMIZER_DISABLED;

const config = {
  solidity: {
    version: '0.6.12',
    settings: {
      optimizer: {
        enabled: optimizerEnabled,
        runs: 200,
      },
      evmVersion: 'istanbul',
    },
  },
  networks,
  gasReporter: {
    currency: 'USD',
    gasPrice: 1,
    enabled: process.env.REPORT_GAS ? true : false,
  },
  namedAccounts: {
    deployer: {
      default: 0,
    },
    pool: {
      default: '0x0cEC1A9154Ff802e7934Fc916Ed7Ca50bDE6844e',
    },
    comptroller: {
      1: '0x4027dE966127af5F015Ea1cfd6293a3583892668',
      77: '0x14e194Cf5E1dd73BB46256495aEa8ff36A7Aa454',
    },
    reserveRegistry: {
      1: '0x680b6b5c1BDd9dFbcC4a5F26a41CFB1a9adbB582', // mainnet
      4: '0xdd0b4dB77A2A3245Acbaa653a81357fC1Be6f350', //"0x711c15464a6e498002b608245917fD8a32652fA0", // rinkeby
      42: '0xDc029CE0C9246b0412aCCd09fff48ec97888d340', // kovan
      42220: '', // celo
      44787: '0xf56a3Fd95d01a0D38014dA249E48055a8a5ff6C1', // celo testnet
      80001: '0x223e8043d33e9c4ccc38409CaAE7f62CB0F07a03', // mumbai
    },
    rng: {
      1: '',
      42: RNGBlockhashKovan.address,
      4: RNGBlockhashRinkeby.address,
    },
    admin: {
      1: '0x0749Ecf975f402ec09858c4fc1600385F0A150E6',
      42: testnetAdmin,
      4: testnetAdmin,
      3: testnetAdmin,
      137: '0x0749Ecf975f402ec09858c4fc1600385F0A150E6',
    },
    testnetUser1: {
      default: testnetUser1,
      3: testnetUser1,
      4: testnetUser1,
      42: testnetUser1,
    },
    testnetUser2: {
      default: testnetUser2,
      3: testnetUser2,
      4: testnetUser2,
      42: testnetUser2,
    },
    testnetUser3: {
      default: testnetUser3,
      3: testnetUser3,
      4: testnetUser3,
      42: testnetUser3,
    },
    sablier: {
      1: '0xA4fc358455Febe425536fd1878bE67FfDBDEC59a',
      3: '0xc04Ad234E01327b24a831e3718DBFcbE245904CC',
      4: '0xc04Ad234E01327b24a831e3718DBFcbE245904CC',
      5: '0x590b3974533141a44a89033deEcf932F52fcFDea',
      42: '0xc04Ad234E01327b24a831e3718DBFcbE245904CC',
    },
    testnetCDai: {
      4: '0x6d7f0754ffeb405d23c51ce938289d4835be3b14',
      42: '0xf0d0eb522cfa50b716b3b1604c4f0fa6f04376ad',
    },
    //Specific address of pooltogether's contracts, used when deploying the reduced version.
    PTcompoundPrizePoolProxyFactory: {
      1: '0xFb92015f58B239296c9F13003b75D3B7CFB1111e', // mainnet
      4: '0x766b62E17AE78d095D3505d779741B1b5647d773', // rinkeby
      137: '0x20b0bBDe753A85860dAe49130C33452bffBec8A0', // matic
      80001: '0xE2ba9bEA2D8fcE8Fee675B13951e5A0aC886c9D0', // mumbai
    },
    PTyieldSourcePrizePoolProxyFactory: {
      1: '0x0835c8C4Ab282B5dBF06d59E1489eF17F1c40D96', // mainnet
      4: '0xD6073119B123859A0e390865A5630E0bB4E2670C', // rinkeby
      137: '0x447838A9A11F7190C9F7E65C43bE685CD8109962', // matic
      80001: '0x17445F57ea2779dDa88Fce2bc4f58a245F9013DC', // mumbai
    },
    PTstakePrizePoolProxyFactory: {
      1: '0x166F6240a5560a34352b054468Deb85042c85142', // mainnet
      4: '0x2318b6B9C517cb42D2efaF61195966f8Dc073758', // rinkeby
      137: '0x97762742Aea8CC2C54c368AACB9E1bf8aAD8F17b', // matic
      80001: '0xfDA63A69F08c02F1B1ce46c57ebe010C303bacD0', // mumbai
    },
    PTmultipleWinnersBuilder: {
      1: '0x10f61a36e1327036E5E416D52ff0f4b5c9EfAAA3', // mainnet
      4: '0x1020C38d8fa2ce7aF3235e7Dfbf974aC046bCb24', // rinkeby
      137: '0xD1A6515AAF261F5BF5D00bf3311ca325D32ed5A0', // matic
      80001: '0x335d7C74b174Edb2a2aB9717A2f2b42D0EC1b0c3', // mumbai
    },
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  mocha: {
    timeout: 30000,
  },
  abiExporter: {
    path: './abis',
    clear: true,
    flat: true,
  },
};

module.exports = config;
