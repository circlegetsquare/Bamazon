# Bamazon
Bamazon app -- Northwestern Coding Bootcamp

## Overview
Bamazon is a CLI commerce app with two interfaces: customer and manager. The customer interface allows a customer to view the products for sale and make a purchase. The manager interface allows a manager to view all items for sale, view low inventory items, add stock, and add new items.

The app uses Node.js and a MySQL database.

## Customer Interface
In the customer interface (bamazonCustomer.js), the user is automatically presented the list of all items available for sale and is prompted to enter the number of the item they would like to buy. They are then prompted to enter the quantity and confirm. Once the order is entered, a confirmation and total cost of the order is show, and the user is asked whether they would like to make another order. [see screenshot]

![Customer Interface Screenshot 1](/images/BamazonCustomer_1.png)

If the customer attempts to order more of a product than is available, a message appears that there isn't sufficient stock to complete the order, and the user is asked whether they would like to make another order. [see screenshot]

![Customer Interface Screenshot 2](/images/BamazonCustomer_2.png)

## Manager Interface
In the manager interface (bamazonManager.js), the user is automatically presented with four options:

### View products for sale
In this option, the user can see details of all items available for sale on the site, including stock quantities. The user is then asked if they would like to return to the menu. [see screenshot]

![Customer Manager Screenshot 1](/images/BamazonManager_1.png)

#### View low inventory
In this option, the user can see details of all items available for sale on the site with a stock quantity less than 5. The user is then asked if they would like to return to the menu. [see screenshot]

![Customer Manager Screenshot 2](/images/BamazonManager_2.png)

### Add to inventory
In this option, the user is presented with details of all items available for sale and is able to choose one and add to the existing inventory. [see screenshot]

![Customer Manager Screenshot 3](/images/BamazonManager_3.png)

### Add new product
In this option, the user is prompted to enter an item name, department name, price, and quantity. These details will be added to the database, creating a new product. [see screenshots]

![Customer Manager Screenshot 4](/images/BamazonManager_4.png)

![Customer Manager Screenshot 5](/images/BamazonManager_5.png)