// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

import "hardhat/console.sol"; 

contract Token {
    string public name = "HardHat Token";
    string public symbol = "HHT";

    uint public totalSupply = 10000;

    address public owner;

    mapping(address => uint) balances;

    constructor() {
        balances[msg.sender] = totalSupply;
        owner = msg.sender;
    }

    function transfer(address to, uint amount) external {
        console.log("**sender Balance is %s Tokens**", balances[msg.sender]);
        console.log("**Sender is sending %s Tokens to %address**", amount, to);

        require(balances[msg.sender] >= amount, "Not enough Tokens");
        balances[msg.sender] -= amount;
        balances[to] += amount;
    }

    function getBalance(address account) external view returns (uint256) {
        return balances[account];
    }
}
