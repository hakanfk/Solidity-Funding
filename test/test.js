const { ethers } = require("hardhat");
const { expect } = require("chai");

describe("FundMe contract", function () {
  let FundMe;
  let fundMe;
  let owner;
  let addr1;

  beforeEach(async function () {
    FundMe = await ethers.getContractFactory("FundMe");
    [owner, addr1] = await ethers.getSigners();

    const priceFeedAddress = "0x694aa1769357215de4fac081bf1f309adc325306";

    fundMe = await FundMe.deploy(priceFeedAddress);
    await fundMe.deployed();
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await fundMe.i_owner()).to.equal(owner.address);
    });

    it("Should set the right price feed", async function () {
      expect(await fundMe.priceFeed()).to.equal(priceFeedAddress);
    });
  });

  describe("Funding", function () {
    it("Should fund", async function () {
      await fundMe.connect(addr1).fund({ value: ethers.utils.parseEther("1") });

      expect(await fundMe.addressToAmountFunded(addr1.address)).to.equal(
        ethers.utils.parseEther("1")
      );
    });

    it("Should not allow funding less than the minimum", async function () {
      await expect(
        fundMe.connect(addr1).fund({ value: ethers.utils.parseEther("0.01") })
      ).to.be.revertedWith("You need to spend more ETH!");
    });
  });

  describe("Withdrawal", function () {
    it("Should allow owner to withdraw", async function () {
      await fundMe.connect(owner).withdraw();
      expect(await ethers.provider.getBalance(fundMe.address)).to.equal(0);
    });

    it("Should not allow non-owner to withdraw", async function () {
      await expect(fundMe.connect(addr1).withdraw()).to.be.revertedWith(
        "NotOwner"
      );
    });
  });
});
