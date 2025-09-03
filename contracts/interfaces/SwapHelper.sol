// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface IPancakeRouter02 {
    function getAmountsOut(uint amountIn, address[] calldata path)
        external view returns (uint[] memory amounts);
    
    function swapExactTokensForTokens(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external returns (uint[] memory amounts);
    
    function swapExactETHForTokens(
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external payable returns (uint[] memory amounts);
    
    function swapExactTokensForETH(
        uint amountIn,
        uint amountOutMin,
        address[] calldata path,
        address to,
        uint deadline
    ) external returns (uint[] memory amounts);
}

contract SwapHelper is ReentrancyGuard, Ownable {
    IPancakeRouter02 public immutable pancakeRouter;
    address public immutable WBNB;
    
    uint256 public feePercent = 25; // 0.25% fee
    uint256 public constant FEE_DENOMINATOR = 10000;
    
    event TokenSwap(
        address indexed user,
        address indexed tokenIn,
        address indexed tokenOut,
        uint256 amountIn,
        uint256 amountOut,
        uint256 fee
    );
    
    constructor(address _router, address _wbnb) {
        pancakeRouter = IPancakeRouter02(_router);
        WBNB = _wbnb;
    }
    
    function swapTokens(
        address tokenIn,
        address tokenOut,
        uint256 amountIn,
        uint256 amountOutMin,
        address to
    ) external nonReentrant {
        require(amountIn > 0, "Amount must be greater than 0");
        
        // Calculate fee
        uint256 fee = (amountIn * feePercent) / FEE_DENOMINATOR;
        uint256 amountAfterFee = amountIn - fee;
        
        // Transfer tokens from user
        IERC20(tokenIn).transferFrom(msg.sender, address(this), amountIn);
        
        // Transfer fee to owner
        if (fee > 0) {
            IERC20(tokenIn).transfer(owner(), fee);
        }
        
        // Approve router
        IERC20(tokenIn).approve(address(pancakeRouter), amountAfterFee);
        
        // Setup swap path
        address[] memory path = new address[](2);
        path[0] = tokenIn;
        path[1] = tokenOut;
        
        // Execute swap
        uint[] memory amounts = pancakeRouter.swapExactTokensForTokens(
            amountAfterFee,
            amountOutMin,
            path,
            to,
            block.timestamp + 300
        );
        
        emit TokenSwap(msg.sender, tokenIn, tokenOut, amountIn, amounts[1], fee);
    }
    
    function swapETHForTokens(
        address tokenOut,
        uint256 amountOutMin,
        address to
    ) external payable nonReentrant {
        require(msg.value > 0, "Must send ETH");
        
        uint256 fee = (msg.value * feePercent) / FEE_DENOMINATOR;
        uint256 amountAfterFee = msg.value - fee;
        
        // Send fee to owner
        if (fee > 0) {
            payable(owner()).transfer(fee);
        }
        
        address[] memory path = new address[](2);
        path[0] = WBNB;
        path[1] = tokenOut;
        
        uint[] memory amounts = pancakeRouter.swapExactETHForTokens{value: amountAfterFee}(
            amountOutMin,
            path,
            to,
            block.timestamp + 300
        );
        
        emit TokenSwap(msg.sender, WBNB, tokenOut, msg.value, amounts[1], fee);
    }
    
    function getAmountOut(
        address tokenIn,
        address tokenOut,
        uint256 amountIn
    ) external view returns (uint256) {
        address[] memory path = new address[](2);
        path[0] = tokenIn;
        path[1] = tokenOut;
        
        uint[] memory amounts = pancakeRouter.getAmountsOut(amountIn, path);
        return amounts[1];
    }
    
    function updateFee(uint256 _feePercent) external onlyOwner {
        require(_feePercent <= 100, "Fee too high"); // Max 1%
        feePercent = _feePercent;
    }
}