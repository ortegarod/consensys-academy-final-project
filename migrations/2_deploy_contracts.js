const OnlineMarketplace = artifacts.require("OnlineMarketplace");

module.exports = function (deployer, network, accounts) {
  deployer.deploy(OnlineMarketplace)
  .then(function(instance) {
    instance.newStore("Bob's Essentials", "All the essentials shipped straight to your door! Warehouse located in Phoenix, AZ.", "http://www.bobs.com", "bobs@email.com", {from: accounts[0], value: web3.utils.toWei('0.005', 'ether')});
    instance.newStore("Shirts 4 Less", "Discount shirts (and shorts). $5 or less!", "n/a", "shirts4less@gmail.com", {from: accounts[0], value: web3.utils.toWei('0.005', 'ether')});
    instance.newStore("Cosmetics Depot", "A bunch of cosmetics.", "http://www.cosmetics.com", "cosmeticsdepot@gmail.com", {from: accounts[0], value: web3.utils.toWei('0.005', 'ether')});
    instance.newStore("Banana Republic", "Not the REAL Banana Republic. We sell jeans and stuff.", "http://www.br.com", "br@email.com", {from: accounts[0], value: web3.utils.toWei('0.005', 'ether')});
    instance.newStore("Wall-to-Wall Mart", "Spend Ether. Go Broke.", "http://www.wall-to-wallmart.com", "wall-to-wallmart@gmail.com", {from: accounts[0], value: web3.utils.toWei('0.005', 'ether')});
    instance.newStore("Jane's Pawn Shop", "Bunch of junk. No refunds.", "n/a", "janespawn@gmail.com", {from: accounts[0], value: web3.utils.toWei('0.005', 'ether')});
    instance.newProduct("Orange Juice", "17 oz. jug of pure-squeezed orange juice from Arizona.", web3.utils.toWei('1.110', 'ether'), 439491559042, 48, 1);
    instance.newProduct("Eggs", "Carton of eggs - 1 dozen from free-roaming chickens in Arizona.", web3.utils.toWei('1.253', 'ether'), 289946067264, 22, 1);
    instance.newProduct("Red T-Shirt", "A red t-shirt. Size M.", web3.utils.toWei('0.0090', 'ether'), 897668716446, 4, 2);
    instance.newProduct("Denim Shorts", 'Denim shorts. Size 34" x 32"', web3.utils.toWei('0.0050', 'ether'), 108749300921, 2, 2);
    instance.newProduct("Eyeshadow", "Regular eyeshadow. 12 colors. Brush not included.", web3.utils.toWei('0.177', 'ether'), 506981507612, 84, 3);
    instance.newProduct("Face Foundation", "Available in only one color at the moment - Porcelain.", web3.utils.toWei('0.273', 'ether'), 768204336115, 90, 3);
    instance.newProduct("Vintage Women's Denim Jeans", "One size fits all.", web3.utils.toWei('0.043', 'ether'), 675995240081, 2, 4);
    instance.newProduct("Regular Men's Denim Jeans", "One size fits all.", web3.utils.toWei('0.043', 'ether'), 116112403201, 2, 4);
    instance.newProduct("Mop", "A regular mop. Comes with one disposable mophead.", web3.utils.toWei('0.094', 'ether'), 621451227030, 9, 5);
    instance.newProduct("Vegetable Oil", "100 oz. economy vegatable cooking oil.", web3.utils.toWei('0.028', 'ether'), 338001778694, 65, 5);
    instance.newProduct("Flamethrower", "Elon Musk's flamethrower. Used (fair condition). Sold as-is. Email for pictures.", web3.utils.toWei('1.555', 'ether'), 389814568549, 38, 6);

  })
};