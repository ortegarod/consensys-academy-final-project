const OnlineMarketplace = artifacts.require("OnlineMarketplace");

module.exports = function (deployer) {
  deployer.deploy(OnlineMarketplace);
};
