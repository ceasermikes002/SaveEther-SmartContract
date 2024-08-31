// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.24;

contract StakeEther {
    //    State variables definition
    //    Implemented variable packing
    mapping(address => uint256) public stakedAmount;
    mapping(address => uint256) public stakedTime;
    uint256 public totalRewards;
    uint256 public stakingDuration;
    address public owner;
    uint256 public rewardRate;

    //This would be initialized once we deploy our contract and _reward rate would be passed as a parameter when we want to verify and in out deploy script
    constructor(uint256 _rewardRate) {
        owner = msg.sender;
        rewardRate = _rewardRate;
    }

    //Our modifiers,
    modifier ifUserStaked() {
        require(stakedAmount[msg.sender] > 0, "You have not staked any Ether.");
        _;
    }
    modifier onlyOwner() {
        require(owner == msg.sender, "You are not the owner!");
        _;
    }

    // Events
    event stakeSucsessful(address indexed user, uint256 amount, uint256 time);
    event withdrawSuccessful(
        address indexed user,
        uint256 userStakedAmount,
        uint256 rewards
    );

    // Functions

    // Function to enable staking of ethers
    function stakeEther() external payable {
        require(msg.value > 0, "Staking amount must be more than zero");

        // If the user already staked ether, calculate and update their rewards before adding new stake
        // I implemented custom errors here, to save gas and optimize my smart contract
        if (stakedAmount[msg.sender] > 0) {
            uint256 currentRewards = calculateRewards();

            totalRewards += currentRewards;

            stakedTime[msg.sender] = block.timestamp;
        } else {
            stakedTime[msg.sender] = block.timestamp;
        }

        stakedAmount[msg.sender] += msg.value;

        stakedTime[msg.sender] += block.timestamp;

        emit stakeSucsessful(msg.sender, msg.value, block.timestamp);
    }

    //View function that calculates our rewards
    function calculateRewards() public view returns (uint256) {
        // rewuire statements
        require(stakedAmount[msg.sender] != 0, "Staked Amount cannot be zero!");

        uint256 stakedDuration = block.timestamp - stakedTime[msg.sender];

        uint256 rewards = (stakedAmount[msg.sender] *
            rewardRate *
            stakedDuration) / 1e18;

        return rewards;
    }

    //Withdraw function
    function withDraw() external ifUserStaked {
        uint256 userStakedAmount = stakedAmount[msg.sender];

        uint256 rewards = calculateRewards();

        stakedAmount[msg.sender] = 0;
        stakedTime[msg.sender] = 0;

        (bool success, ) = payable(msg.sender).call{
            value: userStakedAmount + rewards
        }("");
        require(success, "Transfer reverted!");

        emit withdrawSuccessful(msg.sender, userStakedAmount, rewards);
    }

    // Function to withdraw contract balance, only contract owner can call this
    function withdrawContractBalance() external onlyOwner {
        uint256 gasLimit = 50000;

        (bool success, ) = payable(msg.sender).call{
            value: address(this).balance,
            gas: gasLimit
        }("");
        require(success, "Transfer failed!");
    }

    // Function to view balance
    function viewBalance() external view returns (uint256) {
        uint256 userBalance = address(this).balance;
        return userBalance;
    }

    //fallback to recieve plain Ether without data
    receive() external payable {}
}
