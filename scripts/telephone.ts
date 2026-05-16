import { network } from "hardhat";

const TELEPHONE_ADDRESS = "0xebB3bba65BB66cfA541949a7276F4044F6B2206c";
const TELEPHONE_OWNER_ABI = ["function owner() public view returns (address)"];

const { ethers } = await network.create();
const telephone = await ethers.getContractAt(TELEPHONE_OWNER_ABI, TELEPHONE_ADDRESS);




const owner = await telephone.owner();
console.log("owner:", owner);
