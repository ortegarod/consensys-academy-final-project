var web3 = new Web3(Web3.givenProvider);
var contractInstance;

$(document).ready(function() {
    window.ethereum.enable().then(function(accounts){
        contractInstance = new web3.eth.Contract(abi, "0x614e16fbE919a6f6E48c6F0e609F87cdd06bba8A", {from: accounts[0]});
        console.log(contractInstance);
        var account = web3.currentProvider.selectedAddress
        $("#ether_wallet").text(account);
        contractInstance.methods.arrayLength().call()
        .then(function(result) {
            console.log(result);
            length = result;
            for (i = 0; i < length; i++) {
                var index = 1;
                contractInstance.methods.storesArray(i).call()
                .then(function(result){
                    console.log(result);
                    console.log(result[0]);
                    var input = result[0];
                    var list = document.getElementById("menu");
                    var item = document.createElement("li");
                    item.id = index;
                    item.innerHTML = input;
                    index++;
                    list.appendChild(item);
                })
            } 
        })

        document.getElementById("menu").addEventListener("click",function(e) {
            // e.target is our targetted element
            // try doing console.log(e.target.nodeName), it will result LI

            ++test;
            if(e.target && e.target.nodeName == "LI") {
                // if (e.target.id == 0) {
                    console.log(e.target.id + " was clicked");
                    var a = document.getElementById("product-menu-id");
                    a.style.display = "block";
                    var b = document.getElementById("back-to-directory");
                    b.style.display = "block";
                    var c = document.getElementById("menu-id");
                    c.style.display = "none";
                            contractInstance.methods.products(e.target.id,0).call()
                            .then(function(result) {
                                console.log(result);
                                var index = 0;
                                var input = result[0];
                                var list = document.getElementById("product-menu");
                                var item = document.createElement("li");
                                item.id = index;
                                item.innerHTML = input;
                                index++;
                                list.appendChild(item);
                                // length = result;
                                // for (i = 0; i < 2; i++) {
                                //     contractInstance.methods.storesArray(i).call()
                                //     .then(function(result){
                                //         console.log(result);
                                //         console.log(result[0]);

                                //     })
                                // } 
                            })
                // }
            }
        });

        document.getElementById("product-menu").addEventListener("click",function(e) {
            // e.target is our targetted element
            // try doing console.log(e.target.nodeName), it will result LI
            if(e.target && e.target.nodeName == "LI") {
                // if (e.target.id == 0) {
                    console.log(e.target.id + " was clicked");
                    var a = document.getElementById("product-detail-id");
                    a.style.display = "block";
                    var b = document.getElementById("buy-button");
                    b.style.display = "block";
                    var c = document.getElementById("product-menu-id");
                    c.style.display = "none";
                    var d = document.getElementById("back-to-product-menu");
                    d.style.display = "block";
                    $("#buy-button").click(buyItem)

                    // var c = document.getElementById("menu");
                    // c.style.display = "none";
                    console.log(test);

                            contractInstance.methods.products(1,0).call()
                            .then(function(result) {
                                console.log(result);
                                var index = 0;
                                for (i = 0; i < 10; i++) {
                                    var input = result[i];
                                    var list = document.getElementById("product-detail-menu");
                                    var item = document.createElement("li");
                                    item.id = index;
                                    item.innerHTML = input;
                                    index++;
                                    list.appendChild(item);
                                } 

 
                                // length = result;
                                //     contractInstance.methods.storesArray(i).call()
                                //     .then(function(result){
                                //         console.log(result);
                                //         console.log(result[0]);

                                //     })
                            })
                // }
            }
        });

    })

    $("#addStore").click(addStore)
    $("#add-product").click(addProduct)

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

function addProduct () {
    var name = $("#product-name").val();
    var price = $("#product-price").val();
    var quantity = $("#product-quantity").val();
    var SKU = $("#product-SKU").val();
    var storeID = $("#product-storeID").val();
    contractInstance.once('ProductCreated', {}, (function(error, event){
        console.log(event);
        console.log(event.returnValues['newProductName']);
    }))
    contractInstance.methods.newProduct(name, price, SKU, quantity, storeID).send()
    .on("receipt", function(receipt){ 
        console.log(receipt);
    }) 
}

function refresh () {
    location.reload();
}
