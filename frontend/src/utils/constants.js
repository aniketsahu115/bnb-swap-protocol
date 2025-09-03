// BSC Testnet Configuration
export const BSC_TESTNET_CONFIG = {
  chainId: 97,
  chainName: 'BSC Testnet',
  rpcUrl: 'https://data-seed-prebsc-1-s1.binance.org:8545/',
  blockExplorer: 'https://testnet.bscscan.com/',
  nativeCurrency: {
    name: 'BNB',
    symbol: 'BNB',
    decimals: 18,
  },
};

// Contract Addresses (BSC Testnet)
export const CONTRACT_ADDRESSES = {
  SWAP_HELPER: '0x65d31688983Fbc145216833E2b228d89193bb62b',
  PANCAKE_ROUTER: '0xD99D1c33F9fC3444f8101754aBC46c52416550D1',
  WBNB: '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',
  // Add more token addresses as needed
  BUSD: '0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7',
  USDT: '0x7ef95a0FEE0Dd31b22626fF2E1d8Abc8Df806Fdd',
};

// Token List for BSC Testnet
export const TESTNET_TOKENS = [
  {
    address: '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',
    symbol: 'WBNB',
    name: 'Wrapped BNB',
    decimals: 18,
    logoURI: 'https://tokens.pancakeswap.finance/images/0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c.png'
  },
  {
    address: '0x78867BbEeF44f2326bF8DDd1941a4439382EF2A7',
    symbol: 'BUSD',
    name: 'BUSD Token',
    decimals: 18,
    logoURI: 'https://tokens.pancakeswap.finance/images/0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56.png'
  },
  {
    address: '0x7ef95a0FEE0Dd31b22626fF2E1d8Abc8Df806Fdd',
    symbol: 'USDT',
    name: 'Tether USD',
    decimals: 18,
    logoURI: 'https://tokens.pancakeswap.finance/images/0x55d398326f99059fF775485246999027B3197955.png'
  }
];

// ABIs
export const ERC20_ABI = [
  'function balanceOf(address owner) view returns (uint256)',
  'function transfer(address to, uint256 amount) returns (bool)',
  'function approve(address spender, uint256 amount) returns (bool)',
  'function allowance(address owner, address spender) view returns (uint256)',
  'function symbol() view returns (string)',
  'function decimals() view returns (uint8)',
];

export const PANCAKE_ROUTER_ABI = [
  'function getAmountsOut(uint amountIn, address[] calldata path) external view returns (uint[] memory amounts)',
  'function swapExactTokensForTokens(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)',
  'function swapExactETHForTokens(uint amountOutMin, address[] calldata path, address to, uint deadline) external payable returns (uint[] memory amounts)',
  'function swapExactTokensForETH(uint amountIn, uint amountOutMin, address[] calldata path, address to, uint deadline) external returns (uint[] memory amounts)',
];

export const SWAP_HELPER_ABI = [
  'function swapTokens(address tokenIn, address tokenOut, uint256 amountIn, uint256 amountOutMin, address to) external',
  'function swapETHForTokens(address tokenOut, uint256 amountOutMin, address to) external payable',
  'function getAmountOut(address tokenIn, address tokenOut, uint256 amountIn) external view returns (uint256)',
  'function feePercent() external view returns (uint256)',
  'function FEE_DENOMINATOR() external view returns (uint256)',
  'function pancakeRouter() external view returns (address)',
  'function WBNB() external view returns (address)',
  'function updateFee(uint256 _feePercent) external',
  'function owner() external view returns (address)',
  'event TokenSwap(address indexed user, address indexed tokenIn, address indexed tokenOut, uint256 amountIn, uint256 amountOut, uint256 fee)'
];