# BNB Swap Protocol

A decentralized token swap application for BNB Smart Chain that provides a user-friendly interface for swapping tokens with reduced fees.

## Features

- 🔄 Token-to-token swaps
- 💰 ETH/BNB to token swaps  
- 📊 Real-time price quotes
- 🔒 Secure smart contracts
- 💎 Low transaction fees (0.25%)
- 🌐 Built on BNB Smart Chain

## Deployed Contracts

### BSC Testnet
- **SwapHelper Contract**: `0x65d31688983Fbc145216833E2b228d89193bb62b`
- **Deployment Transaction**: `0xdda9bc794dbeeb897c907de6a4822765f302e9925a19da418963a4af7e6c1df4`
- **Deployed on**: September 3, 2025

### Contract Addresses
- **PancakeSwap Router**: `0xD99D1c33F9fC3444f8101754aBC46c52416550D1`
- **WBNB**: `0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd`

## Installation & Setup

1. **Clone the repository**
```bash
git clone <repository-url>
cd bnb-swap-protocol
```

2. **Install dependencies**
```bash
npm run install:all
```

3. **Environment Setup**
Create a `.env` file in the root directory:
```bash
PRIVATE_KEY=your_private_key_here
BSCSCAN_API_KEY=your_bscscan_api_key_here
```

## Smart Contract Commands

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

## Frontend Commands

```bash
# Start development server
npm run dev:frontend

# Build for production
npm run build:frontend
```

## Project Structure

```
├── contracts/           # Smart contracts
│   └── interfaces/     # Contract interfaces
├── frontend/           # React frontend application
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── contexts/   # React contexts
│   │   ├── hooks/      # Custom hooks
│   │   └── utils/      # Utility functions
├── scripts/            # Deployment scripts
├── test/              # Contract tests
└── ignition/          # Hardhat ignition modules
```
