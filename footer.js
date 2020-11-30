var web3 = new Web3(Web3.givenProvider);
var contractInstance;

$(document).ready(function() {
    window.ethereum.enable().then(function(accounts){
        window.ethereum.on('accountsChanged', function (accounts) {
            window.location.reload();
    })
        contractInstance = new web3.eth.Contract(abi, deployment_address, {from: accounts[0]});
        $("#contract-address").text(contractInstance.options.address);
        contractInstance.methods.getContractBalance().call()
        .then(function(result) {
            console.log(result);

            $("#contract-balance").text(web3.utils.fromWei(result) + " ETH");
        })
        contractInstance.methods.owner().call()
        .then(function(result) {
            console.log(result);

            if (result == web3.utils.toChecksumAddress(accounts[0])) {
                var a = document.getElementById("withdraw");
                a.style.display = "block";
                var b = document.getElementById("circuit-breaker");
                b.style.display = "block";
            }
        })
    })
    $("#withdraw-contract-balance").click(withdrawAll)
    $("#toggle-circuit-breaker").click(toggleCircuitBreaker)

})

function withdrawAll () {
    contractInstance.methods.withdrawAll().send()
    .on("receipt", function(receipt){ 
        location.reload()
    })
}

function toggleCircuitBreaker () {
    contractInstance.methods.toggleCircuitBreaker().send()
    .on("receipt", function(receipt){ 
        location.reload()
    })
}