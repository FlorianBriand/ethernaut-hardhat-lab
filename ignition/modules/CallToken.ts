import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const TOKEN_ADDRESS = "0xeBF01D28A19fe3D2276cf26fd22E0A1eA725EE68";

export default buildModule("CallTokenModule", (m) => {
  const callToken = m.contract("CallToken", [TOKEN_ADDRESS]);

  return { callToken };
});
