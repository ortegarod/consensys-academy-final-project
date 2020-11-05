const OnlineMarketplace = artifacts.require("OnlineMarketplace");
var address;

module.exports = function (deployer) {
  deployer.deploy(OnlineMarketplace)
  .then(function () {
    console.log({OnlineMarketplace: OnlineMarketplace.address});
    address=OnlineMarketplace.address;
  })
};
