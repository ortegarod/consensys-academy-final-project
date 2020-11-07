const OnlineMarketplace = artifacts.require("OnlineMarketplace");

module.exports = function (deployer) {
  deployer.deploy(OnlineMarketplace)
  .then(function(instance) {
    instance.newStore("qm");
    instance.newStore("je");
    instance.newStore("mayeli");
    instance.newStore("ebay");
    instance.newStore("wal-mart");
    instance.newStore("pawn");
    instance.newProduct("juice", "PngYbaInyQBTuTsjejoF", getRandomInt(999), getRandomInt(9999999999), getRandomInt(99), 1);
    instance.newProduct("meat", "PngYbaInyQBTuTsjejoF", getRandomInt(999), getRandomInt(9999999999), getRandomInt(99), 1);
    instance.newProduct("spaghetti", "PngYbaInyQBTuTsjejoF", getRandomInt(999), getRandomInt(9999999999), getRandomInt(99), 2);
    instance.newProduct("milk", "PngYbaInyQBTuTsjejoF", getRandomInt(999), getRandomInt(9999999999), getRandomInt(99), 2);
    instance.newProduct("eggs", "PngYbaInyQBTuTsjejoF", getRandomInt(999), getRandomInt(9999999999), getRandomInt(99), 3);
    instance.newProduct("meatballs", "PngYbaInyQBTuTsjejoF", getRandomInt(999), getRandomInt(9999999999), getRandomInt(99), 3);
    instance.newProduct("banana", "PngYbaInyQBTuTsjejoF", getRandomInt(999), getRandomInt(9999999999), getRandomInt(99), 4);
    instance.newProduct("water", "PngYbaInyQBTuTsjejoF", getRandomInt(999), getRandomInt(9999999999), getRandomInt(99), 4);
    instance.newProduct("clothes", "PngYbaInyQBTuTsjejoF", getRandomInt(999), getRandomInt(9999999999), getRandomInt(99), 5);
    instance.newProduct("oil", "PngYbaInyQBTuTsjejoF", getRandomInt(999), getRandomInt(9999999999), getRandomInt(99), 5);
    instance.newProduct("vodka", "PngYbaInyQBTuTsjejoF", getRandomInt(999), getRandomInt(9999999999), getRandomInt(99), 6);

  })
};

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}