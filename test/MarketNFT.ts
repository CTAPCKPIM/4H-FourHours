import { expect } from "chai";
import { ethers } from "hardhat";

describe("MarketNFT: ", () => {
  const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
  const _value = 100000000000000000n;
  let owner: any;
  let user: any;
  let marketNFT: any;
  let fourHoursNFT: any;

  beforeEach(async () => {
    // Getting address for testing.
    [owner, user] = await ethers.getSigners();

    // Deployed 'MarketNFT.sol'.
    const MarketNFT = await ethers.getContractFactory("MarketNFT", owner);
    marketNFT = await MarketNFT.deploy();
    await marketNFT.deployed();

    // Deployed 'FourHoursNFT.sol'.
    const FourHoursNFT = await ethers.getContractFactory("FourHoursNFT", owner);
    fourHoursNFT = await FourHoursNFT.deploy(marketNFT.address);
    await fourHoursNFT.deployed();

    // Setting the address of 'FourHoursNFT.sol.'
    await marketNFT.addressOfNFT(fourHoursNFT.address);
  });

  // Deploys the contract.
  it("Should be deployed.", async () => {
    await expect(marketNFT.address).to.be.properAddress;
  });

  // Calling a 'createAndBuy' function, and send 0.1 ETH.
  it("Should be created token.", async () => {
    await expect(
      marketNFT.connect(user).createAndBuy("https://www.japancars.ua/", { value: _value })
    )
      .to.emit(marketNFT, "Successfully")
      .withArgs(2, anyValue);
  });

  // Calling a 'withdrawal' function, and withdrawal ETH.
  it("Successfully withdrawal.", async () => {
    await marketNFT.connect(user).createAndBuy("https://www.japancars.ua/", { value: _value });
    await expect(marketNFT.connect(owner).withdrawal(owner.address))
      .to.emit(marketNFT, "Withdrawal")
      .withArgs(_value, anyValue);
  });

  // For the error call - 'ERR: address/no exist'.
  it('Should be the error: "ERR: address/no exist".', async () => {
    // Deployed 'FourHours.sol'.
    const _MarketNFT = await ethers.getContractFactory("MarketNFT", user);
    const _marketNFT = await _MarketNFT.deploy();
    await _marketNFT.deployed();

    // Deployed 'FourHoursNFT.sol'.
    const _FourHoursNFT = await ethers.getContractFactory("FourHoursNFT", user);
    const _fourHoursNFT = await _FourHoursNFT.deploy(_marketNFT.address);
    await _fourHoursNFT.deployed();

    const message = "ERR: address/no exist";
    await expect(
      _marketNFT.connect(user).createAndBuy("https://www.japancars.ua", { value: _value })
    ).to.be.revertedWith(message);
  });

  //For the error call - 'ERR: price'.
  it('Should be the error: "ERR: price".', async () => {
    const message = "ERR: price";
    await expect(
      marketNFT.connect(user).createAndBuy("https://www.japancars.ua")
    ).to.be.revertedWith(message);
  });

  //For the test transaction on the smart contract.
  it("Should be: transfer ETH on smart contract.", async () => {
    const transactionHash = await owner.sendTransaction({
      to: marketNFT.address,
      value: ethers.utils.parseEther("1.0"),
    });
    await expect(() => transactionHash).to.changeEtherBalance(
      marketNFT.address,
      1000000000000000000n
    );
  });

  //For test the 'fallback()' function.
  it("should be: work the fallback() function", async () => {
    const tx = await owner.sendTransaction({
      to: marketNFT.address,
      data: "0x01",
      value: ethers.utils.parseEther("1.0"),
    });
  });

  /**
   * Test 'FourHoursNFT' contract.
   */

  //For the error call - 'ERR: time'.
  it('Should be the error: "ERR: time"', async () => {
    await ethers.provider.send("evm_increaseTime", [14400]);
    const message = "ERR: time";
    await expect(
      fourHoursNFT
        .connect(user)
        .createNFT(user.address, "https://www.japancars.ua", 1, marketNFT.address)
    ).to.be.revertedWith(message);
  });

  //For the error call - 'ERR: price'.
  it('Should be the error: "ERR: address"', async () => {
    const message = "ERR: address";
    await expect(
      fourHoursNFT
        .connect(user)
        .createNFT(user.address, "https://www.japancars.ua", 1, user.address)
    ).to.be.revertedWith(message);
  });
});
