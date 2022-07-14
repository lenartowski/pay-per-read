// import Web3 from "web3";
import Web3 from 'web3';

let selectedAccount;
let isInitialized = false;


export const initWeb3 = async () => {
  let provider = window.ethereum;

  if (typeof provider !== "undefined") {
    // connect to wallet
    provider
      .request({ method: 'eth_requestAccounts' })
      .then((accounts) => {
        selectedAccount = accounts[0]
        console.log(`Selected account ${selectedAccount}`)
      })
      .catch((err) => {
        console.log(err);
        return
      })

    // log account change
    window.ethereum.on('accountsChanged', function (accounts) {
      selectedAccount = accounts[0];
      console.log(`Selected account changed to ${selectedAccount}`);
    });
    isInitialized = true;
  }
}