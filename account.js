var web3 = new Web3(Web3.givenProvider);
var contractInstance;

$(document).ready(function() {
    window.ethereum.enable().then(function(accounts){
        contractInstance = new web3.eth.Contract(abi, deployment_address, {from: accounts[0]});
        console.log(contractInstance);
        var account = web3.currentProvider.selectedAddress
        $("#ether_wallet").text(account);
        contractInstance.methods.getStoresMALength().call()
        .then(function(result) {
            console.log(result);
            length = result;
            for (i = 0; i < length; i++) {
                contractInstance.methods.stores(accounts[0],i).call()
                .then(function(result){
                    console.log(result);
                    console.log(result[2]);
                    var input = result[0];
                    var list = document.getElementById("store-menu");
                    var item = document.createElement("li");
                    item.id = result[2];
                    item.innerHTML = input;
                    list.appendChild(item);
                })
            } 
        })

        document.getElementById("store-menu").addEventListener("click",function(e) {
            // e.target is our targetted element
            // try doing console.log(e.target.nodeName), it will result LI
            if(e.target && e.target.nodeName == "LI") {
                    console.log(e.target.id + " was clicked");
                    $('#my-products-menu').empty();
                    var a = document.getElementById("my-products-menu-id");
                    a.style.display = "block";
                    var b = document.getElementById("add-product-form");
                    b.style.display = "block";
                    var c = document.getElementById("my-products-detail-menu-id");
                    c.style.display = "none";
                    $("#add-product").click(addProduct)
                    contractInstance.methods.storesMapping(e.target.id).call()
                    .then(function(result){
                    $("#store-name").text(result[0])
                    })
                    contractInstance.methods.getProductsMALength(e.target.id).call()
                    .then(function(result) {
                        length = result;
                        for (i = 0; i < length; i++) {
                            contractInstance.methods.products(e.target.id,i).call()
                            .then(function(result){
                                console.log(result);
                                console.log(result[5]);
                                var input = result[0];
                                var list = document.getElementById("my-products-menu");
                                var item = document.createElement("li");
                                item.id = result[5];
                                item.innerHTML = input;
                                list.appendChild(item);
                            })
                        } 
                    })
            }
                                function addProduct () {
                                    var name = $("#product-name").val();
                                    var description = $("#product-description").val();
                                    var price = $("#product-price").val();
                                    var SKU = $("#product-SKU").val();
                                    var quantity = $("#product-quantity").val();
                                    var storeID = e.target.id;
                                    contractInstance.once('ProductCreated', {}, (function(error, event){
                                        console.log(event);
                                    }))
                                    contractInstance.methods.newProduct(name, description, price, SKU, quantity, storeID).send()
                                    .on("receipt", function(receipt){ 
                                        console.log(receipt);
                                        $('#my-products-menu').empty();
                                        contractInstance.methods.getProductsMALength(e.target.id).call()
                                        .then(function(result) {
                                            length = result;
                                            for (i = 0; i < length; i++) {
                                                contractInstance.methods.products(e.target.id,i).call()
                                                .then(function(result){
                                                    console.log(result);
                                                    console.log(result[5]);
                                                    var input = result[0];
                                                    var list = document.getElementById("my-products-menu");
                                                    var item = document.createElement("li");
                                                    item.id = result[5];
                                                    item.innerHTML = input;
                                                    list.appendChild(item);
                                                })
                                            } 
                                        })
                                    }) 
                                }
        });

        document.getElementById("my-products-menu").addEventListener("click",function(e) {
            // e.target is our targetted element
            // try doing console.log(e.target.nodeName), it will result LI
            if(e.target && e.target.nodeName == "LI") {
                    console.log(e.target.id + " was clicked");
                    $('#my-products-detail-menu').empty();
                    var a = document.getElementById("my-products-detail-menu-id");
                    a.style.display = "block";
                    var b = document.getElementById("edit-product-button");
                    b.style.display = "block";
                    var c = document.getElementById("add-product-form");
                    c.style.display = "none";
                    $("#edit-product-button").click(editItem)
                            contractInstance.methods.productsMapping(e.target.id).call()
                            .then(function(result) {
                                console.log(result);
                                $("#product-name-label").text(result[0]);
                                $("#product-description-label").text(result[1]);
                                $("#product-price-label").text(result[2]);
                                $("#product-SKU-label").text(result[3]);
                                $("#product-quantity-label").text(result[4]);
                                // var index = 0;
                                // for (i = 0; i < 11; i++) {
                                //     var input = result[i];
                                //     var list = document.getElementById("my-products-detail-menu");
                                //     var item = document.createElement("li");
                                //     item.id = index;
                                //     item.innerHTML = input;
                                //     index++;
                                //     list.appendChild(item);
                                // } 
                            })
            }
                                    function editItem () {
                                        location.reload();
                                    }
        });

    })

    $("#addStore").click(addStore)

})

function addStore () {
    var name = $("#storeName").val();
    contractInstance.once('StoreCreated', {}, (function(error, event){
        console.log(event.returnValues['newStoreName']);
        $("#menu").append(event.returnValues['newStoreName']);
        $("#new_store").add(event.returnValues['newStoreName']);
    }))
    contractInstance.methods.newStore(name).send()
    .on("receipt", function(receipt){ 
        console.log(receipt);
        location.reload();
    }) 
    .then(function(result){
        console.log(result);
    }) 
}

function refresh () {
    location.reload();
}
