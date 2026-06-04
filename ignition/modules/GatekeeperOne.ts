import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const target = "0xD817a7d30D975b6A9Ce0DEb952d8B56B3f133dFA";

export default buildModule("GatekeeperOneModule", (m) => {
  // 1. Deploy the GatekeeperOneAttacker contract with the target address
  const attacker = m.contract("GatekeeperOneAttacker", [target]);

  // 3. Execute the attack
  m.call(attacker, "attack", []);

  return { attacker };
});
