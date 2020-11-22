#DRAFT
#The following measures were taken to ensure that the smart contracts are not susceptible to common attacks:

#explain at least 2 common attacks and how the app mitigates user risk

-Ether is transferred directly to the seller at the time of the transaction (sale of a product) to minimize possible re-entrancy attacks on a withdraw function.

-Access Control was implemented by importing OpenZeppelin Contracts library (specifically, Ownable.sol) to use the onlyOwner function modifier. The modifer was placed on the withdrawAll function that allows the contract owner to withdraw the balance of the contract. The modifier was also placed on the function to toggle the circuit breaker. Furthermore, the contract owner gets set at the time of contract creation (msg.sender).

-The circuit breaker function modifier was placed on all functions that involve the transfer of Ether. The circuit breaker is controlled through a boolean variable isActive which is set to true by default. By calling toggleCircuitBreaker(), the owner is able to switch the boolean value to false (and vice-versa) in order to trigger the circuit breaker and prevent all functions with the requireIsActive function modifier from executing. 

-Reviewed documentation on common attacks

-used open-source security analysis tool, Smart Check, to check for vulnerabilities and bad practices