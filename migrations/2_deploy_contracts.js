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
    instance.newProduct("juice", "PngYbaInyQBTuTsjejoF", web3.utils.toWei('1.110', 'ether'), 439491559042, 2, 1);
    instance.newProduct("meat", "PngYbaInyQBTuTsjejoF", web3.utils.toWei('1.253', 'ether'), 289946067264, 22, 1);
    instance.newProduct("spaghetti", "PngYbaInyQBTuTsjejoF", web3.utils.toWei('0.849', 'ether'), 897668716446, 81, 2);
    instance.newProduct("milk", "PngYbaInyQBTuTsjejoF", web3.utils.toWei('2.959', 'ether'), 108749300921, 44, 2);
    instance.newProduct("eggs", "PngYbaInyQBTuTsjejoF", web3.utils.toWei('2.665', 'ether'), 506981507612, 84, 3);
    instance.newProduct("meatballs", "PngYbaInyQBTuTsjejoF", web3.utils.toWei('0.273', 'ether'), 768204336115, 90, 3);
    instance.newProduct("banana", "PngYbaInyQBTuTsjejoF", web3.utils.toWei('0.143', 'ether'), 675995240081, 35, 4);
    instance.newProduct("water", "PngYbaInyQBTuTsjejoF", web3.utils.toWei('0.819', 'ether'), 116112403201, 73, 4);
    instance.newProduct("clothes", "PngYbaInyQBTuTsjejoF", web3.utils.toWei('2.794', 'ether'), 621451227030, 9, 5);
    instance.newProduct("oil", "PngYbaInyQBTuTsjejoF", web3.utils.toWei('1.428', 'ether'), 338001778694, 65, 5);
    instance.newProduct("vodka", "PngYbaInyQBTuTsjejoF", web3.utils.toWei('1.555', 'ether'), 389814568549, 38, 6);

  })
};

// function getRandomInt(max) {
//   return Math.floor(Math.random() * Math.floor(max));
// }