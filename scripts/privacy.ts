import { network } from "hardhat";

const { ethers, networkName } = await network.create();



async function main() {

  console.log(`Deploying Counter to ${networkName}...`);

  const privacy = await ethers.deployContract("Privacy", [[
    "0x0000000000000000000000000000000000000000000000000000000000000000",
    "0x0000000000000000000000000000000000000000000000000000000000000000",
    "0x000000000000000000000000131c3249e115491e83de375171767af07906ea36"
  ]]);

  console.log("Waiting for the deployment tx to confirm");
  await privacy.waitForDeployment();
  
  console.log("Counter address:", await privacy.getAddress());

  console.log("Calling getPassword()...");
  const tx = await privacy.getPassword();
  await tx.wait();
  console.log("getPassword() called successfully");
  // Print the password (bytes16) returned by getPassword()
  console.log("Password (bytes16):", await privacy.password());

}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});


/*
// From blockchain explorer
const bytes32Value = "0xdfc86b17000000000000000000000000131c3249e115491e83de375171767af07906ea36";

// Decode the bytes32 value to get the password
const decodedPassword = ethers.toUtf8String(bytes32Value);
console.log(`Decoded password: ${decodedPassword}`);
*/