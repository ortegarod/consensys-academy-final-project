var web3 = new Web3(Web3.givenProvider);
var contractInstance;
var config;
var target;

$(document).ready(function() {
    window.ethereum.enable().then(function(accounts){
        window.ethereum.on('accountsChanged', function (accounts) {
            window.location.reload();
          })
        contractInstance = new web3.eth.Contract(abi, deployment_address, {from: accounts[0]});
        console.log(contractInstance);
        web3.eth.getBalance(accounts[0]).then(function(result){
            console.log(result);

            $("#connected-account-ether-balance").text(web3.utils.fromWei(result) + " ETH");
        })
        contractInstance.methods.getArrayLength().call()
        .then(function(result) {
            console.log(result);

            length = result;
            for (i = 0; i < length; i++) {
                contractInstance.methods.storesArray(i).call()
                .then(function(result){
                    console.log(result);

                    var input = result[0];
                    var list = document.getElementById("menu");
                    var item = document.createElement("li");
                    item.id = result[2];
                    item.innerHTML = input;
                    list.appendChild(item);
                })
            } 
        })

        document.getElementById("menu").addEventListener("click",function(e) {
            // e.target is our targetted element
            // try doing console.log(e.target.nodeName), it will result LI
            if(e.target && e.target.nodeName == "LI") {
                    var a = document.getElementById("product-menu-id");
                    a.style.display = "block";
                    var b = document.getElementById("back-to-directory");
                    b.style.display = "block";
                    $("#back-to-directory").click(refresh)

                    var c = document.getElementById("menu-id");
                    c.style.display = "none";
                    var d = document.getElementById("storefront-wrapper");
                    d.style.display = "block";
                    contractInstance.methods.storesMapping(e.target.id).call()
                        .then(function(result) {
                        console.log(result);

                        $('#storefront-header').text(result[0]);
                        $('#storefront-description').html(result[3]);
                        $('#storefront-website').text(result[4]);
                        $('#storefront-email').text(result[5]);
                        $('#seller-address').text(result[1]);

                    })
                    contractInstance.methods.getProductsMALength(e.target.id).call()
                    .then(function(result) {
                        console.log(result);

                        length = result;
                        for (i = 0; i < length; i++) {
                            contractInstance.methods.products(e.target.id,i).call()
                            .then(function(result) {
                                console.log(result);

                                var index = 0;
                                var input = result[0];
                                var list = document.getElementById("product-menu");
                                var item = document.createElement("li");
                                item.id = result[5];
                                item.innerHTML = input;
                                list.appendChild(item);
                            })
                        }
                    })
            }
        });

        document.getElementById("product-menu").addEventListener("click",function(e) {
            target = e.target.id;
            // e.target is our targetted element
            // try doing console.log(e.target.nodeName), it will result LI
            if(e.target && e.target.nodeName == "LI") {
                    $('#product-detail-menu').empty();
                    var a = document.getElementById("product-detail-id");
                    a.style.display = "block";
                    var b = document.getElementById("buy-button");
                    b.style.display = "none";
                    var c = document.getElementById("out-of-stock");
                    c.style.display = "none";
                            contractInstance.methods.productsMapping(e.target.id).call()
                            .then(function(result) {
                                console.log(result);

                                if (result[4] == 0) {
                                    c.style.display = "block";
                                    b.style.display = "none";
                                } else if (result[4] > 0) {
                                    b.style.display = "block";
                                    c.style.display = "none";
                                }
                                $("#product-name-label").text(result[0]);
                                $("#product-description-label").text(result[1]);
                                var price = web3.utils.fromWei(result[2], 'ether');
                                $("#product-price-label").text(price);
                                config = { value: web3.utils.toWei(price) }
                                $("#product-quantity-label").text(result[4]);

                                contractInstance.methods.getEmail(accounts[0]).call()
                                .then(function(result) {
                                    console.log(result);

                                    if(result[0] == "") {
                                        var b = document.getElementById("buy-button");
                                        b.style.display = "none";
                                        var b = document.getElementById("email-not-registered");
                                        b.style.display = "block";
                                    } else {
                                        var b = document.getElementById("buy-button");
                                        b.style.display = "block";
                                        var b = document.getElementById("email-not-registered");
                                        b.style.display = "none";
                                    }
                                })
                            })
            }
        });

        $("#buy-button").click(buyItem)

        function buyItem () {
            contractInstance.methods.buyItem(target).send(config)
            .on("receipt", function(receipt){ 
                console.log(receipt);
                var d = document.getElementById("buy-confirmation");
                d.style.display = "block";
                contractInstance.methods.productsMapping(target).call()
                .then(function(result) {
                    console.log(result);

                    $("#product-quantity-label").text(result[4]);
                })
            }) 
            .on("transactionHash", function(hash){
                $("#tx-confirmation").text(hash);
            })
        }
    })

    $("#back-to-product-menu").click(back)

})

function refresh () {
    location.reload();
}

function back () {
    var b = document.getElementById("product-detail-id");
    b.style.display = "none";
    var c = document.getElementById("product-menu-id");
    c.style.display = "block";
    var d = document.getElementById("back-to-product-menu");
    d.style.display = "none";
    $('#product-detail-menu').empty();
}

