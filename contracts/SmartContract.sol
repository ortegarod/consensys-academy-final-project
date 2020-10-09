// SPDX-License-Identifier: UNLICENSED

pragma solidity 0.7.0;

/// @title An implementation of a browser-based, RNG-style, item collection game
/// @author Rodrigo Ortega
/// @notice You can use this contract for interacting with the game options
/// @dev All function calls (game options) are currently accessible to all players regardless of their progress in the game

contract SmartContract {
    
    mapping (string => address) private playerMapping;

    function setName(string memory _playerName) public payable{
        require(msg.value == 0.001 ether); // need to set owner of the contract to claim ether
        require(playerMapping[_playerName] == address(0), "Player name already exists. Choose another name.");
        playerMapping[_playerName] = msg.sender;
    }
    
    function getName(string memory _playerName) public view returns(address) {
        return playerMapping[_playerName];
    }
}
