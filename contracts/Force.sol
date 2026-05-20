// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

contract SendEtherToForce {
    address private owner;

    constructor() {
        owner = msg.sender;
    }

    function sendEtherToForce(address payable _force) external payable {
        (bool ok, ) = _force.call{value: msg.value}("");
        require(ok, "Transfer failed");
    }

    function withdraw() external {
        (bool ok, ) = owner.call{value: address(this).balance}("");
        require(ok, "Transfer failed");
    }

    receive() external payable {}
}
