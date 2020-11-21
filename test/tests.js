const OnlineMarketplace = artifacts.require("OnlineMarketplace");
const TruffleAssert = require("truffle-assertions");


contract("OnlineMarketplace", async accounts => {

    it("should not allow non-owner to withdraw", async () => {
        let instance = await OnlineMarketplace.deployed();
        await TruffleAssert.fails(instance.withdrawAll({from: accounts[1]}));
    })

    it("should allow owner to withdraw", async () => {
        let instance = await OnlineMarketplace.deployed();
        await TruffleAssert.passes(instance.withdrawAll({from: accounts[0]}));
    })

    it("should create Product struct instance in orders mapping with unique order ID", async () => {
        let instance = await OnlineMarketplace.deployed();
        await instance.buyItem(7, {value: web3.utils.toWei('1.110', 'ether'), from: accounts[0]});

        let result = await instance.orders(18, 7);
        assert(result.orderID.toNumber() === 18, "orderID not set correctly")
    })

    it("should not allow non-seller to update tracking number for order", async () => {
        let instance = await OnlineMarketplace.deployed();
        await TruffleAssert.fails(instance.itemShipped(18, 7, 123456789, {from: accounts[1]}));
    })

    it("should update tracking number for order", async () => {
        let instance = await OnlineMarketplace.deployed();
        await instance.itemShipped(18, 7, 123456789, {from: accounts[0]});

        let result = await instance.orders(18, 7);
        assert(result.trackingNumber.toNumber() === 123456789, "tracking number not set correctly")
    })

    it("should toggle circuit breaker", async () => {
        let instance = await OnlineMarketplace.deployed();
        await instance.toggleCircuitBreaker();
        let result = await instance.isActive();
        assert(result === false, "circuit breaker not toggled");
    })

    it("should not allow owner to withdraw due to circuit breaker", async () => {
        let instance = await OnlineMarketplace.deployed();
        await TruffleAssert.fails(instance.withdrawAll({from: accounts[0]}));
    })

})