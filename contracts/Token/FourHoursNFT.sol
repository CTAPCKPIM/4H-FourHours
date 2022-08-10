//SPDX-License-Identifier: MIT

pragma solidity 0.8.1;

import '@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol';
import './IFourHoursNFT.sol';

/**
 * @author by CTAPCKPIM
 * @title NFT for contract 'FourHours.sol'
 */
 contract FourHoursNFT is ERC721URIStorage {
    /**
     * All variables:
     *  {mainTimestamp} - saving timestamp 'now', when the contract will to be deployed.
     *  {fourHours} - savs the address of FourHours.sol.
     */
    uint256 public mainTimestamp;
    uint256 public futureTimestamp;
    address public fourHours;
 	
    /**
     * Assigns value to variable.
     */
    constructor(address _addressFourHours) ERC721('FourHours', '4H') {
        fourHours = _addressFourHours;
        mainTimestamp = block.timestamp;
    }

    /**
     * Create the NFT:
     *  {_address} - owner of the NFT.
     *  {_count} - id of the NFT.
     *  {_fourHours} - address of the FourHours.sol
     */
    function createNFT(address _address,
        string memory _tokenURI, 
        uint256 _count, 
        address _fourHours
    ) public {
        require(mainTimestamp + 14400 seconds >= block.timestamp, 'ERR: time');
        require(_fourHours == fourHours, 'ERR: address');
        _mint(_address, _count);
        _setTokenURI(_count, _tokenURI);
    }
}