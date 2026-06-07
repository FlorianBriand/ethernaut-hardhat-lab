import { expect } from "chai";
import { network } from "hardhat";

const { ethers } = await network.create();

describe("Security hardening", function () {
  it("restricts SendEtherToForce withdraw() to owner", async function () {
    const [owner, other] = await ethers.getSigners();
    const forceSender = await ethers.deployContract("SendEtherToForce");

    await owner.sendTransaction({ to: forceSender.target, value: 1n });

    await expect(forceSender.connect(other).withdraw()).to.be.revertedWith(
      "Only owner",
    );
    await expect(forceSender.connect(owner).withdraw()).to.not.be.reverted;
  });

  it("restricts SendEtherToForce attack() to owner", async function () {
    const [owner, other] = await ethers.getSigners();
    const forceSender = await ethers.deployContract("SendEtherToForce");

    await expect(
      forceSender.connect(other).attack(owner.address),
    ).to.be.revertedWith("Only owner");
  });

  it("restricts Reentrancy collect() to owner", async function () {
    const [owner, other] = await ethers.getSigners();
    const reentrancy = await ethers.deployContract("Reentrancy", [
      ethers.ZeroAddress,
    ]);

    await owner.sendTransaction({ to: reentrancy.target, value: 1n });

    await expect(reentrancy.connect(other).collect()).to.be.revertedWith(
      "Only owner",
    );
    await expect(reentrancy.connect(owner).collect()).to.not.be.reverted;
  });
});
