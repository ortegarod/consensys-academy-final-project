#DRAFT
#explain why you chose the design patterns you did

Circuit Breaker placed on functions that involve the transfer of Ether.

Ether value is sent at the time of the transaction (sale of a product) to minimize possible attacks on a withdraw function for the seller. Additionally, this allows the seller to immediately receive funds before shipping out a product.  

Access Control (Ownable.sol) by OpenZeppelin implemented on contract's balance withdraw function and toggle for circuit breaker using onlyOwner function modifier. Owner gets set at the time of contract creation (msg.sender).

How to handle shipping fees? - all product prices should be inclusive of shipping fees. Due to this current limitation, at launch, the services are presumed to be provided to users within the contiguous 48 states (USA) only. Future project updates may allow the calculation of real-time shipping rates to include in transaction, as well as the listing of stores by region (as well as by category).

OTHER ISSUES TO CONSIDER:
customer's address/contact info becomes public on blockchain
customer's purchase history would be public (e.g., what products they bought and where it was shipped)
customer should provide email only and communicate shipping information with seller directly to limit publicly accessible information on the blockchain