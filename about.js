var web3 = new Web3(Web3.givenProvider);
var contractInstance;

$(document).ready(function() {
    window.ethereum.enable().then(function(accounts){
        contractInstance = new web3.eth.Contract(abi, deployment_address, {from: accounts[0]});
        $("#contract-address2").text(contractInstance.options.address);

        web3.eth.getBalance(accounts[0]).then(function(result){
            $("#connected-account-ether-balance").text(web3.utils.fromWei(result) + " ETH");

        })
    })
})
