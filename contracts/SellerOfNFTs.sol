//SPDX-License-Identifier: MIT

pragma solidity 0.8.1;

import '@openzeppelin/contracts/access/Ownable.sol';
import './Token/IFourHoursNFT.sol';

/**
 * @author by CTAPCKPIM
 * @title main contract for 'FourHoursNFT.sol'
 *  This contract should create and sell NFTs, 
 *  but this does you can only hours, 
 *  with a moment when the NFT contract was be deployed.
 */
 contract SellerOfNFTs is Ownable{

 	/**
 	 * All variables:
 	 *  {count} - count of NFTs.
     *  {price} - a price on NFT(0.1 ETH).
     *  {percent} - percent of the number {price}.
     *  {addressNFT} - saves an address of the 'FourHoursNFT'.
 	 */
    uint256 public count;
    uint256 public price;
    uint256 public percent;  
    address public addressNFT; 

 	/**
 	 * All events:
 	 *  {Successfully} - show the number and address of the NFT
 	 *  {Withdrawal} - show who got ether.
 	 */
 	event Successfully(uint256 count, address owner);
 	event Withdrawal(uint256 eth, address to);

 	/**
 	 * All mapping:
 	 *  {owner} - saving  the owner of NFT.
 	 *  {NFT} - saving  NFT of the owner.
 	 */
 	mapping(uint256 => address) public owner;
 	mapping(address => uint256) public nft;

 	/**
 	 * Assigns values to variables.
 	 */
 	constructor() {
      price = 0.1 * 1 ether; 
      percent = 5;
      count = 1;
 	}

 	/**
 	 * Creating and buying a NFT:
 	 *  - adding a new owner of the NFT(for the search owner of the NFT).
 	 *  - add a new NFT of the owner(for the search NFT of the owner).
     * {price} - increases on 5%/
     * {IFourHoursNFT} - an interface of the 'FourHoursNFT.sol' contract.
 	 */
 	function createAndBuy(string memory _tokenURI) public payable returns(uint256) {
      require(addressNFT != address(0), 'ERR: address/no exist'); 
      require(msg.value == price, 'ERR: price');
      IFourHoursNFT(addressNFT).createNFT(msg.sender, _tokenURI, count, address(this));
      owner[count] = msg.sender;
      nft[msg.sender] = count;
 	  count += 1;
      price += ((price * percent) / 100); 
 	  emit Successfully(count, msg.sender);
      return count;
 	}

 	/**
 	 * Withdrawal of the ETH:
 	 *  - withdrawing all the balance of the smart contract.
  	 */
 	function withdrawal(address _to) public payable onlyOwner returns(uint256) {
      uint256 eth = address(this).balance;
 	  payable(_to).transfer(eth);
 	  emit Withdrawal(eth, _to);
      return eth;
 	}

   /**
    * Setting an address of NFT contract.
    */
   function addressOfNFT(address _addressOfNFT) public onlyOwner {
      addressNFT = _addressOfNFT;
   }

   /**
    * {fallback} and {receive()} - In order for the contract to accept ether, to its balance
    */
   fallback() external payable {}
   receive() external payable {}
 }