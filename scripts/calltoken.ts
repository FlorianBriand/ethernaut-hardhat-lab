import { network } from "hardhat";

const CALL_TOKEN_ADDRESS = "0x95012125676196B42F7c29a975Af0eF94c65a0aA";
const TOKEN_ADDRESS = "0xeBF01D28A19fe3D2276cf26fd22E0A1eA725EE68";

const TOKEN_ABI = [
  "function balanceOf(address account) external view returns (uint256)",
  "function transfer(address recipient, uint256 amount) external returns (bool)",
];

const { ethers } = await network.create();
const [player] = await ethers.getSigners();
const playerAddress = await player.getAddress();


const token = await ethers.getContractAt(TOKEN_ABI, TOKEN_ADDRESS);
const callToken = await ethers.getContractAt("CallToken", CALL_TOKEN_ADDRESS);

const initialBalance = await token.balanceOf(playerAddress);
console.log("Player initial balance:", initialBalance.toString());

const callTx = await callToken.connect(player).getFunction("callToken")();
await callTx.wait();


const contractBalance = await token.balanceOf(CALL_TOKEN_ADDRESS);
console.log("Player contract balance:", contractBalance.toString());

const finalBalance = await token.balanceOf(playerAddress);
console.log("Player final balance:", finalBalance.toString());
console.log("Challenge solved:", finalBalance > 20n);
