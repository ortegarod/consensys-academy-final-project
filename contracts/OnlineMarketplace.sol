// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.7.0;
// pragma experimental ABIEncoderV2;

/// @title An implementation of a browser-based, RNG-style, item collection game
/// @author Rodrigo Ortega
/// @notice You can use this contract for interacting with the game options
/// @dev All function calls (game options) are currently accessible to all players regardless of their progress in the game

contract OnlineMarketplace {
    
    event StoreCreated(string newStoreName, address owner);
    event ProductCreated(string newProductName, uint price, uint SKU, uint quantity, uint ID, address seller);
    event ProductSold(uint ID, address buyer);
    event ProductShipped(uint ID, uint trackingNumber);

    uint ID;

    struct Stores {
        string name;
        address owner;
        uint storeID;
    }
    
    struct Products {
        string name; 
        uint price;
        uint SKU;
        uint quantity;
        uint uniqueID;
        bool sold;
        bool shipped;
        uint trackingNumber;
        address buyer;
        address seller;
        uint storeID;
    }
    
    Stores[] public storesArray;
    
    mapping (address => Stores[]) public stores;
    mapping (uint => Products[]) public products;
    
    function getID() internal returns (uint) {
        return ++ID;
    }

    function arrayLength() public view returns (uint length) {
        return storesArray.length;
    }

    // function getStores() public view returns (string[] memory, address[] memory, uint[] memory) {
    //     uint length = storesArray.length;

    //     string[] memory name = new string[](length);
    //     address[] memory owner = new address[](length);
    //     uint[] memory storeID = new uint[](length);

    //     for (uint i = 0; i < length; i++) {
    //         Stores storage a = storesArray[i];
    //         name[i] = a.name;
    //         owner[i] = a.owner;
    //         storeID[i] = a.storeID;
    //     }
    //     return (name, owner, storeID);
    // }

    function newStore(string memory _name) public payable {
        // Stores storage c = stores[msg.sender];
        // c.name = _name;
        // c.storeID = getID();
        
        Stores memory a;
        a.name = _name;
        a.owner = msg.sender;
        a.storeID = getID();
        
        insertStore(a);
        storesArray.push(a);
        
        emit StoreCreated(_name, msg.sender);
    }
    
    function insertStore(Stores memory a) private {
        stores[msg.sender].push(a);
    }
    
    function newProduct(string memory _name, uint _price, uint _SKU, uint _quantity, uint _storeID) public payable {
        Products memory c;
        c.name = _name;
        c.price = _price;
        c.SKU = _SKU;
        c.quantity = _quantity;
        c.uniqueID = getID();
        c.seller = msg.sender;
        c.storeID = _storeID;
        
        insertProduct(c, _storeID);
        
        emit ProductCreated(_name, _price, _SKU, _quantity, ID, msg.sender);
    }
    
    function insertProduct(Products memory a, uint storeID) private {
        products[storeID].push(a);
    }
    
    // function buyItem(uint _ID) public payable {
    //     Products storage c = products[_ID];
    //     c.sold = true;
    //     c.buyer = msg.sender;
        
    //     emit ProductSold(_ID, msg.sender);
    // }

    // function itemShipped(uint _ID, uint _trackingNumber) public {
    //     Products storage c = products[_ID];
    //     c.shipped = true;
    //     c.trackingNumber = _trackingNumber;
        
    //     emit ProductShipped(_ID, _trackingNumber);
    // }

}
