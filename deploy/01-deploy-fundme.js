const { ethers } = require("hardhat");

async function main() {
  const owner = await ethers.getSigners()[0];

  const contractFactory = await ethers.getContractFactory("FundMe");

  console.log("Deploying...");

  const contract = await contractFactory.deploy(
    "0x694aa1769357215de4fac081bf1f309adc325306"
  );

  const log = await contract.deployed();
  //console.log(log);
  console.log("Deployed the Contract");

  /* 
    Contract Interactions
*/
  const version = await contract.getVersion();
  console.log("The version is: ", version);
}

main();
