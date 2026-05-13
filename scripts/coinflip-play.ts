import { network } from "hardhat";

const COINFLIP_ADDRESS = "0x5262bc608268a144Ed306c3dd32d793Ce1B7d424";

const { ethers } = await network.create();
const coinFlip = await ethers.getContractAt("CoinFlip", COINFLIP_ADDRESS);

const tx = await coinFlip.guessCoinFlip();
console.log("txHash:", tx.hash);

const receipt = await tx.wait();
console.log("status:", receipt?.status ?? "unknown");
