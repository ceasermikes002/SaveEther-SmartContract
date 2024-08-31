// const { expect } = require("chai");
// const { ethers } = require("hardhat");

// describe("StakeEther Contract", function () {
//     let StakeEther;
//     let stakeEther: { deployed: () => any; owner: () => any; rewardRate: () => any; connect: (arg0: any) => { (): any; new(): any; stakeEther: { (arg0: { value: any; }): any; new(): any; }; withDraw: { (): any; new(): any; }; withdrawContractBalance: { (): any; new(): any; }; }; stakedAmount: (arg0: any) => any; stakedTime: (arg0: any) => any; calculateRewards: () => any; withdrawContractBalance: () => any; address: any; };
//     let owner: { address: any; sendTransaction: (arg0: { to: any; value: any; }) => any; };
//     let addr1: { address: any; };
//     let addr2;
//     let rewardRate = ethers.utils.parseUnits("0.01", 16); // Smaller reward rate for testing

//     beforeEach(async function () {
//         // Get the ContractFactory and Signers
//         StakeEther = await ethers.getContractFactory("StakeEther");
//         [owner, addr1, addr2] = await ethers.getSigners();

//         // Deploy the contract
//         stakeEther = await StakeEther.deploy(rewardRate);
//         await stakeEther.deployed();
//     });

//     describe("Deployment", function () {
//         it("Should set the right owner", async function () {
//             expect(await stakeEther.owner()).to.equal(owner.address);
//         });

//         it("Should initialize rewardRate correctly", async function () {
//             expect(await stakeEther.rewardRate()).to.equal(rewardRate);
//         });
//     });

//     describe("Staking Ether", function () {
//         it("Should allow users to stake Ether", async function () {
//             await stakeEther.connect(addr1).stakeEther({ value: ethers.utils.parseEther("1.0") });

//             expect(await stakeEther.stakedAmount(addr1.address)).to.equal(ethers.utils.parseEther("1.0"));
//             expect(await stakeEther.stakedTime(addr1.address)).to.be.above(0);
//         });

//         it("Should emit stakeSucsessful event on successful stake", async function () {
//             const tx = await stakeEther.connect(addr1).stakeEther({ value: ethers.utils.parseEther("1.0") });
//             const receipt = await tx.wait();
//             const blockTimestamp = (await ethers.provider.getBlock(receipt.blockNumber)).timestamp;

//             await expect(tx)
//                 .to.emit(stakeEther, "stakeSucsessful")
//                 .withArgs(addr1.address, ethers.utils.parseEther("1.0"), blockTimestamp);
//         });
//     });

//     describe("Reward Calculation", function () {
//         it("Should calculate rewards correctly after staking and waiting", async function () {
//             await stakeEther.connect(addr1).stakeEther({ value: ethers.utils.parseEther("1.0") });

//             // Fast forward time
//             await ethers.provider.send('evm_increaseTime', [3600]); // Increase time by 1 hour
//             await ethers.provider.send('evm_mine'); // Mine a new block

//             const rewards = await stakeEther.calculateRewards();
//             const expectedRewards = (ethers.utils.parseEther("1.0").mul(rewardRate).mul(3600)).div(1e18);
            
//             expect(rewards).to.be.closeTo(expectedRewards, ethers.utils.parseEther("0.0001"));
//         });
//     });

//     describe("Withdrawals", function () {
//         it("Should allow users to withdraw staked amount and rewards", async function () {
//             await stakeEther.connect(addr1).stakeEther({ value: ethers.utils.parseEther("1.0") });

//             // Fast forward time
//             await ethers.provider.send('evm_increaseTime', [3600]); // Increase time by 1 hour
//             await ethers.provider.send('evm_mine'); // Mine a new block

//             const initialBalance = await ethers.provider.getBalance(addr1.address);

//             const tx = await stakeEther.connect(addr1).withDraw();
//             const receipt = await tx.wait();
//             const gasUsed = receipt.gasUsed.mul(receipt.effectiveGasPrice);

//             const finalBalance = await ethers.provider.getBalance(addr1.address);

//             const userStakedAmount = ethers.utils.parseEther("1.0");
//             const rewards = await stakeEther.calculateRewards();

//             expect(finalBalance).to.be.closeTo(initialBalance.add(userStakedAmount).add(rewards).sub(gasUsed), ethers.utils.parseEther("0.0001"));
//         });

//         it("Should emit withdrawSuccessful event on successful withdrawal", async function () {
//             await stakeEther.connect(addr1).stakeEther({ value: ethers.utils.parseEther("1.0") });

//             // Fast forward time
//             await ethers.provider.send('evm_increaseTime', [3600]); // Increase time by 1 hour
//             await ethers.provider.send('evm_mine'); // Mine a new block

//             const userStakedAmount = await stakeEther.stakedAmount(addr1.address);
//             const rewards = await stakeEther.calculateRewards();

//             const tx = await stakeEther.connect(addr1).withDraw();
//             const receipt = await tx.wait();

//             await expect(tx)
//                 .to.emit(stakeEther, "withdrawSuccessful")
//                 .withArgs(addr1.address, userStakedAmount, rewards);
//         });
//     });

//     describe("Owner Functions", function () {
//         it("Should allow only the owner to withdraw contract balance", async function () {
//             await stakeEther.connect(addr1).stakeEther({ value: ethers.utils.parseEther("1.0") });

//             const initialOwnerBalance = await ethers.provider.getBalance(owner.address);
//             await stakeEther.withdrawContractBalance();
//             const finalOwnerBalance = await ethers.provider.getBalance(owner.address);

//             expect(finalOwnerBalance).to.be.gt(initialOwnerBalance);
//         });

//         it("Should not allow non-owners to withdraw contract balance", async function () {
//             await expect(stakeEther.connect(addr1).withdrawContractBalance())
//                 .to.be.revertedWith("You are not the owner!");
//         });
//     });

//     describe("Fallback Function", function () {
//         it("Should accept plain Ether", async function () {
//             const tx = {
//                 to: stakeEther.address,
//                 value: ethers.utils.parseEther("1.0")
//             };

//             await owner.sendTransaction(tx);

//             expect(await ethers.provider.getBalance(stakeEther.address)).to.equal(ethers.utils.parseEther("1.0"));
//         });
//     });
// });
