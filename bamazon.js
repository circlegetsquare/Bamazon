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
  console.log("connected as id " + connection.threadId);
  createProduct();
});

function createProduct(){
    var query = connection.query(
        'insert into products set ?',
        {
            product_name: 'shake weight',
            department_name: 'fitness',
            price: '19.99',
            stock_quantity: 999
        },
        function(err, data) {
            console.log(data.affectedRows + ' products inserted');
        }
    )
}

/*var itemsArr = [];

function init(){
    var answer = 'not-post';

    if (answer === 'post'){
        postAuction();
    }
    else{
        bidAuction();
    }
};

function postAuction(){

    var query = connection.query(
        'insert into products set?',
        {
            item: 'blorp',
            category: 'service',
            start_bid: 50
        },
    function(err, res){});
    connection.end();
    console.log(query.sql);
}

function bidAuction(){
    gatherItems(); 
}

function gatherItems(){
   var query = connection.query(
        'select * from products',
        function(err, res) {
            if(err) throw err;
            //console.log("ITEMS UP FOR BID:")
            for (var i = 0; i < res.length; i++) {
                //console.log((i+1) + ". " + res[i].item);
                itemsArr.push(res[i].item);
                
            }
            console.log(itemsArr);
            inquirePrompt();
            connection.end();
        }
    );
}


function inquirePrompt(){
// Create a "Prompt" with a series of questions.
inquirer
  .prompt([
    {
      type: "list",
      message: "What item would you like to bid on?",
      choices: itemsArr,
      name: "itemList"
    },
    // Here we ask the user to confirm.
    {
      type: "confirm",
      message: "Are you sure:",
      name: "confirm",
      default: true
    }
  ])
  .then(function(inquirerResponse) {
    // If the inquirerResponse confirms, we displays the inquirerResponse's username and pokemon from the answers.
    if (inquirerResponse.confirm) {
      console.log("You're bidding on " + inquirerResponse.itemList + "\n");
    }
    else {
      console.log("\nThat's okay come again when you are more sure.\n");
    }
  });
};

init(); */

