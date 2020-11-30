var web3 = new Web3(Web3.givenProvider);
var contractInstance;
var len;
var store_index;
var store_id;
var product_index;
var product_id;


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
        var account = web3.currentProvider.selectedAddress
        $("#ether_wallet").text(account);
        contractInstance.methods.getEmail(accounts[0]).call()
        .then(function (result) {
            console.log(result);
            if (result[0] != "") {
                $("#email-address").text(result[0]);
                var a = document.getElementById("sign-up");
                a.style.display = "none";
            } else {
                $("#register-email-button").click(register);
                $("#email-address").text("n/a");
                function register() {
                    if(!document.forms['register-email-form'].terms.checked) {
                        alert("Please check the box indicating that you accept the Terms and Conditions");
                        document.forms['register-email-form'].terms.focus();
                        return false;
                      }
                    var email = $("#email-input").val();
                    contractInstance.methods.register(email).send()
                    .on("receipt", function(receipt){ 
                        console.log(receipt);
                        location.reload();
                        $("#email-address").text(result[0]);
                    }) 
                }
            }

        })

        contractInstance.methods.getStoresMALength().call()
        .then(function(result) {
            console.log(result);
            length = result;
            for (i = 0; i < length; i++) {
                contractInstance.methods.stores(accounts[0],i).call()
                .then(function(result){
                    console.log(result);
                    var input = result[0];
                    var list = document.getElementById("store-menu");
                    var item = document.createElement("li");
                    item.id = result[2];
                    item.innerHTML = input;
                    list.appendChild(item);
                })
            } 
        })
        var storeID_addproduct;

        document.getElementById("store-menu").addEventListener("click",function(e) {
            // e.target is our targetted element
            // try doing console.log(e.target.nodeName), it will result LI
            if(e.target && e.target.nodeName == "LI") {
                    store_index = e.target.id;
                    store_id = e.target.value;
                    storeID_addproduct = e.target.id;
                    $('#my-products-menu').empty();
                    document.getElementById("edit-store-form").style.display="none";
                    var y = document.getElementById("edit-store-button-name");
                    y.innerHTML = "EDIT STORE ►";
                    document.getElementById("edit-store-button").style.display = "block";
                    var a = document.getElementById("my-products-menu-id");
                    a.style.display = "block";
                    // var b = document.getElementById("add-product-form");
                    // b.style.display = "block";
                    var c = document.getElementById("my-products-detail-menu-id");
                    c.style.display = "none";
                    contractInstance.methods.storesMapping(e.target.id).call()
                    .then(function(result){
                    console.log(result);
                    $("#store-name").text(result[0])
                    $("#store-selection").text(result[0]);
                    $("#hidden-store-name").text(result[0]);
                    $("#hidden-store-description").text(result[3]);
                    $("#hidden-store-website").text(result[4]);
                    $("#hidden-store-email").text(result[5]);

                    })
                    contractInstance.methods.getProductsMALength(e.target.id).call()
                    .then(function(result) {
                        console.log(result);
                        length = result;
                        for (i = 0; i < length; i++) {
                            contractInstance.methods.products(e.target.id,i).call()
                            .then(function(result){
                                console.log(result);

                                var input = result[0];
                                var list = document.getElementById("my-products-menu");
                                var item = document.createElement("li");
                                item.id = result[5];
                                item.name = 1;
                                item.innerHTML = input;
                                list.appendChild(item);
                            })
                        } 
                    })
            }

        });
        $("#add-product").click(addProduct)

        function addProduct () {
            var name = $("#product-name").val();
            var description = $("#product-description").val();
            var price = $("#product-price").val();
            var SKU = $("#product-SKU").val();
            var quantity = $("#product-quantity").val();
            contractInstance.once('ProductCreated', {}, (function(error, event){
                console.log(event);
            }))
            var config = {
                value: web3.utils.toWei(".001")
            }
            contractInstance.methods.newProduct(name, description, web3.utils.toWei(price), SKU, quantity, storeID_addproduct).send(config)
            .on("receipt", function(receipt){ 
                console.log(receipt);
                $('#my-products-menu').empty();
                $("#product-name").val("");
                $("#product-description").val("");
                $("#product-price").val("");
                $("#product-SKU").val("");
                $("#product-quantity").val("");
                contractInstance.methods.getProductsMALength(storeID_addproduct).call()
                .then(function(result) {
                    console.log(result);

                    length = result;
                    for (i = 0; i < length; i++) {
                        contractInstance.methods.products(storeID_addproduct,i).call()
                        .then(function(result){
                            console.log(result);

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

        document.getElementById("my-products-menu").addEventListener("click",function(e) {
            // e.target is our targetted element
            // try doing console.log(e.target.nodeName), it will result LI
            if(e.target && e.target.nodeName == "LI") {
                    product_id = e.target.id;
                    product_index = e.target.value;
                    document.getElementById("edit-product-form").style.display="none";
                    $('#my-products-detail-menu').empty();
                    var a = document.getElementById("my-products-detail-menu-id");
                    a.style.display = "block";
                    var b = document.getElementById("edit-product-button");
                    b.style.display = "block";
                    // var c = document.getElementById("add-product-form");
                    // c.style.display = "none";

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




        });

        $("#show-add-store-form").click(openAddStoreForm)
        $("#show-add-product").click(openAddProductForm)
        $("#update-product-button").click(editItem)
        $("#update-store-button").click(editStore)
        $("#edit-product-button").click(openEdit)
        $("#edit-store-button").click(openEditStore)


        function openAddStoreForm () {
            var x = document.getElementById("add-store-form");
            var y = document.getElementById("show-add-store-form");
           
            if (x.style.display === "none") {
                x.style.display = "block";
                y.innerHTML = "ADD STORE ▼";
              } else {
                x.style.display = "none";
                y.innerHTML = "ADD STORE ►";
              }
         }

        function openAddProductForm () {
            var x = document.getElementById("add-product-form");
            var y = document.getElementById("show-add-product");
           
            if (x.style.display === "none") {
                x.style.display = "block";
                y.innerHTML = "ADD PRODUCT ▼";
              } else {
                x.style.display = "none";
                y.innerHTML = "ADD PRODUCT ►";
              }
         }

        function openEdit () {
            var x = document.getElementById("edit-product-form");
            var y = document.getElementById("edit-product-button-name");
           
            if (x.style.display === "none") {
                x.style.display = "block";
                y.innerHTML = "EDIT PRODUCT ▼";
                document.getElementById("uproduct-name-label").value = document.getElementById("product-name-label").innerHTML;
                document.getElementById("uproduct-description-label").value = document.getElementById("product-description-label").innerHTML;
                document.getElementById("uproduct-price-label").value = document.getElementById("product-price-label").innerHTML;
                document.getElementById("uproduct-SKU-label").value = document.getElementById("product-SKU-label").innerHTML;
                document.getElementById("uproduct-quantity-label").value = document.getElementById("product-quantity-label").innerHTML;

              } else {
                x.style.display = "none";
                y.innerHTML = "EDIT PRODUCT ►";
              }
         }

         function openEditStore () {
            var x = document.getElementById("edit-store-form");
            var y = document.getElementById("edit-store-button-name");
           
            if (x.style.display === "none") {
                x.style.display = "block";
                y.innerHTML = "EDIT STORE ▼";
                document.getElementById("ustore-name-label").value = document.getElementById("hidden-store-name").innerHTML;
                document.getElementById("ustore-description-label").value = document.getElementById("hidden-store-description").innerHTML;
                document.getElementById("ustore-website-label").value = document.getElementById("hidden-store-website").innerHTML;
                document.getElementById("ustore-email-label").value = document.getElementById("hidden-store-email").innerHTML;

              } else {
                x.style.display = "none";
                y.innerHTML = "EDIT STORE ►";
              }
         }

        function editItem() {
            contractInstance.methods.editProduct(product_index, document.getElementById("uproduct-name-label").value, document.getElementById("uproduct-description-label").value, web3.utils.toWei(document.getElementById("uproduct-price-label").value), document.getElementById("uproduct-SKU-label").value, document.getElementById("uproduct-quantity-label").value, store_index, product_id).send()
            .on("receipt", function() {
                contractInstance.methods.productsMapping(product_id).call()
                .then(function(result) {
                    console.log(result);

                    $("#product-name-label").text(result[0]);
                    $("#product-description-label").text(result[1]);
                    $("#product-price-label").text(web3.utils.fromWei(result[2], 'ether'));
                    $("#product-SKU-label").text(result[3]);
                    $("#product-quantity-label").text(result[4]);
                })
            })
        }

        function editStore() {
            contractInstance.methods.editStore(store_id, store_index, document.getElementById("ustore-name-label").value, document.getElementById("ustore-description-label").value, document.getElementById("ustore-website-label").value, document.getElementById("ustore-email-label").value).send()
            // .on("receipt", function() {
            //     contractInstance.methods.storesMapping(store_index).call()
            //     .then(function(result) {
            //         console.log(result);
            //         $("#ustore-name-label").text(result[0]);
            //         $("#ustore-description-label").text(result[3]);
            //         $("#ustore-website-label").text(result[4]);
            //         $("#ustore-email-label").text(result[5]);
            //     })
            // })
        }
                    contractInstance.getPastEvents('ProductSold', {filter: {seller: [accounts[0]]}, fromBlock: 0, toBlock: 'latest'}, function (error, events) {
                        for (i = 0; i < events.length; i++) {
                            var a = document.getElementById("new-orders");
                            var h = document.createElement("div");
                            h.className = "order" + events[i].returnValues[0];
                            var b = document.createElement("BUTTON");
                            b.id = events[i].returnValues[1];
                            b.value = events[i].returnValues[0];
                            b.className = "ship-button";
                            b.innerHTML = "UPDATE TRACKING";
                            var c = document.createElement("span");
                            c.innerHTML= events[i].returnValues[0];
                            var d = document.createElement("LABEL");
                            d.innerHTML="Order ID: ";
                            var e = document.createElement("p");
                            var e2 = document.createElement("br");
                            var f = document.createElement("input");
                            f.id = "tracking-input" + events[i].returnValues[0];
                            f.name = events[i].returnValues[0];

                            var c2 = document.createElement("span");
                            c2.id = "nopname" + events[i].returnValues[0];
                            var d2 = document.createElement("LABEL");
                            d2.innerHTML="Product Name: ";
                            var e3 = document.createElement("br");
                            
                            var c3 = document.createElement("span");
                            c3.id= "nopSKU" + events[i].returnValues[0];
                            var d3 = document.createElement("LABEL");
                            d3.innerHTML="SKU: ";
                            var e4 = document.createElement("br");

                            var c4 = document.createElement("span");
                            c4.innerHTML= events[i].returnValues[2];
                            var d4 = document.createElement("LABEL");
                            d4.innerHTML="Buyer Address: ";
                            var e5 = document.createElement("br");

                            var c5 = document.createElement("span");
                            c5.id= "nopshipped" + events[i].returnValues[0];
                            var d5 = document.createElement("LABEL");
                            d5.innerHTML="Shipped: ";
                            var e6 = document.createElement("br");

                            var c6 = document.createElement("span");
                            c6.id= "noptracking" + events[i].returnValues[0];
                            var d6 = document.createElement("LABEL");
                            d6.innerHTML="Tracking Number: ";
                            var e7 = document.createElement("br");

                            var c7 = document.createElement("span");
                            c7.innerHTML= events[i].returnValues[5];
                            var d7 = document.createElement("LABEL");
                            d7.innerHTML= "Buyer Email: ";
                            var e8 = document.createElement("br");

                            var c8 = document.createElement("span");
                            c8.innerHTML= events[i].transactionHash;
                            var d8 = document.createElement("LABEL");
                            d8.innerHTML="TX Hash: ";
                            var e9 = document.createElement("br");
                            
                            a.appendChild(h);
 
                            h.appendChild(d);      
                            h.appendChild(c); 
                            h.appendChild(e9); 
                            h.appendChild(d8);  
                            h.appendChild(c8);
                            h.appendChild(e3); 
                            
                            h.appendChild(d2);  
                            h.appendChild(c2); 

                            h.appendChild(e4); 
                            h.appendChild(d3);  
                            h.appendChild(c3); 

                            h.appendChild(e5); 
                            h.appendChild(d4);  
                            h.appendChild(c4); 

                            h.appendChild(e8); 
                            h.appendChild(d7);  
                            h.appendChild(c7); 

                            h.appendChild(e6); 
                            h.appendChild(d5);  
                            h.appendChild(c5); 

                            h.appendChild(e7); 
                            h.appendChild(d6);  
                            h.appendChild(c6); 

                            h.appendChild(e2); 
                            h.appendChild(b);  
                            h.appendChild(f);
                            h.appendChild(e);

                            contractInstance.methods.orders(events[i].returnValues[0], events[i].returnValues[1]).call()
                            .then(function(result) {
                                console.log(result);

                                var b = document.getElementById("nodata");

                                var a = document.createElement("span");
                                a.id = "pname" + result.orderID; 
                                a.innerHTML = result.name;
                                b.appendChild(a);

                                var c = document.createElement("span");
                                c.id = "pSKU" + result.orderID; 
                                c.innerHTML = result.SKU;
                                b.appendChild(c);

                                var d = document.createElement("span");
                                d.id = "pshipped" + result.orderID; 
                                d.innerHTML = result.shipped;
                                b.appendChild(d);

                                var e = document.createElement("span");
                                e.id = "ptracking" + result.orderID; 
                                e.innerHTML = result.trackingNumber;
                                b.appendChild(e);

                                $("#pname" + result.orderID).clone().appendTo("#nopname" + result.orderID);
                                $("#pSKU" + result.orderID).clone().appendTo("#nopSKU" + result.orderID);
                                $("#pshipped" + result.orderID).clone().appendTo("#nopshipped" + result.orderID);
                                $("#ptracking" + result.orderID).clone().appendTo("#noptracking" + result.orderID);
                            })

                            // contractInstance.methods.getEmail(events[i].returnValues[2]).call()
                            // .then(function(result) {
                            //     console.log(result);
                            //     var b = document.getElementById("nodata");

                            //     var a = document.createElement("span");
                            //     a.id = "pemail_" + result[1]; 
                            //     a.innerHTML = result[0];
                            //     b.appendChild(a);
                            //     $("#pemail_" + result[1]).clone().appendTo("#nopemail" + result[1]);

                            // })
                        }
                        // for(let i = 0; i < document.getElementsByClassName("ship-button").length; i++) {

                            document.getElementById("new-orders").addEventListener("click",function(e) {
                                if(e.target && e.target.nodeName == "BUTTON") {
                            var y = e.target.value;
                            var x = document.getElementById("tracking-input" + y).value;
  
                            contractInstance.methods.itemShipped(e.target.value, e.target.id, x).send()
                            .on("receipt", function(receipt){ 
                                console.log(receipt);
                                location.reload();
                            })             
                        }
            
                        });
                        // }
                    })



                    contractInstance.getPastEvents('ProductSold', {filter: {buyer: [accounts[0]]}, fromBlock: 0, toBlock: 'latest'}, function (error, events) {
                        var hash_table = document.getElementById("hashes"); // order history tx hash data is copied from this hidden div
                            for (i = 0; i < events.length; i++) {
                            var order_id = events[i].returnValues[0];
                            var purchased_item_id = events[i].returnValues[1];
                            var hash = [];
                            hash.push(events[i].transactionHash);
                            var tx_hash_label = document.createElement("LABEL");
                            var tx_hash_span = document.createElement("span");
                            tx_hash_span.id = "tx_hash" + events[i].returnValues[0];
                            tx_hash_span.innerHTML = events[i].transactionHash;
                            tx_hash_label.setAttribute("for", "tx_hash" + events[i].returnValues[0]);
                            tx_hash_label.innerHTML = "TX Hash: ";
                            hash_table.appendChild(tx_hash_label);
                            hash_table.appendChild(tx_hash_span);
                            hash_table.appendChild(document.createElement("br"));

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
                            


                            contractInstance.methods.orders(order_id, purchased_item_id).call()
                            .then(function(result) {
                                console.log(result);

                                var table = document.getElementById("order-history");

                                var hash_label = document.createElement("LABEL");
                                hash_label.setAttribute("for", "tx_hash" + result.orderID);
                                hash_label.innerHTML = "TX Hash: ";
                                table.appendChild(hash_label);
                                $("#tx_hash" + result.orderID).clone().appendTo(table);
                                table.appendChild(document.createElement("br"));

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
                                table.appendChild(document.createElement("p"));
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
        $("#menu").append(event.returnValues['newStoreName']);
        $("#new_store").add(event.returnValues['newStoreName']);
    }))
    var config = {
        value: web3.utils.toWei(".005")
    }
    contractInstance.methods.newStore(name, description, website, email).send(config)
    .on("receipt", function(receipt){ 
        console.log(receipt);
        $("#storeName").val("");
        $("#store-description").val("");
        $("#store-website").val("");
        $("#store-email").val("");
        location.reload();

    }) 
}

function refresh () {
    location.reload();
}

