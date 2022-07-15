const PrivatePaywall = artifacts.require("PrivatePaywall")

contract("PrivatePaywall", (accounts) => {
  it("should be deployed", async () => {
    const privatePaywallInstance = await PrivatePaywall.deployed();
  });

  it("adding permissions should add permissions to article", async () => {
    const privatePaywallInstance = await PrivatePaywall.deployed();
    await privatePaywallInstance.addPermission(accounts[0], 1);
    await expect(await privatePaywallInstance.hasPermission(accounts[0], 1)).to.be.true;
    await expect(await privatePaywallInstance.hasPermission(accounts[0], 2)).to.be.false;
  });

  it("pay for permission, get permission", async () => {
    const privatePaywallInstance = await PrivatePaywall.deployed();
    await privatePaywallInstance.buyPermission(1, { value: web3.utils.toWei("1", "ether"), from: accounts[0] });

    await expect(await privatePaywallInstance.hasPermission(accounts[0], 1)).to.be.true;
  });
})

contract("PrivatePaywall", (accounts) => {
  it("check all users permissions", async () => {
    const privatePaywallInstance = await PrivatePaywall.deployed();
    await privatePaywallInstance.addPermission(accounts[0], 1);
    await privatePaywallInstance.addPermission(accounts[0], 2);

    const result = await privatePaywallInstance.usersPermissions({ from: accounts[0] })
    const mappedResult = result.map((e) => e.words[0])

    await expect(mappedResult).to.have.members([1, 2])
  });
})