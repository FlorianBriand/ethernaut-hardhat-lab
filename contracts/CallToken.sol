// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

interface IToken {
    function transfer(address to, uint256 amount) external returns (bool);
}

contract CallToken {
    IToken public token;

    constructor(address tokenAddress) {
        token = IToken(tokenAddress);
    }

    function callToken() external {
        bool transferred = token.transfer(msg.sender, 1);
        require(transferred, "Transfer failed");
    }
}
