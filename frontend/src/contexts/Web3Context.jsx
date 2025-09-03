import React, { createContext, useContext, useState, useEffect } from 'react';
import { ethers } from 'ethers';

const Web3Context = createContext();

export const useWeb3 = () => {
  const context = useContext(Web3Context);
  if (!context) {
    throw new Error('useWeb3 must be used within Web3Provider');
  }
  return context;
};

export const Web3Provider = ({ children }) => {
  const [account, setAccount] = useState('');
  const [provider, setProvider] = useState(null);
  const [signer, setSigner] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [isConnecting, setIsConnecting] = useState(false);

  const connectWallet = async () => {
    // Check if MetaMask is installed
    if (typeof window.ethereum === 'undefined') {
      alert('MetaMask is not installed. Please install MetaMask and refresh the page.');
      window.open('https://metamask.io/download/', '_blank');
      return;
    }

    // Check if MetaMask is accessible
    if (!window.ethereum.isMetaMask) {
      alert('Please use MetaMask wallet to connect.');
      return;
    }

    setIsConnecting(true);
    try {
      // Request account access
      console.log('Requesting account access...');
      const provider = new ethers.BrowserProvider(window.ethereum);
      
      // Request accounts with proper error handling
      let accounts;
      try {
        accounts = await provider.send('eth_requestAccounts', []);
      } catch (error) {
        if (error.code === 4001) {
          alert('Please accept the connection request in MetaMask.');
        } else {
          console.error('Error requesting accounts:', error);
          alert('Failed to connect to MetaMask. Please try again.');
        }
        setIsConnecting(false);
        return;
      }

      if (!accounts || accounts.length === 0) {
        alert('No accounts found. Please unlock MetaMask and try again.');
        setIsConnecting(false);
        return;
      }

      console.log('Connected account:', accounts[0]);
      
      const signer = await provider.getSigner();
      const network = await provider.getNetwork();

      setProvider(provider);
      setSigner(signer);
      setAccount(accounts[0]);
      setChainId(Number(network.chainId));

      console.log('Current network:', Number(network.chainId));

      // Switch to BSC Testnet if not already
      if (Number(network.chainId) !== 97) {
        console.log('Switching to BSC Testnet...');
        await switchToBSCTestnet();
      }
    } catch (error) {
      console.error('Error connecting wallet:', error);
      alert(`Failed to connect wallet: ${error.message}`);
    }
    setIsConnecting(false);
  };

  const switchToBSCTestnet = async () => {
    try {
      console.log('Attempting to switch to BSC Testnet...');
      await window.ethereum.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: '0x61' }], // BSC Testnet
      });
      console.log('Successfully switched to BSC Testnet');
    } catch (error) {
      console.log('Switch failed, attempting to add BSC Testnet...', error);
      if (error.code === 4902) {
        try {
          await window.ethereum.request({
            method: 'wallet_addEthereumChain',
            params: [{
              chainId: '0x61',
              chainName: 'BSC Testnet',
              nativeCurrency: {
                name: 'BNB',
                symbol: 'BNB',
                decimals: 18,
              },
              rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545/'],
              blockExplorerUrls: ['https://testnet.bscscan.com/'],
            }],
          });
          console.log('BSC Testnet added successfully');
        } catch (addError) {
          console.error('Failed to add BSC Testnet:', addError);
          alert('Failed to add BSC Testnet. Please add it manually in MetaMask.');
        }
      } else if (error.code === 4001) {
        console.log('User rejected network switch');
        alert('Please switch to BSC Testnet manually in MetaMask for the best experience.');
      } else {
        console.error('Unknown error switching network:', error);
        alert('Failed to switch network. Please switch to BSC Testnet manually in MetaMask.');
      }
    }
  };

  const disconnectWallet = () => {
    setAccount('');
    setProvider(null);
    setSigner(null);
    setChainId(null);
  };

  useEffect(() => {
    // Auto-connect if user was previously connected
    const checkConnection = async () => {
      if (window.ethereum) {
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const accounts = await provider.listAccounts();
          
          if (accounts.length > 0) {
            console.log('Auto-connecting to previously connected account...');
            const signer = await provider.getSigner();
            const network = await provider.getNetwork();
            
            setProvider(provider);
            setSigner(signer);
            setAccount(accounts[0].address);
            setChainId(Number(network.chainId));
            console.log('Auto-connected successfully');
          }
        } catch (error) {
          console.log('Auto-connection failed:', error);
        }
      }
    };

    checkConnection();

    // Set up event listeners
    if (window.ethereum) {
      const handleAccountsChanged = (accounts) => {
        console.log('Accounts changed:', accounts);
        if (accounts.length === 0) {
          disconnectWallet();
        } else {
          setAccount(accounts[0]);
        }
      };

      const handleChainChanged = (chainId) => {
        console.log('Chain changed:', chainId);
        setChainId(Number(chainId));
        // Refresh page to reset state
        window.location.reload();
      };

      // Add event listeners with error handling
      try {
        window.ethereum.on('accountsChanged', handleAccountsChanged);
        window.ethereum.on('chainChanged', handleChainChanged);
      } catch (error) {
        console.warn('Error adding event listeners:', error);
      }

      return () => {
        if (window.ethereum) {
          try {
            // Use removeAllListeners if available (newer MetaMask versions)
            if (typeof window.ethereum.removeAllListeners === 'function') {
              window.ethereum.removeAllListeners('accountsChanged');
              window.ethereum.removeAllListeners('chainChanged');
            } 
            // Fallback to removeListener if available (older versions)
            else if (typeof window.ethereum.removeListener === 'function') {
              window.ethereum.removeListener('accountsChanged', handleAccountsChanged);
              window.ethereum.removeListener('chainChanged', handleChainChanged);
            }
            // Fallback to off method if available
            else if (typeof window.ethereum.off === 'function') {
              window.ethereum.off('accountsChanged', handleAccountsChanged);
              window.ethereum.off('chainChanged', handleChainChanged);
            }
          } catch (error) {
            console.warn('Error removing event listeners:', error);
          }
        }
      };
    }
  }, []);

  const value = {
    account,
    provider,
    signer,
    chainId,
    isConnecting,
    connectWallet,
    disconnectWallet,
  };

  return (
    <Web3Context.Provider value={value}>
      {children}
    </Web3Context.Provider>
  );
};