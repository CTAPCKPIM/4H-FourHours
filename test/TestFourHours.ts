import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('FourHours: ', () => {
	const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
	const _value = 100000000000000000n;
	let owner: any;
	let user: any;
	let fourHours: any;
	let fourHoursNFT: any;

	beforeEach(async () => {
		// Getting address for testing.
		[owner, user] = await ethers.getSigners();

		// Deployed 'FourHours.sol'.
		const FourHours = await ethers.getContractFactory('FourHours', owner);
		fourHours = await FourHours.deploy();
		await fourHours.deployed();

		// Deployed 'FourHoursNFT.sol'.
		const FourHoursNFT = await ethers.getContractFactory('FourHoursNFT', owner);
		fourHoursNFT = await FourHoursNFT.deploy(fourHours.address);
		await fourHoursNFT.deployed();

		// Setting the address of 'FourHoursNFT.sol.'
		await fourHours.addressOfNFT(fourHoursNFT.address);
	});

	// Deploys the contract.
	it('Should be deployed.', async () =>{
		await expect(fourHours.address).to.be.properAddress;
	});

	// Calling a 'createAndBuy' function, and send 0.1 ETH.
	it('Should be created token.', async () => {
		await expect(fourHours.connect(user).createAndBuy('https://www.japancars.ua/',{value : _value}))
		.to.emit(fourHours, 'Successfully').withArgs(2, anyValue);
	});

	// Calling a 'withdrawal' function, and withdrawal ETH.
	it('Successfully withdrawal.', async () => {
		await fourHours.connect(user).createAndBuy('https://www.japancars.ua/',{value : _value});
		await expect(fourHours.connect(owner).withdrawal(owner.address))
		.to.emit(fourHours, 'Withdrawal').withArgs(_value, anyValue);
	});

	// For the error call - 'ERR: address/no exist'.
	it('Should be the error: "ERR: address/no exist".', async () => {
		// Deployed 'FourHours.sol'. 
		const _FourHours = await ethers.getContractFactory('FourHours', user);
		const _fourHours = await _FourHours.deploy();
		await _fourHours.deployed();

		// Deployed 'FourHoursNFT.sol'.
		const _FourHoursNFT = await ethers.getContractFactory('FourHoursNFT', user);
		const _fourHoursNFT = await _FourHoursNFT.deploy(_fourHours.address);
		await _fourHoursNFT.deployed();

		const message = 'ERR: address/no exist';
		await expect(_fourHours.connect(user).createAndBuy('https://www.japancars.ua',{value : _value}))
		.to.be.revertedWith(message);
	});

	//For the error call - 'ERR: price'.
	it('Should be the error: "ERR: price".', async () => {
		const message = 'ERR: price';
		await expect(fourHours.connect(user).createAndBuy('https://www.japancars.ua'))
		.to.be.revertedWith(message);
	});

	//For the test transaction on the smart contract.
	it('Should be: transfer ETH on smart contract.', async () => {
		const transactionHash = await owner.sendTransaction({
  		to: fourHours.address,
  		value: ethers.utils.parseEther("1.0"),
		});
		await expect(() => transactionHash).to.changeEtherBalance(
			fourHours.address, 
			1000000000000000000n
		);
  	});
});