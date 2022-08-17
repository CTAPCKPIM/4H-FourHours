import { expect } from 'chai';
import { ethers } from 'hardhat';

describe('FourHoursNFT: ', () => {
	let owner: any;
	let user: any;
	let sellerOfNFTs: any;
	let fourHoursNFT: any;

	beforeEach(async () => {
		// Getting address for testing.
		[owner, user] = await ethers.getSigners();

		// Deployed 'FourHours.sol'.
		const SellerOfNFTs = await ethers.getContractFactory('SellerOfNFTs', owner);
		sellerOfNFTs = await SellerOfNFTs.deploy();
		await sellerOfNFTs.deployed();

		// Deployed 'FourHoursNFT.sol'.
		const FourHoursNFT = await ethers.getContractFactory('FourHoursNFT', owner);
		fourHoursNFT = await FourHoursNFT.deploy(sellerOfNFTs.address);
		await fourHoursNFT.deployed();

		// Setting the address of 'FourHoursNFT.sol'.
		await sellerOfNFTs.addressOfNFT(fourHoursNFT.address);
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
				sellerOfNFTs.address
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
