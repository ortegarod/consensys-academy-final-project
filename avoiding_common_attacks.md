The following measures were taken to ensure that the smart contracts are not susceptible to common attacks:

-To reduce the risk of re-entrancy attacks, Ether is transferred directly to the seller at the time of the transaction (sale of a product) to minimize possible re-entrancy attacks on a withdraw function. Also, to create a new store, a payment of Ethere is required, reducing the incentive to spam. Furthermore, critical functions such as withdrawing the contract's balance or triggering a circuit breaker require the owner to execute. 

-Access Control was implemented by importing OpenZeppelin Contracts library (specifically, Ownable.sol) to use the onlyOwner function modifier. The modifer was placed on the withdrawAll function that allows the contract owner to withdraw the balance of the contract. The modifier was also placed on the function to toggle the circuit breaker. Furthermore, the contract owner gets set at the time of contract creation (msg.sender).

-The circuit breaker function modifier was placed on all functions that involve the transfer of Ether. The circuit breaker is controlled through a boolean variable isActive which is set to true by default. By calling toggleCircuitBreaker(), the owner is able to switch the boolean value to false (and vice-versa) in order to trigger the circuit breaker and prevent all functions with the requireIsActive function modifier from executing. 

-The risk of integer overflow/underflow is low due to the limited amount of math functions in the smart contract. The getID() function increments the uint ID variable by 1 each time is is called, and is unlikely to overflow. Furthermore, user-inputted values such as tracking number, SKU, price, etc. are unlikely to overflow the uint variables.

-Any app functionality requiring loops over dynamic array happens exlusively on the front-end using web3 contract calls reducing the risk of not getting transactions included in block due to a gas limit. No loops are included in the smart contract itself.

-Documentation on smart contract weaknessed was reviewed and the contract is believed to be free of these weaknesses (swcregistry.io); however, there is no guarantee.

-Also used was an open-source security analysis tool, Smart Check (https://tool.smartdec.net/), to check for contract vulnerabilities and bad practices. These issues have been addressed.

-Finally, each contract function was tested for proper functionality using either tests.sol, test.js or through the front-end using web3 calls.
