import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";
export default buildModule("PrivacyModule", (m) => {
  const privacy = m.contract("Privacy", ["000000000000000000000000131c3249e115491e83de375171767af07906ea36"]);

  m.call(privacy, "password", [], { id: "getPassword" });

  return { privacy };
});