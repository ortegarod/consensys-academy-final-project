// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.7.0;
// pragma experimental ABIEncoderV2;

/// @title An implementation of a browser-based, RNG-style, item collection game
/// @author Rodrigo Ortega
/// @notice You can use this contract for interacting with the game options
/// @dev All function calls (game options) are currently accessible to all players regardless of their progress in the game

contract OnlineMarketplace {
    
    event StoreCreated(string newStoreName, address owner, uint storeID);
    event ProductCreated(string newProductName, uint price, uint SKU, uint quantity, uint uniqueID, address seller, uint storeID);
    event ProductSold(uint indexed productID, address indexed buyer, address indexed seller);
    event ProductShipped(uint productID, uint trackingNumber);

    uint ID;

    struct Stores {
        string name;
        address owner;
        uint storeID;
        string description;
        string website;
        string email;
    }
    
    struct Products {
        string name; 
        string description;
        uint price;
        uint SKU;
        uint quantity;
        uint uniqueID;
        bool sold;
        bool shipped;
        uint trackingNumber;
        address buyer;
        address payable seller;
        uint storeID;
    }
    
    Stores[] public storesArray;
    mapping (uint => Products) public productsMapping;
    mapping (uint => Stores) public storesMapping;

    
    mapping (address => Stores[]) public stores;
    mapping (uint => Products[]) public products;
    
    function getID() public returns (uint) {
        return ++ID;
    }

    function arrayLength() public view returns (uint length) {
        return storesArray.length;
    }

    function getStoresMALength() public view returns (uint) {
        return stores[msg.sender].length;
    }

    function getProductsMALength(uint _storeID) public view returns (uint) {
        return products[_storeID].length;
    }

    function getProduct(uint _uniqueID) public view returns (string memory) {
        return productsMapping[_uniqueID].name;
    }

    function getStore(uint _storeID) public view returns (string memory) {
        return storesMapping[_storeID].name;
    }

    function getContractBalance() public view returns (uint) {
        return address(this).balance;
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

    function newStore(string memory _name, string memory _description, string memory _website, string memory _email) public payable {
        // Stores storage c = stores[msg.sender];
        // c.name = _name;
        // c.storeID = getID();
        
        Stores memory a;
        a.name = _name;
        a.owner = msg.sender;
        a.storeID = getID();
        a.description = _description;
        a.website = _website;
        a.email = _email;
        
        insertStore(a, a.storeID);
        storesArray.push(a);
        
        emit StoreCreated(_name, msg.sender, a.storeID);
    }
    
    function insertStore(Stores memory a, uint _storeID) private {
        stores[msg.sender].push(a);
        storesMapping[_storeID] = a;
    }
    
    function newProduct(string memory _name, string memory _description, uint _price, uint _SKU, uint _quantity, uint _storeID) public payable {
        Products memory c;
        c.name = _name;
        c.description = _description;
        c.price = _price;
        c.SKU = _SKU;
        c.quantity = _quantity;
        uint abc = getID();
        c.uniqueID = abc;
        c.seller = msg.sender;
        c.storeID = _storeID;
        
        insertProduct(c, _storeID, abc);

        emit ProductCreated(_name, _price, _SKU, _quantity, abc, msg.sender, c.storeID);
    }
    
    function insertProduct(Products memory c, uint storeID, uint _uniqueID) private {
        products[storeID].push(c);
        productsMapping[_uniqueID] = c;
    }
    
    function buyItem(uint _productID) public payable {
        require (msg.value == productsMapping[_productID].price);
        require (productsMapping[_productID].quantity > 0);
        productsMapping[_productID].seller.transfer(msg.value);
        productsMapping[_productID].sold = true;
        productsMapping[_productID].buyer = msg.sender;
        productsMapping[_productID].quantity -= 1;


        // Products storage c = products[_storeID][_productID];
        // c.sold = true;
        
        emit ProductSold(_productID, msg.sender, productsMapping[_productID].seller);
    }

    // function itemShipped(uint _ID, uint _trackingNumber) public {
    //     Products storage c = products[_ID];
    //     c.shipped = true;
    //     c.trackingNumber = _trackingNumber;
        
    //     emit ProductShipped(_ID, _trackingNumber);
    // }


    function owner() public view returns (address) {
         return msg.sender;
    }
}
