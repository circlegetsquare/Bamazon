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
  //console.log("connected as id " + connection.threadId);
  displayProducts();
});

function displayProducts(){
    var query = "SELECT * FROM products";
    
    console.log("\nBAMAZON PRODUCTS FOR SALE")
    console.log("-------------------------")
      connection.query(query, function(err, res) {
        if (err) throw err;
        for (var i = 0; i < res.length; i++) {
          console.log(res[i].item_id + ". " + res[i].product_name + " ($" + res[i].price + ")");
        }
        buyPrompt(res);
    })
    
};

function buyPrompt(res){
// Create a "Prompt" with a series of questions.
inquirer
  .prompt([
    {
      name: "item",
      type: "input",
      message: "Enter the number of the item you would like to buy:",
    },
    {
      name: "itemQty",
      type: "input",
      message: "Enter quantity:",
    },
    {
      type: "confirm",
      message: "Are you sure:",
      name: "confirm",
      default: true
    }
  ])
  .then(function(inqRes) {
    // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
    if (inqRes.confirm) {
        var itemID = inqRes.item;
        var itemOrderQty = inqRes.itemQty;
        var itemStockQty = res[itemID-1].stock_quantity;

        //console.log("DB Item stock: " + itemStockQty);

        if (itemStockQty < itemOrderQty){
            console.log("\nUnfortunately, we don't have enough in stock.\n");
            buyAgain();
        }
        else{
            fulfillOrder(res, itemID, itemOrderQty);
        }
    }
    else {
        buyAgain();
    }
  });
};

function fulfillOrder(res, itemID, itemOrderQty){
    var updateStockQty = res[itemID-1].stock_quantity - itemOrderQty;

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
            var purchaseTotal = itemOrderQty * res[itemID-1].price;
            console.log("\nYour order is done!")
            console.log("The total cost of your purchase is $" + purchaseTotal + "\n")
            buyAgain();
        }
    );  
};

function buyAgain(){
    inquirer
    .prompt([
        {
        type: "confirm",
        message: "Would you like to buy something else?",
        name: "confirm",
        default: true
        }
    ])
    .then(function(inqRes){
        if (inqRes.confirm) {
            displayProducts();
        }
        else{
            console.log("\nThank you. Please shop Bamazon again.\n")
            connection.end();
        }
    })
};