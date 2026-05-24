import { network } from "hardhat";

const { ethers } = await network.create();

const KING_VAULT_ADDRESS = "0x6289E6F0E0cf0328e7A78af5d5415c4e51D511E5";

const ABI_CONTRACT_KING = [
  "function _king() public view returns (address)",
  "function prize() view returns (uint256)",
  "function owner() view returns (address)",
];

const contract = await ethers.getContractAt(ABI_CONTRACT_KING, KING_VAULT_ADDRESS);

const currentKing = await contract._king();
const currentPrize = await contract.prize();
const currentOwner = await contract.owner();

console.log(`Current King: ${currentKing}`);
console.log(`Current Prize: ${currentPrize}`);
console.log(`Current Owner: ${currentOwner}`);

// 