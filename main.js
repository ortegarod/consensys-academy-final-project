var web3 = new Web3(Web3.givenProvider);
var contractInstance;

$(document).ready(function() {
    window.ethereum.enable().then(function(accounts){
        contractInstance = new web3.eth.Contract(abi, deployment_address, {from: accounts[0]});
        console.log(contractInstance);
        $("#contract-address").text(contractInstance.options.address);
        contractInstance.methods.getContractBalance().call()
        .then(function(result){
            console.log("contract has " + web3.utils.fromWei(result) + " ETH");
            $("#contract-balance").text(result + " ETH");
        })
        contractInstance.methods.arrayLength().call()
        .then(function(result) {
            console.log(result);
            length = result;
            for (i = 0; i < length; i++) {
                contractInstance.methods.storesArray(i).call()
                .then(function(result){
                    console.log(result);
                    console.log(result[0]);
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
                    console.log(e.target.id + " was clicked");
                    var a = document.getElementById("product-menu-id");
                    a.style.display = "block";
                    var b = document.getElementById("back-to-directory");
                    b.style.display = "block";
                    var c = document.getElementById("menu-id");
                    c.style.display = "none";
                    var d = document.getElementById("storefront-wrapper");
                    d.style.display = "block";
                    contractInstance.methods.storesMapping(e.target.id).call()
                        .then(function(result) {
                        $('#storefront-header').text(result[0]);
                    })
                    contractInstance.methods.getProductsMALength(e.target.id).call()
                    .then(function(result) {
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
            // e.target is our targetted element
            // try doing console.log(e.target.nodeName), it will result LI
            if(e.target && e.target.nodeName == "LI") {
                    console.log(e.target.id + " was clicked");
                    $('#product-detail-menu').empty();
                    var a = document.getElementById("product-detail-id");
                    a.style.display = "block";
                    var b = document.getElementById("buy-button");
                    b.style.display = "block";
                    // var c = document.getElementById("product-menu-id");
                    // c.style.display = "none";
                    // var d = document.getElementById("back-to-product-menu");
                    // d.style.display = "block";
                            contractInstance.methods.productsMapping(e.target.id).call()
                            .then(function(result) {
                                console.log(result);
                                $("#product-name-label").text(result[0]);
                                $("#product-description-label").text(result[1]);
                                var price = web3.utils.fromWei(result[2], 'ether');
                                $("#product-price-label").text(price);
                                var config = {
                                    value: web3.utils.toWei(price)
                                }
                                $("#product-SKU-label").text(result[3]);
                                $("#product-quantity-label").text(result[4]);
                                // var index = 0;
                                // for (i = 0; i < 11; i++) {
                                //     var input = result[i];
                                //     var list = document.getElementById("product-detail-menu");
                                //     var item = document.createElement("li");
                                //     item.id = index;
                                //     item.innerHTML = input;
                                //     index++;
                                //     list.appendChild(item);
                                // } 
                                $("#buy-button").click(buyItem)

                                function buyItem () {
                                    contractInstance.methods.buyItem(e.target.id).send(config)
                                    .on("receipt", function(receipt){ 
                                        console.log(receipt);
                                    }) 
                                }
                            })

            }
        });
    })

    $("#addStore").click(addStore)
    $("#add-product").click(addProduct)
    $("#back-to-directory").click(refresh)
    $("#back-to-product-menu").click(back)


})

// function addStore () {
//     var name = $("#storeName").val();
//     contractInstance.once('StoreCreated', {}, (function(error, event){
//         console.log(event.returnValues['newStoreName']);
//         $("#menu").append(event.returnValues['newStoreName']);
//         $("#new_store").add(event.returnValues['newStoreName']);
//     }))
//     contractInstance.methods.newStore(name).send()
//     .on("receipt", function(receipt){ 
//         console.log(receipt);
//         location.reload();
//     }) 
//     .then(function(result){
//         console.log(result);
//     }) 
// }

// function addProduct () {
//     var name = $("#product-name").val();
//     var description = $("#product-description").val();
//     var price = $("#product-price").val();
//     var quantity = $("#product-quantity").val();
//     var SKU = $("#product-SKU").val();
//     var storeID = $("#product-storeID").val();
//     contractInstance.once('ProductCreated', {}, (function(error, event){
//         console.log(event);
//         console.log(event.returnValues['newProductName']);
//     }))
//     contractInstance.methods.newProduct(name, description, web3.utils.toWei(price), SKU, quantity, storeID).send()
//     .on("receipt", function(receipt){ 
//         console.log(receipt);
//     }) 
// }


function refresh () {
    location.reload();
}

function back () {
    // var a = document.getElementById("product-detail-id");
    // a.style.display = "block";
    var b = document.getElementById("product-detail-id");
    b.style.display = "none";
    var c = document.getElementById("product-menu-id");
    c.style.display = "block";
    var d = document.getElementById("back-to-product-menu");
    d.style.display = "none";
    $('#product-detail-menu').empty();
}
