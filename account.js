var web3 = new Web3(Web3.givenProvider);
var contractInstance;
var len;

$(document).ready(function() {

    window.ethereum.enable().then(function(accounts){
        window.ethereum.on('accountsChanged', function (accounts) {
                window.location.reload();
        })
        contractInstance = new web3.eth.Contract(abi, deployment_address, {from: accounts[0]});
        
        console.log(contractInstance);
        $("#contract-address").text(contractInstance.options.address);
        contractInstance.methods.getContractBalance().call()
        .then(function(result){
            $("#contract-balance").text(result + " ETH");
        })
        var account = web3.currentProvider.selectedAddress
        $("#ether_wallet").text(account);
        contractInstance.methods.getStoresMALength().call()
        .then(function(result) {
            length = result;
            for (i = 0; i < length; i++) {
                contractInstance.methods.stores(accounts[0],i).call()
                .then(function(result){
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
                                    contractInstance.methods.newProduct(name, description, web3.utils.toWei(price), SKU, quantity, storeID).send()
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
                                $("#product-price-label").text(web3.utils.fromWei(result[2], 'ether'));
                                $("#product-SKU-label").text(result[3]);
                                $("#product-quantity-label").text(result[4]);
                            })
            }
                                    function editItem () {
                                        location.reload();
                                    }
        });

                    contractInstance.getPastEvents('ProductSold', {filter: {seller: [accounts[0]]}, fromBlock: 0, toBlock: 'latest'}, function (error, events) {
                        len = events.length;
                        console.log(len);

                        for (i = 0; i < events.length; i++) {

                            var a = document.getElementById("new-orders");
                            var g = document.createElement("div");
                            g.id = "tracking-input";
                            var h = document.createElement("div");
                            h.id = "ship-button";
                            var b = document.createElement("BUTTON");
                            b.id = events[i].returnValues[0];
                            b.value = events[i].returnValues[0];
                            b.innerHTML = "SHIP";
                            var c = document.createElement("span");
                            var d = document.createElement("LABEL");
                            var e = document.createElement("br");
                            var f = document.createElement("input");
                            d.innerHTML="Product ID: ";
                            c.innerHTML= events[i].returnValues[0];

                            a.appendChild(d);                            
                            a.appendChild(c);  
                            a.appendChild(h);
                            h.appendChild(b);  
                            a.appendChild(g);
                            g.appendChild(f);
                            a.appendChild(e);

                        }
                        $(document).on('click', '#new-orders', function(){ 
                            var a = $(this).attr("id");
                            console.log(a);
                         });

                    })

                    // contractInstance.methods.productsMapping(purchased_item_id).call()
                    // .then(function(result) {

                    // })

                    contractInstance.getPastEvents('ProductSold', {filter: {buyer: [accounts[0]]}, fromBlock: 0, toBlock: 'latest'}, function (error, events) {
                        var table = document.getElementById("order-history");
                            
                            for (i = 0; i < events.length; i++) {
                            var purchased_item_id = events[i].returnValues[0];
                            var hash = events[i].transactionHash;

                            // web3.eth.getBlock(events[i].blockNumber, function(error, block) {

                            //     console.log(new Date(block.timestamp*1000).toUTCString());

                            //     var date_label = document.createElement("LABEL");
                            //     date_label.setAttribute("for", "date");
                            //     date_label.innerHTML = "Order Date: ";
                            //     table.appendChild(date_label);

                            //     var date_span = document.createElement("span");
                            //     date_span.id = "date";
                            //     date_span.innerHTML = new Date(block.timestamp*1000).toUTCString();
                            //     table.appendChild(date_span);
                            //     table.appendChild(document.createElement("br"));
                                
                            // });
                            var tx_hash_label = document.createElement("LABEL");
                            tx_hash_label.setAttribute("for", "tx_hash");
                            tx_hash_label.innerHTML = "TX Hash: ";
                            table.appendChild(tx_hash_label);
                            var tx_hash_span = document.createElement("span");
                            tx_hash_span.id = "tx_hash";
                            tx_hash_span.innerHTML = hash;
                            table.appendChild(tx_hash_span);
                            table.appendChild(document.createElement("br"));

                            var xyz;

                            contractInstance.methods.productsMapping(purchased_item_id).call()
                            .then(function(result) {

                                xyz = result.name;


                                var name_label = document.createElement("LABEL");
                                name_label.setAttribute("for", "name");
                                name_label.innerHTML = "Product Name: ";
                                table.appendChild(name_label);
                                var name_span = document.createElement("span");
                                name_span.id = "name";
                                name_span.innerHTML = result.name;
                                table.appendChild(name_span);
                                table.appendChild(document.createElement("br"));

                                var shipped_label = document.createElement("LABEL");
                                shipped_label.setAttribute("for", "shipped");
                                shipped_label.innerHTML = "Shipped: ";
                                table.appendChild(shipped_label);
                                var shipped_span = document.createElement("span");
                                shipped_span.id = "shipped";
                                shipped_span.innerHTML = result.shipped;
                                table.appendChild(shipped_span);
                                table.appendChild(document.createElement("br"));

                                var tracking_label = document.createElement("LABEL");
                                tracking_label.setAttribute("for", "tracking");
                                tracking_label.innerHTML = "Tracking #: ";
                                table.appendChild(tracking_label);
                                var tracking_span = document.createElement("span");
                                tracking_span.id = "tracking";
                                tracking_span.innerHTML = result.trackingNumber;
                                table.appendChild(tracking_span);
                                table.appendChild(document.createElement("br"));
                                


                            })





                        }
                            
                    })
    })

    $("#addStore").click(addStore)

})

function addStore () {
    var name = $("#storeName").val();
    var description = $("#store-description").val();
    var website = $("#store-website").val();
    var email = $("#store-email").val();

    contractInstance.once('StoreCreated', {}, (function(error, event){
        console.log(event.returnValues['newStoreName']);
        $("#menu").append(event.returnValues['newStoreName']);
        $("#new_store").add(event.returnValues['newStoreName']);
    }))
    contractInstance.methods.newStore(name, description, website, email).send()
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
