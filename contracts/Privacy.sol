// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Privacy {
    bytes16 public password;

    constructor(bytes32[3] memory _data) {
        bytes32[3] memory data = _data;
        password = bytes16(data[2]);
    }

    // Get password
    function getPassword() public view returns (bytes16) {
        return password;
    }
}
