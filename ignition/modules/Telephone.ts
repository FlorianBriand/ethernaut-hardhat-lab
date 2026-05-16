import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


export default buildModule("TelephoneToModule", (m) => {
  const telephone = m.contract("TelephoneTo");

  m.call(telephone, "telephoneTo");

  return { telephone };
});
