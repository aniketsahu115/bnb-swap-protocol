const { ethers } = require("hardhat");

async function main() {
  console.log("Deploying SwapHelper contract to BSC Testnet...");

  const PANCAKE_ROUTER = "0xD99D1c33F9fC3444f8101754aBC46c52416550D1";
  const WBNB = "0xae13d989daC2f0dEbFf460aC112a837C89BAa7cd";

  const SwapHelper = await ethers.getContractFactory("SwapHelper");
  const swapHelper = await SwapHelper.deploy(PANCAKE_ROUTER, WBNB);

  await swapHelper.waitForDeployment();

  const address = await swapHelper.getAddress();
  console.log("SwapHelper deployed to:", address);

  const fs = require('fs');
  const deploymentInfo = {
    network: "BSC Testnet",
    contractAddress: address,
    pancakeRouter: PANCAKE_ROUTER,
    wbnb: WBNB,
    deploymentTime: new Date().toISOString(),
    txHash: swapHelper.deploymentTransaction().hash
  };

  fs.writeFileSync(
    'deployment-info.json', 
    JSON.stringify(deploymentInfo, null, 2)
  );

  console.log("Deployment info saved to deployment-info.json");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });