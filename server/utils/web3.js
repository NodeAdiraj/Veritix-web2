// server/utils/web3.js
const { ethers } = require("ethers");
require("dotenv").config();
const abi = require("./abi/Veritix.json").abi;

const provider = new ethers.JsonRpcProvider(process.env.RPC_URL);

// 🔐 Main wallet (custodian)
const mainWallet = new ethers.Wallet(process.env.MAIN_PRIVATE_KEY, provider);

// 🎟️ Veritix Contract instance
const contractAddress = process.env.CONTRACT_ADDRESS;
const contract = new ethers.Contract(contractAddress, abi, mainWallet);

// const functionFragments = contract.interface.fragments.filter(frag => frag.type === 'function');
// console.log('Available functions:');
// functionFragments.forEach(frag => {
//   console.log(frag.name);
// });


function createCustodianWallet() {
  const wallet = ethers.Wallet.createRandom();
  return {
    address: wallet.address,
    privateKey: wallet.privateKey,
  };
}

module.exports = {
  mainWallet,
  contract,
  createCustodianWallet,
};
