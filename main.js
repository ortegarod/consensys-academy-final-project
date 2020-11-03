var web3 = new Web3(Web3.givenProvider);
var contractInstance;

$(document).ready(function() {
    window.ethereum.enable().then(function(accounts){
        contractInstance = new web3.eth.Contract(abi, "0xb40190E84966F9156c4440a36Ffb82F904eaE55B", {from: accounts[0]});
        console.log(contractInstance);
        var account = web3.currentProvider.selectedAddress
        $("#ether_wallet").text(account);

        // contractInstance.methods.getStores().call()
        // .then(function(result){
        //     // console.log(result);
        //     $("#stores_list").text(result[0]);
        //     var counter = 0;
        //     ++counter
        //     $("#menu").append('<li><a href="#' + counter + '">' + result[0] + '</a></li>');
        // }) 

        contractInstance.methods.arrayLength().call()
        .then(function(result) {
            console.log(result);
            length = result;
            for (i = 0; i < length; i++) {
                var index = 0;

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

                    // $("#menu").append('<li><a href="#' + result[2] + '">' + result[0] + '</a></li>');
                    // jQuery("#menu").parent().attr('id', result[2]);
   
                    // $("#menu").parent().attr('id', 'test');
                    // jQuery('#menu').on('click', 'li a', function() {
                    //     jQuery(this).parent().attr('id', 'test'); //Read ID of current pressed LI:

                    // });
                    
                    
                })
            } 
        })


            // locate your element and add the Click Event Listener
    document.getElementById("menu").addEventListener("click",function(e) {
        // e.target is our targetted element.
        // try doing console.log(e.target.nodeName), it will result LI
        if(e.target && e.target.nodeName == "LI") {

            // if (e.target.id == 0) {
                console.log(e.target.id + " was clicked");
            // }
        }
    });
    })
    
    // $('#menu').click(function() {
    //     //Here this refers to the clicked element so
    //     alert(this.id)
    //   });
    
    
    // jQuery("#menu").parent().attr('id', "test");


    // for (i = 0; i < 3; i++) {
    //     var counter;
    //     counter++;
    //     console.log(i);
    // $("#menu").parent().attr('id', "test");
    // }



    $("#addStore").click(addStore)
    // $("li id='2'").click(refresh)

    // jQuery('#menu').on('click', 'li a', function() {
    //     var liId = jQuery(this).parent().attr('id', "test"); //Read ID of current pressed LI:
    //     console.log(liId);
    // });

    // $($("#menu")[2]).attr("href","#2").click(function(e){
    //     e.preventDefault();
    //     window.location = "https://www.google.com";
    // });
    // $('#menu').each(function() {
    //     attr('id', 'your-id-value');
    // })


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
    // location.reload();
    console.log("it works");
}
