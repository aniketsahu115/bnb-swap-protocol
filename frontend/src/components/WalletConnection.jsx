// frontend/src/components/WalletConnection.jsx
import React from 'react';
import { useWeb3 } from '../contexts/Web3Context';

const WalletConnection = () => {
  const { account, connectWallet, disconnectWallet, isConnecting, chainId } = useWeb3();

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const getChainName = (chainId) => {
    switch (chainId) {
      case 97:
        return 'BSC Testnet';
      case 56:
        return 'BSC Mainnet';
      default:
        return 'Unknown Network';
    }
  };

  const isWrongNetwork = chainId && chainId !== 97;

  if (!account) {
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 mb-6">
        <div className="text-center">
          <div className="mb-4">
            <div className="w-16 h-16 bg-bnb-yellow/20 rounded-full flex items-center justify-center mx-auto mb-3">
              <svg className="w-8 h-8 text-bnb-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">Connect Wallet</h3>
            <p className="text-gray-400 text-sm">
              Connect your wallet to start swapping tokens on BNB Smart Chain
            </p>
          </div>
          
          <button
            onClick={connectWallet}
            disabled={isConnecting}
            className="bg-bnb-yellow hover:bg-yellow-400 text-black font-medium py-3 px-8 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 mx-auto"
          >
            {isConnecting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-2 border-black border-t-transparent"></div>
                <span>Connecting...</span>
              </>
            ) : (
              <>
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span>Connect Wallet</span>
              </>
            )}
          </button>

          <div className="mt-4 text-xs text-gray-500">
            <p>Supported wallets: MetaMask, WalletConnect</p>
            <p className="mt-1">
              Don't have MetaMask? 
              <a 
                href="https://metamask.io/download/" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-bnb-yellow hover:underline ml-1"
              >
                Download here
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-bnb-yellow/20 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-bnb-yellow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-white font-medium">{formatAddress(account)}</span>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                isWrongNetwork 
                  ? 'bg-red-500/20 text-red-400' 
                  : 'bg-green-500/20 text-green-400'
              }`}>
                {getChainName(chainId)}
              </div>
            </div>
            {isWrongNetwork && (
              <p className="text-red-400 text-xs mt-1">
                Please switch to BSC Testnet
              </p>
            )}
          </div>
        </div>
        
        <button
          onClick={disconnectWallet}
          className="text-gray-400 hover:text-white text-sm transition-colors"
        >
          Disconnect
        </button>
      </div>
    </div>
  );
};

export default WalletConnection;