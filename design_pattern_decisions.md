NOTE TO DEVELOPERS:

This project was made using Truffle, web3 and python3 http.server. To install, navigate to the project directory in the terminal and run "npm install" to install required dependencies. Then run "python3 -m http.server" in the same directory to launch the local web server. Open Firefox or Chrome and navigate to http://localhost:8000/index.html. You will need to have Metamask installed and connect to the Rinkeby testnet (alternatively, you can launch a local blockchain using Ganache-CLI and deploy the contract using "truffle migrate").

The project is designed to launch with pre-populated data based on the 2_deploy_contracts.js migrations file. This is for testing purposes only and would not be included in a live version. 

USER INTERFACE:

Emphasis was placed on simplicity and functionality. The website is built around three (3) main pages:

(1) index.html (main.js) - On the main home page, the user is presented with a menu list of stores. Each list item is linked to a "storefront" that displays details of the store and the products available. From here, the user is able to purchase an item by clicking on the "BUY PRODUCT" button. If the transaction is successful, a tx hash is displayed and the user is instructed to go to the "My Account" page for more details on their order.

(2) account.html (account.js) - The account.html page will display unique results to each Ethereum address. It will display the connected Ethereum account address, user's email address (if registered), stores owned by the user address (if any) along with its products, any new orders related to these owned stores, and the order history (including order status) of any purchased items.

(3) about.html (about.js) - The about.html page contains an FAQs list on how to use the site and addresses some common questions from a user's perspective.

*Each page inherits header.html and footer.html (footer.js).

APP PRACTICALITY ISSUES TO CONSIDER:

(A) Seller Liability - To reduce contract risk and the need for a middleman, the funds are sent directly to the seller once an item is purchased. In the real world, this creates a liability issue if the seller does not fulfill the order. Platforms such as Shopify, Amazon, etc. have controls in place to hold sellers accountable. Given the permissionless nature of the blockchain and the contract that this application runs on, these controls are somewhat limited. 

One way to reduce risk for the buyer would be a ratings system where a confirmed buyer can leave a rating for the seller and a cummulative average would be displayed on the seller's storefront page. In any case, the buyer would need to perform their own due diligence before purchasing items from any sellers.

(B) Privacy - Given the open and transparent nature of the Ethereum blockchain, a customer's address and/or contact info would become public if required for an order. To reduce the risk of transmitting public information, a buyer is only required to "register" an email address that would be linked to their public Ethereum address. Once the transaction is confirmed, the seller would reach out to the buyer directly via email for a shipping address. 

Please note that the ability to upload a tracking number to the order would increase the risk of revealing a buyer's address. Therefore, although this makes the application more functional, this may not be a practical solution. A customer's purchase history would also be public (e.g., what products they bought and where it was shipped).

(C) Shipping - The initial version of this application does not separate the product price from the shipping costs. To get around this, the application would only be available to users in a certain region (in this case, the contiguous United States) in order to allow for free standard shipping. The shipping costs would then be presumed to be included in the product price. 

To build upon this design pattern, the application could link to multiple smart contracts each for various regions that followed the same assumptions (i.e., sort of like Craigslist.org which breaks its website down into various regions, and then subsequently into various categories). Perhaps a "contract factory" could be useful in creating these multiple smart contracts.

Alternative solutions include: (1) creating an ordering system which allows for the invoicing of shipping costs; (2) providing users with the maximum flexibility by allowing sellers to display their terms of service, service areas, etc. on their store page - the buyer and seller could then communicate directly to complete their transaction.

RESTRICING ACCESS: See avoiding_common_attacks.md.

MORTAL/KILL/SELF-DESTRUCT: These design patterns were avoided in favor of a circuit breaker on functions that involved the payment of Ether. Functions would revert in a circuit breaker design pattern and not result in the loss of Ether. Per the Solidity docs, removing the contract code by performing the self-descruct operation is potentially dangerous, as someone can send Ether to a removed contract and lose their Ether forever.

WITHDRAWAL PATTERN: Consideration was given to a withdrawal pattern which would protect against potential re-entrancy attacks and require sellers to request their payments. However, given the purpose of an online marketplace, it made more sense to directly transfer the payment at the time of the transaction from the buyer to the seller. This functionality was tested several times.  

SPEED BUMPS: Consideration was also give to a speed bump design pattern to mitigate spam attacks. However, function such as "adding a new store" require a small payment of Ether which was deemed sufficient to prevent spam attacks.
