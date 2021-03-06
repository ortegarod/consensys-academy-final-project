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

    function testGetArrayLength() public {
        uint returnedLength = onlinemarketplace.getArrayLength();
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

    function testGetProductA() public {
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

    function testGetProductB() public {
        bool shipped;
        uint trackingNumber;
        address buyer;
        address seller;
        uint storeID;
        uint orderID;

        uint _uniqueID = 7;

        (shipped, trackingNumber, buyer, seller, storeID, orderID) = onlinemarketplace.getProductB(_uniqueID);
        Assert.equal(storeID, 1, "Store ID of product at mapping value=7 (unique id=7) should be: 1");
    }

    function testNewStore() public {
        uint _storeID = 19;
        onlinemarketplace.newStore.value(.005 ether)("testStore", "testDescription", "testWebsite", "testEmail");
        string memory result = onlinemarketplace.getStore(_storeID);
        Assert.equal(result, "testStore", "name of new store added to store mapping should be 'testStore'");
    }

    function testNewProductUniqueID() public {
        onlinemarketplace.newProduct.value(.001 ether)("testproduct", "testdescription", 1, 999, 99, 0);
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
        onlinemarketplace.newProduct.value(.001 ether)("testproduct", "testdescription", 1, 999, 99, 1);
        string memory result = onlinemarketplace.getProductsMA(1,2);
        Assert.equal(result, "testproduct", "product should get pushed to array in products mapping using storeID");
    }

    function testGetBalance() public {
        uint result = onlinemarketplace.getBalance();
        Assert.equal(result, .048 ether, "contract balance should be 0.048 ether");
    }

    function testGetStoresGetMALength() public {
        uint result = onlinemarketplace.getStoresMALength();
        Assert.equal(result, 1, "stores array length for msg.sender (this contract) should be 1");
    }
}


