const accounts = process.env.PRIVATE_KEY
  ? [process.env.PRIVATE_KEY]
  : {
      mnemonic: process.env.HDWALLET_MNEMONIC,
    };
const networks = {
  coverage: {
    url: 'http://127.0.0.1:8555',
    blockGasLimit: 200000000,
    allowUnlimitedContractSize: true,
  },
  localhost: {
    chainId: 1337,
    url: 'http://127.0.0.1:8545',
    allowUnlimitedContractSize: true,
    timeout: 1000 * 60,
  },
};

if (process.env.ALCHEMY_URL && process.env.FORK_ENABLED) {
  networks.hardhat = {
    allowUnlimitedContractSize: true,
    chainId: 1,
    forking: {
      url: process.env.ALCHEMY_URL,
    },
    accounts,
  };
  if (process.env.FORK_BLOCK_NUMBER) {
    networks.hardhat.forking.blockNumber = parseInt(process.env.FORK_BLOCK_NUMBER);
  }
} else {
  networks.hardhat = {
    allowUnlimitedContractSize: true,
  };
}

if (process.env.HDWALLET_MNEMONIC || process.env.PRIVATE_KEY) {
  networks.xdai = {
    chainId: 100,
    url: 'https://rpc.xdaichain.com/',
    accounts,
  };
  networks.poaSokol = {
    chainId: 77,
    url: 'https://sokol.poa.network',
    accounts,
  };
  networks.mumbai = {
    chainId: 80001,
    url: 'https://rpc-mumbai.maticvigil.com',
    accounts,
  };
  networks.bsc = {
    chainId: 56,
    url: 'https://bsc-dataseed.binance.org',
    accounts,
  };
  networks.bscTestnet = {
    chainId: 97,
    url: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
    accounts,
  };
  networks.celo = {
    chainId: 42220,
    url: 'https://forno.celo.org',
    accounts,
  };
  networks.celoTestnet = {
    chainId: 44787,
    url: 'https://alfajores-forno.celo-testnet.org',
    accounts,
  };
}

if (process.env.INFURA_API_KEY && (process.env.HDWALLET_MNEMONIC || process.env.PRIVATE_KEY)) {
  networks.kovan = {
    url: `https://kovan.infura.io/v3/${process.env.INFURA_API_KEY}`,
    accounts,
  };
  networks.matic = {
    chainId: 137,
    url: `https://polygon-mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
    accounts,
  };

  networks.ropsten = {
    url: `https://ropsten.infura.io/v3/${process.env.INFURA_API_KEY}`,
    accounts,
  };

  networks.rinkeby = {
    url: `https://rinkeby.infura.io/v3/${process.env.INFURA_API_KEY}`,
    accounts,
  };

  networks.mainnet = {
    url: `https://mainnet.infura.io/v3/${process.env.INFURA_API_KEY}`,
    accounts,
  };
} else {
  console.warn('No infura or hdwallet available for testnets');
}

module.exports = networks;
