import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
require('hardhat-contract-sizer');

const config: HardhatUserConfig = {
  solidity: "0.8.1",
};

export default config;
