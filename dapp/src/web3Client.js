// import Web3 from "web3";
import Web3 from 'web3';
import contractBuild from 'contracts/PrivatePaywall.json'

let selectedAccount;
let isInitialized = false;
let paywallContract;
let web3;


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
    web3 = new Web3(provider);
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
    
    paywallContract.methods.buyPermission(articleId).send({
      from: selectedAccount,
      value: web3.utils.toWei("1", "ether")
    })
  } else {
    console.log("no contract instance")
  }
}

export const checkPermissionForArticle = async (articleId) => {
  const allPermissions = await getUsersPermissions()
  if (allPermissions.includes(articleId.toString())) {
    return true
  } else {
    return false
  }
}