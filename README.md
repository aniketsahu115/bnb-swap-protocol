# BNB Swap Protocol

A decentralized token swap application for BNB Smart Chain that provides a user-friendly interface for swapping tokens with reduced fees.

## Features

**Token Swapping**: Swap any BEP-20 tokens through PancakeSwap Router
**Real-time Pricing**: Get live price quotes and slippage protection
**Wallet Integration**: Connect with MetaMask and other Web3 wallets
**Responsive Design**: Works seamlessly on desktop and mobile
**Fee Structure**: Built-in fee mechanism for sustainable operations
**Transaction History**: Track your swap history
**Slippage Protection**: Customizable slippage tolerance
**Multi-token Support**: Support for popular BSC tokens

## Tech Stack

**Frontend**: React.js + Vite + Tailwind CSS
**Blockchain**: BNB Smart Chain (BSC Testnet & Mainnet)
**Smart Contracts**: Solidity with Hardhat
**Web3 Integration**: ethers.js v6
**DEX Integration**: PancakeSwap Router V2

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm or yarn
- MetaMask browser extension
- Git

## Installation & Setup

1. **Clone the repository**
```bash
git clone https://github.com/aniketsahu115/bnb-swap-protocol
cd bnb-swap-protocol
```

2. **Install dependencies**
```bash
npm run install
cd frontend
npm install
cd ..
```

3. **Environment Setup**
Create a `.env` file in the root directory:
```bash
PRIVATE_KEY=your_private_key_here
BSCSCAN_API_KEY=your_bscscan_api_key_here(Optional for Verification)
```

4. **Smart Contract Commands**

```bash
# Compile contracts
npm run compile

# Run tests
npm test

# Deploy to BSC Testnet
npm run deploy:testnet

# Deploy to BSC Mainnet
npm run deploy:mainnet

# Verify contract
npm run verify
```

5. **Configure Frontend**

Update `frontend/src/utils/constants.js` with your deployed contract address:

```bash
export const CONTRACT_ADDRESSES = {
  SWAP_HELPER: 'YOUR_DEPLOYED_CONTRACT_ADDRESS', // Add this line
  PANCAKE_ROUTER: '0xD99D1c33F9fC3444f8101754aBC46c52416550D1',
  WBNB: '0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd',
  // ... other addresses
};
```

6. **Run the Application**

```bash
# Start the frontend development server
cd frontend
npm run dev
```
The application will be available at http://localhost:3000

## Local Blockchain Development
```bash 
Start a local Hardhat node
npx hardhat node

# Deploy to local network
npx hardhat run scripts/deploy.js --network localhost
```

# Smart Contract Details
`SwapHelper.sol`
The main contract that facilitates token swaps through PancakeSwap Router:

- Fee Structure: 0.25% default fee (configurable by owner)
- Slippage Protection: Ensures minimum output amount
- Multi-path Routing: Supports direct and multi-hop swaps
- Emergency Functions: Owner can update parameters
**Key Functions**
```bash
function swapTokens(
    address tokenIn,
    address tokenOut,
    uint256 amountIn,
    uint256 amountOutMin,
    address to
) external nonReentrant

function swapETHForTokens(
    address tokenOut,
    uint256 amountOutMin,
    address to
) external payable nonReentrant

function getAmountOut(
    address tokenIn,
    address tokenOut,
    uint256 amountIn
) external view returns (uint256)
```

## Network Configuration

**BSC Testnet**
- **Chain ID**: 97
- **RPC URL**: https://data-seed-prebsc-1-s1.binance.org:8545/
- **Block Explorer**: https://testnet.bscscan.com/
- **Faucet**: https://testnet.binance.org/faucet-smart

**BSC Mainnet**
- **Chain ID**: 56
- **RPC URL**: https://bsc-dataseed1.binance.org/
- **Block Explorer**: https://bscscan.com/

### Getting Test Tokens

- Get Test BNB: Visit BSC Testnet Faucet
- Get Test Tokens: Use PancakeSwap Testnet to swap BNB for test tokens
- Add Custom Tokens: Import token addresses in MetaMask

## Deployed Contracts

### BSC Testnet
- **SwapHelper Contract**: `0x65d31688983Fbc145216833E2b228d89193bb62b`
- **Deployment Transaction**: `0xdda9bc794dbeeb897c907de6a4822765f302e9925a19da418963a4af7e6c1df4`
- **Deployed on**: September 3, 2025

### Contract Addresses
- **PancakeSwap Router**: `0xD99D1c33F9fC3444f8101754aBC46c52416550D1`
- **WBNB**: `0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd`

## Project Structure

```
bnb-swap-protocol/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── WalletConnection.jsx
│   │   │   ├── TokenSelector.jsx
│   │   │   ├── SwapInterface.jsx
│   │   │   └── TransactionHistory.jsx
│   │   ├── hooks/
│   │   │   ├── useWallet.js
│   │   │   ├── useSwap.js
│   │   │   └── useTokens.js
│   │   ├── utils/
│   │   │   ├── constants.js
│   │   │   ├── contracts.js
│   │   │   └── helpers.js
│   │   ├── contexts/
│   │   │   └── Web3Context.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
├── contracts/
│   ├── SwapHelper.sol
│   └── interfaces/
│       └── IERC20.sol
├── scripts/
│   └── deploy.js
├── hardhat.config.js
├── package.json
└── README.md
```
## Contributing

- Fork the repository
- Create a feature branch (git checkout -b feature/amazing-feature)
- Commit your changes (git commit -m 'Add amazing feature')
- Push to the branch (git push origin feature/amazing-feature)
- Open a Pull Request

## Development Guidelines

- Follow the existing code style
- Add tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting

 ## Support
For support and questions:

- GitHub Issues: Create an issue
- Discord: Join the BNB Chain Discord
- Twitter: Follow @aniketsahu115