import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

const FORCE_TOKEN_ADDRESS = "0xC191759F2dd689cA6479f9f93Eed132e3bd49800";

export default buildModule("SendEtherToForceModule", (m) => {
  const force = m.contract("SendEtherToForce");


  m.call(force, "attack", [FORCE_TOKEN_ADDRESS], {
    value: 10000n,
  });


  return { force };
});


