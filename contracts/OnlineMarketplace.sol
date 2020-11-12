// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.6.0;

import "@openzeppelin/contracts/access/Ownable.sol";

/// @title An implementation of an online marketplace using Ethereum
/// @author Rodrigo Ortega
/// @notice You can use this contract for actions related to the online marketplace (listing items, buying items, etc.)
contract OnlineMarketplace is Ownable {
    
    event StoreCreated(string newStoreName, address owner, uint storeID);
    event ProductCreated(string newProductName, uint price, uint SKU, uint quantity, uint uniqueID, address seller, uint storeID);
    event ProductSold(uint indexed productID, address indexed buyer, address indexed seller, uint price);
    event ProductShipped(uint productID, uint trackingNumber, address indexed seller, address indexed buyer);
    event UserRegistered(address indexed user, string email);

    uint ID;
    uint balance;

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

    mapping (address => string) emails;
    
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

    function getProductA (uint _uniqueID) public view returns (string memory name, string memory description, uint price, uint SKU, uint quantity, uint uniqueID) {
        return (productsMapping[_uniqueID].name, productsMapping[_uniqueID].description, productsMapping[_uniqueID].price, productsMapping[_uniqueID].SKU, productsMapping[_uniqueID].quantity, productsMapping[_uniqueID].uniqueID);
    }

    function getProductB (uint _uniqueID) public view returns (bool sold, bool shipped, uint trackingNumber, address buyer, address seller, uint storeID) {
        return (productsMapping[_uniqueID].sold, productsMapping[_uniqueID].shipped, productsMapping[_uniqueID].trackingNumber, productsMapping[_uniqueID].buyer, productsMapping[_uniqueID].seller, productsMapping[_uniqueID].storeID);
    }

    function getProductsMA(uint _storeID, uint _index) public view returns (string memory) {
        return products[_storeID][_index].name;
    }

    function getStore(uint _storeID) public view returns (string memory) {
        return storesMapping[_storeID].name;
    }

    function getEmail(address _address) public view returns (string memory email) {
        return emails[_address];
    }

    function getContractBalance() public view returns (uint) {
        return address(this).balance;
    }

    function newStore(string memory _name, string memory _description, string memory _website, string memory _email) public payable {     
        require (msg.value == .005 ether);
        balance += msg.value;
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
       
        emit ProductSold(_productID, msg.sender, productsMapping[_productID].seller, productsMapping[_productID].price);
    }

    function itemShipped(uint _uniqueID, uint _trackingNumber) public {
        productsMapping[_uniqueID].trackingNumber = _trackingNumber;
        productsMapping[_uniqueID].shipped = true;

        emit ProductShipped(_uniqueID, _trackingNumber, productsMapping[_uniqueID].seller, productsMapping[_uniqueID].buyer);
    }

    function register(string memory _email) public {
        emails[msg.sender] = _email;

        emit UserRegistered(msg.sender, _email);
    }

    function getBalance() public view returns (uint) {
        return address(this).balance;       
    }

}
