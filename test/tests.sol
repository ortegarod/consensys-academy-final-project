// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

import "truffle/DeployedAddresses.sol";
import "truffle/Assert.sol";
import "../contracts/OnlineMarketplace.sol";


contract TestOnlineMarketPlace {
    // Create functions that begin with "test" to signify different test functions.
    // More documentation at http://trufflesuite.com/docs/getting_started/solidity-tests

    uint public initialBalance = 1 ether;

OnlineMarketplace onlinemarketplace = OnlineMarketplace(DeployedAddresses.OnlineMarketplace());

    function testArrayLength() public {
        uint returnedLength = onlinemarketplace.arrayLength();
        Assert.equal(returnedLength, 6, "Length of array should be 6");
    }

    function testGetID() public {
        uint returnedID = onlinemarketplace.getID();
        Assert.equal(returnedID, 18, "next unique ID should be 18");
    }

    function testGetProductsMALength() public {
        uint _storeID = 1;
        uint result = onlinemarketplace.getProductsMALength(_storeID);
        Assert.equal(result, 2, "Number of products in mapping for this storeID should be 2");
    }

    function testGetProduct() public {
        string memory name; 
        string memory description;
        uint price;
        uint SKU;
        uint quantity;
        uint uniqueID;

        uint _uniqueID = 7;

        (name, description, price, SKU, quantity, uniqueID) = onlinemarketplace.getProductA(_uniqueID);
        Assert.equal(name, "Orange Juice", "Name of product at mapping value=7 (unique id=7) should be: Orange Juice");
    }

    function testNewStore() public {
        uint _storeID = 19;
        onlinemarketplace.newStore.value(.005 ether)("testStore", "testDescription", "testWebsite", "testEmail");
        string memory result = onlinemarketplace.getStore(_storeID);
        Assert.equal(result, "testStore", "name of new store added to store mapping should be 'testStore'");
    }

    function testNewProductUniqueID() public {
        onlinemarketplace.newProduct("testproduct", "testdescription", 1, 999, 99, 0);
        string memory name; 
        string memory description;
        uint price;
        uint SKU;
        uint quantity;
        uint uniqueID;

        (name, description, price, SKU, quantity, uniqueID) = onlinemarketplace.getProductA(20);
        Assert.equal(name, "testproduct", "product should get added to product mapping using next unique ID generated");
    }

    function testNewProductStoreID() public {
        onlinemarketplace.newProduct("testproduct", "testdescription", 1, 999, 99, 1);
        string memory result = onlinemarketplace.getProductsMA(1,2);
        Assert.equal(result, "testproduct", "product should get pushed to array in products mapping using storeID");
    }

    // function testBuyItem() public {
    //     onlinemarketplace.buyItem.value(1)(20);
    //     bool shipped;
    //     uint trackingNumber;
    //     address buyer;
    //     address seller;
    //     uint storeID;
    //     uint orderID;
    //     (shipped, trackingNumber, buyer, seller, storeID, orderID) = onlinemarketplace.getProductB(20);
    //     Assert.equal(orderID, 21, "Product instance should get created with unique order ID");
    // }

    // function testItemShipped() public {
    //     onlinemarketplace.itemShipped(20, 123456789);
    //     bool shipped;
    //     uint trackingNumber;
    //     address buyer;
    //     address seller;
    //     uint storeID;
    //     uint orderID;
    //     (shipped, trackingNumber, buyer, seller, storeID, orderID) = onlinemarketplace.getProductB(20);
    //     Assert.equal(trackingNumber, 123456789, "product should have tracking number after shipped");
    // }

    function testGetBalance() public {
        uint result = onlinemarketplace.getBalance();
        Assert.equal(result, .035 ether, "contract balance should be 0.035 ether");
    }
}


