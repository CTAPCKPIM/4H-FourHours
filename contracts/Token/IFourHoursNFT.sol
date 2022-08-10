//SPDX-License-Identifier: MIT

pragma solidity 0.8.1;

/**
 * @author by CTAPCKPIM
 * @title interface for contract 'FourHoursNFT.sol'
 */
interface IFourHoursNFT {

	/**
	 * Used in 'FourHours.sol' contract.
	 */
	function createNFT(
		address _address, 
		string memory _tokenURI, 
		uint256 _count, 
		address _fourHours
	) external;
}