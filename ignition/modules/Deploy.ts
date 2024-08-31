import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
import { ethers } from "ethers";

// Define the deploy module
const deployModule = buildModule("StakeEtherModule", (m) => {
  const rewardRate = m.getParameter("rewardRate", ethers.parseUnits("1", 18));  // 1e18 as a BigNumber
  
  // Deploy the StakeEther contract with the given rewardRate
  const stakeEther = m.contract("StakeEther", [rewardRate]);

  return { stakeEther };
});

// Export the deploy function
export default deployModule;
