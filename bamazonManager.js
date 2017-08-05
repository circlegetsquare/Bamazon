var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon_DB"
});

connection.connect(function(err) {
  if (err) throw err;
  displayMenu();
});

function displayMenu(){
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "Choose an option below:",
      choices: [
        "View products for sale",
        "View low inventory",
        "Add to inventory",
        "Add new product"
      ]
    })
    .then(function(answer) {
        if (answer.action === "View products for sale"){
            viewProducts();
        }
        else if (answer.action === "View low inventory"){
            viewLowInventory();
        }
        else if (answer.action === "Add to inventory"){
            addInventory();
        }
        else if (answer.action === "Add new product"){
            addProduct();
        }
    });
};

function viewProducts(){
    var query = "SELECT * FROM products";
    
    console.log("\nALL BAMAZON PRODUCTS FOR SALE")
    console.log("-------------------------")
      connection.query(query, function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
          console.log(res[i].item_id + ". " + res[i].product_name + " ($" + res[i].price + ") || In stock: " + res[i].stock_quantity);
        }
        console.log("-------------------------\n");
        menuReturn();
    })
};

function viewLowInventory(){
    var query = "SELECT * FROM products";
    
    console.log("\nBAMAZON PRODUCTS WITH LOW INVENTORY")
    console.log("-----------------------------------")
      connection.query(query, function(err, res) {
        //if err throw err;
        for (var i = 0; i < res.length; i++) {
            if (res[i].stock_quantity < 5){
                console.log(res[i].item_id + ". " + res[i].product_name + " ($" + res[i].price + ") || In stock: " + res[i].stock_quantity);
            }         
        }
        console.log("-------------------------\n");
        menuReturn();    
    })
};

function addInventory(){
    var query = "SELECT * FROM products";
    
    console.log("\nALL BAMAZON PRODUCTS FOR SALE")
    console.log("-------------------------")
      connection.query(query, function(err, res) {
        //if err throw err;
        for (var i = 0; i < res.length; i++) {
          console.log(res[i].item_id + ". " + res[i].product_name + " ($" + res[i].price + ") || In stock: " + res[i].stock_quantity);
        }
        console.log("-------------------------\n");
        inquirer
            .prompt([
                {
                name: "item",
                type: "input",
                message: "Enter the number of the item you would like to increase stock:",
                },
                {
                name: "itemQty",
                type: "input",
                message: "Enter increase quantity:",
                },
                {
                type: "confirm",
                message: "Are you sure:",
                name: "confirm",
                default: true
                }
                ])
                .then(function(inqRes) {
                    if (inqRes.confirm) {
                        var itemID = inqRes.item;
                        var increaseQty = parseInt(inqRes.itemQty);
                        var itemStockQty = res[itemID-1].stock_quantity;
                        var updateStockQty = res[itemID-1].stock_quantity + increaseQty;

                        connection.query(
                            "UPDATE products SET ? WHERE ?",
                            [
                                {
                                stock_quantity: updateStockQty
                                },
                                {
                                item_id: itemID
                                }
                            ],
                            function(err) {
                                if (err) throw err;
                                console.log("\nSTOCK INCREASED");
                                console.log("---------------");
                                console.log("Product: " + res[itemID-1].product_name)
                                console.log("Stock increase: " + increaseQty)
                                console.log("Current stock: " + updateStockQty + "\n")
                                menuReturn();
                            }
                        )
                    }
                    else {
                        menuReturn();
                    }
                });
                 
    })
};

function addProduct(){
    inquirer
    .prompt([
        {
        name: "productName",
        type: "input",
        message: "Enter the product name:",
        },
        {
        name: "departmentName",
        type: "input",
        message: "Enter the department name:",
        },
        {
        name: "productPrice",
        type: "input",
        message: "Enter the price:",
        },
        {
        name: "productQty",
        type: "input",
        message: "Enter the quantity:",
        }
    ])
    .then(function(inqRes){
        connection.query(
            "INSERT INTO products SET ?",
            [
                {
                product_name: inqRes.productName,
                department_name: inqRes.departmentName,
                price: inqRes.productPrice,
                stock_quantity: inqRes.productQty
                }
            ],
            function(err) {
                if (err) throw err;
                console.log("\nNEW PRODUCT ADDED");
                console.log("-----------------");
                console.log("Product: " + inqRes.productName)
                console.log("Department: " + inqRes.departmentName)
                console.log("Price: " + inqRes.productPrice)
                console.log("Stock Quantity: " + inqRes.productQty)
                menuReturn();
            }
        )
    })
};


function menuReturn(){
    inquirer
    .prompt([
        {
        type: "confirm",
        message: "Would you like to return to the menu?",
        name: "confirm",
        default: true
        }
    ])
    .then(function(inqRes){
        if (inqRes.confirm) {
            displayMenu();
        }
        else{
            console.log("\nThank you. Goodbye.\n")
            connection.end();
        }
    })
};