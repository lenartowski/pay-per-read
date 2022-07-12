var PrivatePaywall = artifacts.require("PrivatePaywall");

module.exports = function(deployer) {
  // deployment steps
  deployer.deploy(PrivatePaywall);
};