// frontend/src/components/TokenSelector.jsx
import React, { useState } from 'react';

const TokenSelector = ({ selectedToken, onTokenSelect, tokens, excludeToken }) => {
  const [isOpen, setIsOpen] = useState(false);

  const availableTokens = tokens.filter(token => 
    excludeToken ? token.address !== excludeToken.address : true
  );

  const handleTokenSelect = (token) => {
    onTokenSelect(token);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-gray-700 hover:bg-gray-600 rounded-lg px-3 py-2 transition-colors"
      >
        <img
          src={selectedToken.logoURI}
          alt={selectedToken.name}
          className="w-6 h-6 rounded-full"
          onError={(e) => {
            e.target.src = `https://via.placeholder.com/24/F0B90B/000000?text=${selectedToken.symbol.charAt(0)}`;
          }}
        />
        <span className="text-white font-medium">{selectedToken.symbol}</span>
        <svg 
          className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none" 
          stroke="currentColor" 
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute top-full left-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-xl z-20 border border-gray-700">
            <div className="p-4">
              <h3 className="text-white font-medium mb-3">Select Token</h3>
              <div className="space-y-2 max-h-60 overflow-y-auto">
                {availableTokens.map((token) => (
                  <button
                    key={token.address}
                    onClick={() => handleTokenSelect(token)}
                    className="w-full flex items-center space-x-3 p-3 hover:bg-gray-700 rounded-lg transition-colors"
                  >
                    <img
                      src={token.logoURI}
                      alt={token.name}
                      className="w-8 h-8 rounded-full flex-shrink-0"
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/32/F0B90B/000000?text=${token.symbol.charAt(0)}`;
                      }}
                    />
                    <div className="flex-1 text-left">
                      <div className="text-white font-medium">{token.symbol}</div>
                      <div className="text-gray-400 text-sm truncate">{token.name}</div>
                    </div>
                    {selectedToken.address === token.address && (
                      <svg className="w-5 h-5 text-bnb-yellow flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Add custom token option */}
            <div className="border-t border-gray-700 p-4">
              <button
                className="w-full text-left text-bnb-yellow hover:text-yellow-400 text-sm transition-colors"
                onClick={() => {
                  // Future: Implement custom token addition
                  alert('Custom token addition coming soon!');
                  setIsOpen(false);
                }}
              >
                + Add Custom Token
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TokenSelector;