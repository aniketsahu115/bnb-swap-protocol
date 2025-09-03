import React from 'react';
import { Web3Provider } from './contexts/Web3Context';
import WalletConnection from './components/WalletConnection';
import SwapInterface from './components/SwapInterface';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';

function App() {
  return (
    <ErrorBoundary>
      <Web3Provider>
        <div className="min-h-screen bg-gradient-to-br from-bnb-dark to-gray-900">
          <div className="container mx-auto px-4 py-8">
            <header className="text-center mb-8">
              <h1 className="text-4xl font-bold text-white mb-2">
                BNB Swap Protocol
              </h1>
              <p className="text-gray-400">
                Decentralized token swapping on BNB Smart Chain
              </p>
            </header>
            
            <div className="max-w-md mx-auto">
              <WalletConnection />
              <SwapInterface />
            </div>
          </div>
        </div>
      </Web3Provider>
    </ErrorBoundary>
  );
}

export default App;