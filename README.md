# 4H-FourHours
NFT(ERC721) - 07/31/2022
---
**4H** - Сreating a contract for _sale_, and the contract for _creating_ NFT.

+ Only the **contract-seller** can mint NFT.
+ Creating and buying the NFT, **not more than four hours** after deploying these contracts.
+ Owner can **set** the image himself.

---
## Hardhat Project

In this project using **"Yarn"**.

+ **yarn build** - for _compile_ contracts;
+ **yarn test** - for _testing_ contracts;
+ **yarn coverage** - for see _coverage_;
+ **yarn size** - for see the _size_ of all contracts;
+ **prettier** - for code _formatting_;

---
___MarketNFT.sol :___
> This contract can **sell NFTs**, an **owner** must set the address of the **new token contract**.

___FourHoursNFT.sol :___
> The contract is an _example_ of how the first and second contracts _work_ together. 
> + This token contract _can_ mint NFTs not more than four hours after _deploys_. 
---
