const {expect} = require("chai");

describe("Token Contract", function () {
   
    it("Deployment should assign the total supply of token to the owner", async function() {

        const [owner] = await ethers.getSigners();

        const Token = await ethers.getContractFactory("Token"); // instace contract

        const hardhatToken = await Token.deploy(); // deploy contract

        const ownerBalance = await hardhatToken.getBalance(owner.address); // owner balance = 10000

        expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);  // total supply == 10000 
    });
    
    it("Should Transfer Funds between accounts", async function() {

        const [owner, addr1, addr2] = await ethers.getSigners();

        const Token = await ethers.getContractFactory("Token"); // instace contract

        const hardhatToken = await Token.deploy(); // deploy contract

        // Transfer 10 tokens from owner to address1
        await hardhatToken.transfer(addr1.address, 10);
        expect(await hardhatToken.getBalance(addr1.address)).to.equal(10);
        
        // 5 token from addr1 tot addr2
        await hardhatToken.connect(addr1).transfer(addr2.address, 5);
        expect(await hardhatToken.getBalance(addr2.address)).to.equal(5);
    });
    
});