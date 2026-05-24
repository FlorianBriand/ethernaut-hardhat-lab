import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";



export default buildModule("TakeoverKingModule", (m) => {

  const KING_VAULT_ADDRESS = "0x6289E6F0E0cf0328e7A78af5d5415c4e51D511E5";

  const takeoverKing = m.contract("TakeoverKing", [KING_VAULT_ADDRESS]);

  m.call(takeoverKing, "becomeKing", [], {
    value: 1000000000000001n,
  });

  return { takeoverKing };
});
