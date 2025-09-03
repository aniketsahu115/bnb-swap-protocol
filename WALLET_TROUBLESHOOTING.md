# Wallet Connection Troubleshooting Guide

## Common Issues and Solutions

### 1. MetaMask Not Detected

**Symptoms:**
- Alert saying "MetaMask is not installed"
- Connect button doesn't respond

**Solutions:**
- Install MetaMask browser extension from https://metamask.io/download/
- Refresh the page after installation
- Ensure MetaMask is enabled in your browser
- Try disabling other wallet extensions temporarily

### 2. Connection Request Not Appearing

**Symptoms:**
- Button shows "Connecting..." but no MetaMask popup
- No response when clicking connect

**Solutions:**
- Check if MetaMask popup is blocked by browser
- Look for MetaMask icon in browser toolbar (might be hidden)
- Click on MetaMask extension icon manually
- Ensure MetaMask is unlocked

### 3. Wrong Network

**Symptoms:**
- Connected but showing "Please switch to BSC Testnet"
- Transactions failing

**Solutions:**
- The app will automatically prompt to switch to BSC Testnet
- If automatic switch fails, manually add BSC Testnet:
  - Network Name: BSC Testnet
  - RPC URL: https://data-seed-prebsc-1-s1.binance.org:8545/
  - Chain ID: 97
  - Currency Symbol: BNB
  - Block Explorer: https://testnet.bscscan.com/

### 4. Connection Rejected

**Symptoms:**
- Alert saying "Please accept the connection request"

**Solutions:**
- Click "Connect" in MetaMask popup
- If popup doesn't appear, click MetaMask extension icon
- Ensure you're selecting the correct account

### 5. Browser Compatibility

**Supported Browsers:**
- Chrome (recommended)
- Firefox
- Edge
- Brave

**Not Supported:**
- Safari (limited Web3 support)
- Mobile browsers (limited functionality)

## Debug Information

Open browser console (F12) to see detailed logs:
- Connection attempts
- MetaMask detection status
- Network information
- Error messages

## Manual MetaMask Setup

If automatic network setup fails:

1. Open MetaMask
2. Click network dropdown (top center)
3. Click "Add Network"
4. Fill in BSC Testnet details:
   - Network Name: BSC Testnet
   - New RPC URL: https://data-seed-prebsc-1-s1.binance.org:8545/
   - Chain ID: 97
   - Currency Symbol: BNB
   - Block Explorer URL: https://testnet.bscscan.com/

## Getting Test BNB

To use the swap functionality on BSC Testnet:
1. Visit BSC Testnet Faucet: https://testnet.binance.org/faucet-smart
2. Connect your wallet
3. Request test BNB tokens
4. Wait for confirmation (usually 1-2 minutes)

## Contact Support

If issues persist:
1. Check browser console for error messages
2. Try different browser
3. Ensure MetaMask is updated to latest version
4. Clear browser cache and cookies
