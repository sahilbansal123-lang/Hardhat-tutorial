const {expect} = require("chai");

describe("Token Contract", function () {
   
    it("Deployment should assign the total supply of token to the owner", async function() {

        const [owner] = await ethers.getSigners();

        console.log("Signers Object:", owner);
        const Token = await ethers.getContractFactory("Token"); // instace contract

        const hardhatToken = await Token.deploy(); // deploy contract

        const ownerBalance = await hardhatToken.getBalance(owner.address); // owner balance = 10000
        console.log("Owner Address:", owner.address);

        expect(await hardhatToken.totalSupply()).to.equal(ownerBalance);  // total supply == 10000 
        
    })
    
});