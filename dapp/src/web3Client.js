// import Web3 from "web3";
import Web3 from 'web3';
import contractBuild from 'contracts/PrivatePaywall.json'

let selectedAccount;
let isInitialized = false;
let paywallContract;


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

    // get contract
    const web3 = new Web3(provider);
    const networkId = await web3.eth.net.getId();
    paywallContract = new web3.eth.Contract(
      contractBuild.abi,
      contractBuild.networks[networkId].address
    );
    isInitialized = true;
  }
}

export const getUsersPermissions = async () => {
  if (isInitialized) {
    return paywallContract.methods.usersPermissions().call()
  } else {
    console.log("nor initialized")
  }
}

export const addUsersPermission = async (articleId) => {
  if (typeof paywallContract !== "undefined") {
    console.log("buying...")
    const result = await paywallContract.methods.addPermission(selectedAccount, articleId).call()
    console.log(result)

    console.log("permissions after buying:")
    const permissions = await getUsersPermissions()
    console.log(permissions)
  } else {
    console.log("no contract instance")
  }
}