NOTE TO DEVELOPERS:

This project was made using Truffle, web3 and python3 http.server. To install, navigate to the project directory in the terminal and run "npm install" to install required dependencies. Then run "python3 -m http.server" in the same directory to launch the local web server. Open Firefox or Chrome and navigate to http://localhost:8000/index.html. You will need to have Metamask installed and connect to the Rinkeby testnet (alternatively, you can launch a local blockchain using Ganache-CLI and deploy the contract using "truffle migrate").

USER INTERFACE:

Emphasis was placed on simplicity and functionality. The website is built around three (3) main pages:

(1) index.html (main.js) - On the main home page, the user is presented with a menu list of stores. Each list item is linked to a "storefront" that displays details of the store and the products available. From here, the user is able to purchase an item by clicking on the "BUY PRODUCT" button. If the transaction is successful, a tx hash is displayed and the user is instructed to go to the "My Account" page for more details on their order.

(2) account.html (account.js)

(3) about.html (about.js)

*Each page inherits header.html and footer.html (footer.js).

OTHER ISSUES TO CONSIDER:

(A) Seller Liability - To reduce contract risk and the need for a middleman, the funds are sent directly to the seller once an item is purchased. In the real world, this creates a liability issue if the seller does not fulfill the order. Platforms such as Shopify, Amazon, etc. have controls in place to hold sellers accountable. Given the permissionless nature of the blockchain and the contract that this application runs on, these controls are somewhat limited. 

One way to reduce risk for the buyer would be a ratings system where a confirmed buyer can leave a rating for the seller and a cummulative average would be displayed on the seller's storefront page. In any case, the buyer would need to perform their own due diligence before purchasing items from any sellers.

(B) Privacy - Given the open and transparent nature of the Ethereum blockchain, a customer's address and/or contact info would become public if required for an order. To reduce the risk of transmitting public information, a buyer is only required to "register" an email address that would be linked to their public Ethereum address. Once the transaction is confirmed, the seller would reach out to the buyer directly via email for a shipping address. 

Please note that the ability to upload a tracking number to the order would increase the risk of revealing a buyer's address. Therefore, although this makes the application more functional, this may not be a practical solution. A customer's purchase history would also be public (e.g., what products they bought and where it was shipped).

(C) Shipping - The initial version of this application does not separate the product price from the shipping costs. To get around this, the application would only be available to users in a certain region (in this case, the contiguous United States) in order to allow for free standard shipping. The shipping costs would then be presumed to be included in the product price. To build upon this design pattern, the application could link to multiple smart contracts each for various regions that followed the same assumptions (i.e., sort of like Craigslist.org which breaks its website down into various regions, and then subsequently into various categories). Perhaps a "contract factory" could be useful in creating these multiple smart contracts.

Alternative solutions include: (1) creating an ordering system which allows for the invoicing of shipping costs; (2) providing users with the maximum flexibility by allowing sellers to display their terms of service, service areas, etc. on their store page - the buyer and seller could then communicate directly to complete their transaction.
