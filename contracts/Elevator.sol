// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

interface IElevator {
    function goTo(uint256 _floor) external;
}

contract Elevator {
    bool top;
    IElevator public building;

    constructor(address _building) {
        top = false;
        building = IElevator(_building);
    }

    function isLastFloor(uint256) external returns (bool) {
        bool old_top = top;
        top = true;
        return old_top;
    }

    function goTo(uint256 _floor) external {
        building.goTo(_floor);
    }
}
