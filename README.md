# **Ether Staking Smart Contract**

This project implements an Ether staking smart contract that allows users to stake Ether for a specified period, earn rewards based on the duration of the stake, and withdraw their staked Ether along with earned rewards after the staking period ends.

## **Table of Contents**

- [Introduction](#introduction)
- [Features](#features)
- [Requirements](#requirements)
- [Installation](#installation)
- [Usage](#usage)
  - [Deploying the Contract](#deploying-the-contract)
  - [Interacting with the Contract](#interacting-with-the-contract)
- [Testing](#testing)
- [Security Considerations](#security-considerations)
- [License](#license)

## **Introduction**

This smart contract allows users to stake their Ether in the contract and earn rewards proportional to the duration of their stake. The contract ensures the safety of user funds and calculates rewards accurately based on the staking time. Users can withdraw their initial stake along with the earned rewards once the staking period has ended.

## **Features**

- **Staking Ether**: Users can stake Ether by sending a transaction to the contract.
- **Time-Based Rewards**: Users earn rewards based on the duration of their stake.
- **Withdrawals**: After the staking period, users can withdraw both their staked Ether and the earned rewards.
- **Security**: The contract implements security measures to protect user funds and prevent vulnerabilities like reentrancy attacks.

## **Requirements**

- [Node.js](https://nodejs.org/) v12.x or higher
- [Hardhat](https://hardhat.org/)
- [Ethers.js](https://docs.ethers.io/v5/)
- [Solidity](https://soliditylang.org/) ^0.8.0

## **Installation**

1. **Clone the Repository**:
    ```bash
    git clone https://github.com/ceasermikes002/SaveEther-SmartContract.git
    cd ether-staking-contract
    ```

2. **Install Dependencies**:
    ```bash
    npm install
    ```

3. **Set Up Environment Variables**:
   Create a `.env` file in the root directory to store your environment variables:
    ```bash
    PRIVATE_KEY=your-private-key-on-lisk-sepolia-network
    ```
   
4. **Compile the Smart Contract**:
    ```bash
    npx hardhat compile
    ```

## **Usage**

### **Deploying the Contract**

1. **Deploy to Local Network**:
   Start a local Hardhat network:
    ```bash
    npx hardhat node
    ```
   Deploy the contract:
    ```bash
    npx hardhat id scripts/deploy.js --network localhost
    ```

2. **Deploy to Testnet**:
   Ensure your `hardhat.config.js` is set up with the appropriate network configuration (e.g., Ropsten, Rinkeby).
   Deploy to a testnet:
    ```bash
    ./ignition/modules/Deploy.js --network lisk-sepolia
    ```

The test suite covers all major functionalities, including staking, reward calculation, and withdrawals.

### **Security Considerations**

- **Reentrancy Attacks**: The contract follows the checks-effects-interactions pattern to prevent reentrancy attacks.
- **Gas Efficiency**: The contract is optimized for gas efficiency, ensuring that operations are executed with minimal gas consumption.
- **Error Handling**: Proper error handling mechanisms are in place to revert transactions if any issues are detected.