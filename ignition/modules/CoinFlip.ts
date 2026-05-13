import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";


export default buildModule("CoinFlipModule", (m) => {
  const coinFlip = m.contract("CoinFlip");

  m.call(coinFlip, "guessCoinFlip");

  return { coinFlip };
});
