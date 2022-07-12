const PrivatePaywall = artifacts.require("PrivatePaywall")
// const PrivatePaywall = artifacts.require("../contracts/PrivatePaywall.sol")

let privatePaywallInstance;

contract("PrivatePaywall", (accounts) => {
  it("should be deployed", async () => {
    privatePaywallInstance = await PrivatePaywall.deployed();
  });

  it("adding permissions should add permissions to article", async () => {
    await privatePaywallInstance.addPermission(accounts[0], 1);
    await expect(await privatePaywallInstance.hasPermission(accounts[0], 1)).to.be.true;
    await expect(await privatePaywallInstance.hasPermission(accounts[0], 2)).to.be.false;
  });

  it("pay for permission, get permission", async () => {
    await privatePaywallInstance.buyPermission(1, {value: web3.utils.toWei("1", "ether"), from: accounts[0]});

    await expect(await privatePaywallInstance.hasPermission(accounts[0], 1)).to.be.true;
  });
})