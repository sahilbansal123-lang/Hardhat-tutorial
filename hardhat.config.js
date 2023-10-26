/** @type import('hardhat/config').HardhatUserConfig */

require("@nomiclabs/hardhat-waffle");

const ALCHEMY_API_KEY = "db06P1IfFdlZMQ3YvlE1WeOkESIvt2sT";
const SEPOLIA_PRIVATE_KEY =
  "b49de62fdd943b7120a8a335a0aa2f7cce34debd0b0a4b0412b5d800ab6c1774";
module.exports = {
  solidity: "0.8.9",

  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/${ALCHEMY_API_KEY}`,
      accounts: [`${SEPOLIA_PRIVATE_KEY}`],
    },
  },
};
