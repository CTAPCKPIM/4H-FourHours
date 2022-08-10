import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('FourHoursNFT: ', () => {
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

		// Setting the address of 'FourHoursNFT.sol'.
		await fourHours.addressOfNFT(fourHoursNFT.address);
	});

	// Deploys the contract.
	it('Should be deployed(token).', async () => {
		await expect(fourHoursNFT.address).to.be.properAddress;
	});

	//For the error call - 'ERR: time'.
	it('Should be the error: "ERR: time"', async () => {
		await ethers.provider.send('evm_increaseTime', [14400]);
		const message = 'ERR: time';
		await expect(fourHoursNFT.connect(user)
			.createNFT(
				user.address,
				'https://www.japancars.ua',
				1,
				fourHours.address
			))
		.to.be.revertedWith(message);
	});

	//For the error call - 'ERR: price'.
	it('Should be the error: "ERR: address"', async () => {
		const message = 'ERR: address';
		await expect(fourHoursNFT.connect(user)
			.createNFT(
				user.address,
				'https://www.japancars.ua',
				1,
				user.address
			))
		.to.be.revertedWith(message);
	});	
});
