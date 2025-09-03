// Deployment Configuration
// This file contains the deployed contract addresses and related information

export const DEPLOYMENT_CONFIG = {
  BSC_TESTNET: {
    SWAP_HELPER: '0x65d31688983Fbc145216833E2b228d89193bb62b',
    DEPLOYMENT_TX: '0xdda9bc794dbeeb897c907de6a4822765f302e9925a19da418963a4af7e6c1df4',
    DEPLOYMENT_TIME: '2025-09-03T10:33:42.216Z',
    VERIFIED: false, // Set to true after contract verification
  },
  
  // Future deployments can be added here
  BSC_MAINNET: {
    SWAP_HELPER: '', // To be filled when deployed to mainnet
    DEPLOYMENT_TX: '',
    DEPLOYMENT_TIME: '',
    VERIFIED: false,
  }
};

// Export current network config based on environment
export const getCurrentDeployment = (chainId) => {
  switch (chainId) {
    case 97: // BSC Testnet
      return DEPLOYMENT_CONFIG.BSC_TESTNET;
    case 56: // BSC Mainnet
      return DEPLOYMENT_CONFIG.BSC_MAINNET;
    default:
      return DEPLOYMENT_CONFIG.BSC_TESTNET; // Default to testnet
  }
};
