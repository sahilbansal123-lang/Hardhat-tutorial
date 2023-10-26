const { expect } = require("chai");
const { ethers, hardhatArguments } = require("hardhat");

describe("Token Contract", function () {
  let Token;
  let hardHatToken;
  let owner;
  let addr1;
  let addr2;
  let addr3;

  beforeEach(async function () {
    Token = await ethers.getContractFactory("Token");
    [owner, addr1, addr2, ...addrs] = await ethers.getSigners();
    hardHatToken = await Token.deploy();
  });

  describe("Deployement", function () {
    it("Should set the right owner", async function () {
      expect(await hardHatToken.owner()).to.equal(owner.address);
    });

    it("Should assign the total supply of token to the owner", async function () {
      const ownerBalance = await hardHatToken.getBalance(owner.address);
      expect(await hardHatToken.totalSupply()).to.equal(ownerBalance);
    });
  });

  describe("Transaction", function () {
    it("Should transfer tokens between accounts", async function () {
      await hardHatToken.transfer(addr1.address, 5);
      const addr1Balance = await hardHatToken.getBalance(addr1.address);
      expect(addr1Balance).to.equal(5);

      await hardHatToken.connect(addr1).transfer(addr2.address, 5);
      const addr2Balance = await hardHatToken.getBalance(addr2.address);
      expect(addr2Balance).to.equal(5);
    });

    it("Should fail if sender doesnot have enough tokens", async function () {
      const initialOwnerBalance = await hardHatToken.getBalance(owner.address);

      await expect(
        hardHatToken.connect(addr1).transfer(owner.address, 1)
      ).to.be.revertedWith("Not enough Tokens");
      expect(await hardHatToken.getBalance(owner.address)).to.equal(
        initialOwnerBalance
      );
    });

    it("Should update Balances after transfer", async function () {
      const initialOwnerBalance = await hardHatToken.getBalance(owner.address);
      await hardHatToken.transfer(addr1.address, 10);
      await hardHatToken.transfer(addr2.address, 10);

      const finalBalance = await hardHatToken.getBalance(owner.address);
      expect(finalBalance).to.equal(initialOwnerBalance - 20);

      const addr1Balance = await hardHatToken.getBalance(addr1.address);
      expect(addr1Balance).to.equal(10);
      const addr2Balance = await hardHatToken.getBalance(addr2.address);
      expect(addr2Balance).to.equal(10);
    });
  });
});
