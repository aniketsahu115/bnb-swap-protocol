// frontend/src/components/SwapInterface.jsx
import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useWeb3 } from '../contexts/Web3Context';
import TokenSelector from './TokenSelector';
import { CONTRACT_ADDRESSES, TESTNET_TOKENS, ERC20_ABI, SWAP_HELPER_ABI } from '../utils/constants';

const SwapInterface = () => {
  const { account, provider, signer, chainId } = useWeb3();
  const [tokenIn, setTokenIn] = useState(TESTNET_TOKENS[0]);
  const [tokenOut, setTokenOut] = useState(TESTNET_TOKENS[1]);
  const [amountIn, setAmountIn] = useState('');
  const [amountOut, setAmountOut] = useState('');
  const [slippage, setSlippage] = useState(0.5);
  const [isLoading, setIsLoading] = useState(false);
  const [balanceIn, setBalanceIn] = useState('0');
  const [balanceOut, setBalanceOut] = useState('0');
  const [priceImpact, setPriceImpact] = useState(0);

  // Get token balances
  const getTokenBalance = async (tokenAddress, userAddress) => {
    if (!provider || !userAddress) return '0';
    
    try {
      if (tokenAddress === 'BNB' || tokenAddress === CONTRACT_ADDRESSES.WBNB) {
        const balance = await provider.getBalance(userAddress);
        return ethers.formatEther(balance);
      } else {
        const tokenContract = new ethers.Contract(tokenAddress, ERC20_ABI, provider);
        const balance = await tokenContract.balanceOf(userAddress);
        const decimals = await tokenContract.decimals();
        return ethers.formatUnits(balance, decimals);
      }
    } catch (error) {
      console.error('Error getting balance:', error);
      return '0';
    }
  };

  // Get quote for swap
  const getQuote = async (amountIn, tokenInAddress, tokenOutAddress) => {
    if (!provider || !amountIn || amountIn === '0') return '0';

    try {
      const swapHelperContract = new ethers.Contract(
        CONTRACT_ADDRESSES.SWAP_HELPER,
        SWAP_HELPER_ABI,
        provider
      );

      const amountInWei = ethers.parseEther(amountIn);
      
      // Use SwapHelper's getAmountOut function
      const amountOutWei = await swapHelperContract.getAmountOut(
        tokenInAddress,
        tokenOutAddress,
        amountInWei
      );
      
      return ethers.formatEther(amountOutWei);
    } catch (error) {
      console.error('Error getting quote:', error);
      return '0';
    }
  };

  // Update balances when account or tokens change
  useEffect(() => {
    if (account) {
      getTokenBalance(tokenIn.address, account).then(setBalanceIn);
      getTokenBalance(tokenOut.address, account).then(setBalanceOut);
    }
  }, [account, tokenIn, tokenOut, provider]);

  // Update output amount when input changes
  useEffect(() => {
    if (amountIn && tokenIn && tokenOut && provider) {
      const timeoutId = setTimeout(async () => {
        const quote = await getQuote(amountIn, tokenIn.address, tokenOut.address);
        setAmountOut(quote);
      }, 500);

      return () => clearTimeout(timeoutId);
    } else {
      setAmountOut('');
    }
  }, [amountIn, tokenIn, tokenOut, provider]);

  const handleSwapTokens = () => {
    const temp = tokenIn;
    setTokenIn(tokenOut);
    setTokenOut(temp);
    setAmountIn(amountOut);
    setAmountOut('');
  };

  const handleMaxClick = () => {
    setAmountIn(balanceIn);
  };

  const executeSwap = async () => {
    if (!signer || !amountIn || !amountOut) return;

    setIsLoading(true);
    try {
      const swapHelperContract = new ethers.Contract(
        CONTRACT_ADDRESSES.SWAP_HELPER,
        SWAP_HELPER_ABI,
        signer
      );

      const amountInWei = ethers.parseEther(amountIn);
      const amountOutMinWei = ethers.parseEther(
        (parseFloat(amountOut) * (1 - slippage / 100)).toString()
      );

      let tx;
      
      if (tokenIn.symbol === 'BNB' || tokenIn.address === CONTRACT_ADDRESSES.WBNB) {
        // BNB to Token swap using SwapHelper
        tx = await swapHelperContract.swapETHForTokens(
          tokenOut.address,
          amountOutMinWei,
          account,
          { value: amountInWei }
        );
      } else {
        // Token to Token swap (including Token to BNB) using SwapHelper
        const tokenContract = new ethers.Contract(tokenIn.address, ERC20_ABI, signer);
        
        // Check and approve if needed
        const allowance = await tokenContract.allowance(account, CONTRACT_ADDRESSES.SWAP_HELPER);
        if (allowance < amountInWei) {
          const approveTx = await tokenContract.approve(
            CONTRACT_ADDRESSES.SWAP_HELPER,
            ethers.MaxUint256
          );
          await approveTx.wait();
        }

        tx = await swapHelperContract.swapTokens(
          tokenIn.address,
          tokenOut.address,
          amountInWei,
          amountOutMinWei,
          account
        );
      }

      await tx.wait();
      
      // Reset form and update balances
      setAmountIn('');
      setAmountOut('');
      getTokenBalance(tokenIn.address, account).then(setBalanceIn);
      getTokenBalance(tokenOut.address, account).then(setBalanceOut);
      
      alert('Swap successful!');
    } catch (error) {
      console.error('Swap failed:', error);
      alert('Swap failed: ' + error.message);
    }
    setIsLoading(false);
  };

  const isInsufficientBalance = parseFloat(amountIn || '0') > parseFloat(balanceIn);
  const canSwap = account && amountIn && amountOut && !isInsufficientBalance && chainId === 97;

  if (!account) {
    return (
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
        <p className="text-gray-400">Please connect your wallet to start swapping</p>
      </div>
    );
  }

  if (chainId !== 97) {
    return (
      <div className="bg-red-500/20 backdrop-blur-sm rounded-xl p-6 text-center">
        <p className="text-red-400">Please switch to BSC Testnet to use the swap</p>
      </div>
    );
  }

  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
      {/* Slippage Settings */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-white font-medium">Swap Tokens</h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-400">Slippage:</span>
          <select
            value={slippage}
            onChange={(e) => setSlippage(parseFloat(e.target.value))}
            className="bg-gray-800 text-white text-sm rounded px-2 py-1"
          >
            <option value={0.1}>0.1%</option>
            <option value={0.5}>0.5%</option>
            <option value={1}>1%</option>
            <option value={3}>3%</option>
          </select>
        </div>
      </div>

      {/* Token In */}
      <div className="mb-4">
        <div className="flex justify-between mb-2">
          <label className="text-sm text-gray-400">From</label>
          <span className="text-sm text-gray-400">
            Balance: {parseFloat(balanceIn).toFixed(4)} {tokenIn.symbol}
          </span>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <TokenSelector
              selectedToken={tokenIn}
              onTokenSelect={setTokenIn}
              tokens={TESTNET_TOKENS}
              excludeToken={tokenOut}
            />
            <div className="flex-1">
              <input
                type="number"
                placeholder="0.0"
                value={amountIn}
                onChange={(e) => setAmountIn(e.target.value)}
                className="w-full bg-transparent text-white text-xl font-medium outline-none placeholder-gray-500"
              />
              <button
                onClick={handleMaxClick}
                className="text-bnb-yellow text-sm hover:text-yellow-400 transition-colors mt-1"
              >
                Max
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Swap Button */}
      <div className="flex justify-center my-4">
        <button
          onClick={handleSwapTokens}
          className="bg-gray-700 hover:bg-gray-600 rounded-full p-2 transition-colors"
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
          </svg>
        </button>
      </div>

      {/* Token Out */}
      <div className="mb-6">
        <div className="flex justify-between mb-2">
          <label className="text-sm text-gray-400">To</label>
          <span className="text-sm text-gray-400">
            Balance: {parseFloat(balanceOut).toFixed(4)} {tokenOut.symbol}
          </span>
        </div>
        <div className="bg-gray-800/50 rounded-lg p-4">
          <div className="flex items-center space-x-3">
            <TokenSelector
              selectedToken={tokenOut}
              onTokenSelect={setTokenOut}
              tokens={TESTNET_TOKENS}
              excludeToken={tokenIn}
            />
            <div className="flex-1">
              <input
                type="number"
                placeholder="0.0"
                value={amountOut}
                readOnly
                className="w-full bg-transparent text-white text-xl font-medium outline-none placeholder-gray-500"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Price Info */}
      {amountIn && amountOut && (
        <div className="bg-gray-800/30 rounded-lg p-3 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-gray-400">Price</span>
            <span className="text-white">
              1 {tokenIn.symbol} = {(parseFloat(amountOut) / parseFloat(amountIn)).toFixed(6)} {tokenOut.symbol}
            </span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span className="text-gray-400">Slippage Tolerance</span>
            <span className="text-white">{slippage}%</span>
          </div>
          <div className="flex justify-between text-sm mt-1">
            <span className="text-gray-400">Minimum Received</span>
            <span className="text-white">
              {(parseFloat(amountOut) * (1 - slippage / 100)).toFixed(6)} {tokenOut.symbol}
            </span>
          </div>
        </div>
      )}

      {/* Swap Button */}
      <button
        onClick={executeSwap}
        disabled={!canSwap || isLoading}
        className={`w-full py-3 rounded-lg font-medium transition-colors ${
          !canSwap || isLoading
            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
            : isInsufficientBalance
            ? 'bg-red-500 text-white'
            : 'bg-bnb-yellow text-black hover:bg-yellow-400'
        }`}
      >
        {isLoading
          ? 'Swapping...'
          : isInsufficientBalance
          ? 'Insufficient Balance'
          : !amountIn
          ? 'Enter Amount'
          : !amountOut
          ? 'Getting Quote...'
          : 'Swap Tokens'
        }
      </button>

      {/* Warning */}
      <p className="text-xs text-gray-500 mt-4 text-center">
        This is a testnet version. Only use test tokens.
      </p>
    </div>
  );
};

export default SwapInterface;