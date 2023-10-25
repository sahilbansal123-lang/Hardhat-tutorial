const {expect} = require("chai");
const { ethers } = require("hardhat");

describe("Token Contract", function () {

    let Token;
    let hardHatToken;
    let owner;
    let addr1;
    let addr2;
    let addr3;

    beforeEach(async function() {
        Token = await ethers.getContractFactory("Token");
        [owner, addr1, addr2,...addrs] = await ethers.getSigners();
        hardHatToken = await Token.deploy();
    })
})