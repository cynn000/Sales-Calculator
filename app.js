// Sales Calculator

const allButtons = document.querySelectorAll("button"); // select all button elements in document
const subtotalText = document.getElementById("subtotal"); // get element with id subtotal
const taxText = document.getElementById("tax"); // get element with id tax
const totalText = document.getElementById("total"); // get element with id total
const transactionText = document.getElementById("transaction"); // get element with id transaction

let transactionList = []; // create empty list for the transaction list
let subtotal = 0; // set subtotal to be 0
let total = 0; // set total to be 0
let taxPrice = 0; // set taxPrice to be 0
let vatTax = 0; // set the vat tax to be 0
const tax = 0.10; // set tax to be applied to price later

// array of objects called products
// each has a name, price, group, and tax
// Groupds are: Fruit, Beverage, Snack, and Vehicle
const products = [
    {
        name: "Apple",
        price: 2.99,
        group: "Fruit",
        tax: true
    },
    {
        name: "Orange",
        price: 0.50,
        group: "Fruit",
        tax: false
    },
    {
        name: "Banana",
        price: 9.99,
        group: "Fruit",
        tax: false
    },
    {
        name: "Bottle Water",
        price: 2.00,
        group: "Beverage",
        tax: false
    },
    {
        name: "Can of Pop",
        price: 5.25,
        group: "Beverage",
        tax: true
    },
    {
        name: "Cup of Coffee",
        price: 1.00,
        group: "Beverage",
        tax: true
    },
    {
        name: "Candy",
        price: 2.99,
        group: "Snack",
        tax: true
    },
    {
        name: "Chocolate Bar",
        price: 10.41,
        group: "Snack",
        tax: false
    },
    {
        name: "Chips",
        price: 3.85,
        group: "Snack",
        tax: true
    },
    {
        name: "Gasoline",
        price: 50.99,
        group: "Vehicle",
        tax: true
    },
    {
        name: "Windshield Fluid",
        price: 14.95,
        group: "Vehicle",
        tax: true
    },
    {
        name: "Motor Oil",
        price: 30.00,
        group: "Vehicle",
        tax: true
    },

]

// function clickButton decides what each button will do depending on button clicked
function clickButton() {

    // if the button that was clicked has an id of void
    if (this.id === "void") {
        // void button was clicked
        // reset and clear sale

        transactionList = [];   // set transaction list to empty array
        transactionText.innerText = ""; // clear transaction text to be empty
        subtotal = 0; // reset subtotal to 0
        total = 0; // reset total to 0
        vatTax = 0; // reset vat tax to 0 to display 0 as tax
        taxPrice = 0; // reset tax price to 0 to display 0 as tax
    }
    // else if the button was was clicked has an id of save
    else if (this.id === "save") {
        // save button was clicked
        // exports the current transaction into a JSON file
        // once the save button is clicked, it downloads the new JSON file
        
        const data = JSON.stringify(transactionList, null, 4); // converts the transaction array to JSON string, with null replacer and indents with 4 spaces
        const blob = new Blob([data], {type : 'application/json'}); // creates a blob object of all the data in an array of type JSON
        
        const link = document.createElement("a"); // create a new hyperlink element called link
        link.href = URL.createObjectURL(blob); // create URL representing the blob data and set it as URL of the link
        link.download = "transaction.json"; // download given blob URL as transaction.json file
        link.click(); // simulates that the link was clicked to download the file, since the save button was clicked, it simulates that the link was clicked to download the JSON file
    }
    // else a product button was clicked
    else {
        // list product name and price in transaction list
        // calculate subtoal, VAT, and total

        // find the product in products with name mataching to button name
        const product = products.find(x => x.name === this.innerText);
        transactionList.push(product); // push the product object into the transactionList array

        // calculate if there is tax
        // if there is product tax
        if (product.tax) {
            // calculate taxPrice by multiplying the price with the tax value
            taxPrice = product.price * tax;

            vatTax += taxPrice; // calculate vat tax by adding new tax price each time
        }

        subtotal += product.price; // calculate the subtotal by adding each product price
        
        // list item in transaction list with product name and price and add a new line to list new product on a new line
        transactionText.innerText += product.name + " $" + roundToTwoDecimalPlaces(product.price) + "\n";

    }

    total = subtotal + vatTax; // calculate total by adding subtotal and vat tax
    
    subtotalText.innerText = "$" + roundToTwoDecimalPlaces(subtotal); // set subtotal text to be the value of the subtotal
    taxText.innerText = "$" + roundToTwoDecimalPlaces(vatTax); // set the tax text to be the value of the tax price
    totalText.innerText = "$" + roundToTwoDecimalPlaces(total); // set the total text to be the value of the total

}

// function to round to two decimal places using toFixed()
function roundToTwoDecimalPlaces(number) {
    return number.toFixed(2);
}

// for all the buttons, add eventListener for clicking and run function clickButton
for (button of allButtons) {
    button.addEventListener("click", clickButton);
}