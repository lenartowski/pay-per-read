const PrivatePaywall = artifacts.require("PrivatePaywall")
// const PrivatePaywall = artifacts.require("../contracts/PrivatePaywall.sol")

let privatePaywallInstance;

contract("PrivatePaywall", (accounts) => {
  it("should be deployed", async () => {
    privatePaywallInstance = await PrivatePaywall.deployed();
  });

  it("check permissions", async () => {
    // await privatePaywallInstance.addPermission.call(accounts[0], 1);
    // const _permissions = await privatePaywallInstance.hasPermission.call(accounts[0], 1);
    await privatePaywallInstance.addPermission(accounts[0], 1);
    const _permissionsGranted = await privatePaywallInstance.hasPermission(accounts[0], 1);
    await assert.equal(_permissionsGranted, true);

    await assert.equal(
      await privatePaywallInstance.hasPermission(accounts[0], 2),
      false
    );
  });
})