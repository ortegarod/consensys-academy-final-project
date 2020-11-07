// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.8.0;

import "truffle/DeployedAddresses.sol";
import "truffle/Assert.sol";
import "../contracts/OnlineMarketplace.sol";

contract TestOnlineMarketPlace {
    // Create functions that begin with "test" to signify different test functions.
    // More documentation at http://trufflesuite.com/docs/getting_started/solidity-tests

OnlineMarketplace onlinemarketplace = OnlineMarketplace(DeployedAddresses.OnlineMarketplace());

    function testArrayLength() public {
        uint returnedLength = onlinemarketplace.arrayLength();
        Assert.equal(returnedLength, 6, "Length of array should be 6");
    }

    function testGetID() public {
        uint returnedID = onlinemarketplace.getID();
        Assert.equal(returnedID, 18, "next unique ID should be 18");
    }

    function testGetStoresMALength() public {
        uint returnedLength = onlinemarketplace.getStoresMALength();
        Assert.equal(returnedLength, 6, "Number of stores in mapping should be 6");
    }

    function testGetProductsMALength() public {
        uint _storeID = 1;
        uint result = onlinemarketplace.getProductsMALength(_storeID);
        Assert.equal(result, 2, "Number of products in mapping for this storeID should be 2");
    }

    function testGetProduct() public {
        uint _uniqueID = 7;
        string memory result = onlinemarketplace.getProduct(_uniqueID);
        Assert.equal(result, "juice", "Name of product at mapping value=7 (unique id=7) should be: juice");
    }

    function testNewStore() public {
        uint _storeID = 19;
        onlinemarketplace.newStore("testStore");
        string memory result = onlinemarketplace.getStore(_storeID);
        Assert.equal(result, "testStore", "name of new store added to store mapping should be 'testStore'");
        
        // Stores memory a;
        // a.name = _name;
        // a.owner = msg.sender;
        // a.storeID = getID();
        
        // insertStore(a, a.storeID);
        // storesArray.push(a);
        
        // emit StoreCreated(_name, msg.sender, a.storeID);
    }

    function testOwner() public {
        address test = 0x07Bdf41064C48B779d890bC701dF1cF7C7170dAd;
        address result = onlinemarketplace.owner();
        Assert.equal(result, test, "address should match");

    }

}


