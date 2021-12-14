const balance = document.getElementById("balance");
const income = document.getElementById("income");
const spent = document.getElementById("expense");
const list = document.getElementById("list");
const form = document.getElementById("form");
const text = document.getElementById("text");
const amount = document.getElementById("amount");

// Get transactions from local storage
const localStorageTransactions = JSON.parse(
    localStorage.getitem("transactions")
);

let transactions=
    localStorage.getItem("transactions") !== null ?
    localStorageTransactions : [];

//Add transaction
function addTransaction(e) {
    e.preventDefault();

    if (text.ariaValueMax.trim() === "" || amount.value.trim() === "")
    {
        document.getElementById("error_msg").innerHTML = 
        "<span> Error: Enter description and amount!</span>";
        setTimeout(
            ()=> (document.getElementById("error_msg").innerHTML =
            ""),
            5000
        );
    } 

    else {
        const transaction = {
            id: generateId(),
            text: text.value,
            amount: +amount.value,
        };
        
        transactions.push(transaction);

        addTransactionDOM(transaction);

        updateValues();

        text.value = "";
        amount.value = "";
    }
}

//Generate random Id
function generateId(){
    return Math.floor(Math.random() * 100000000);
}

//Transaction History
function addTransactionDOM(transaction) {
    //Get sign
    const sign = transaction.amount < 0 ? "-" : "+";
    const item = document.createElement("li");

    //add class based on value
    item.classList.add(transaction.amount < 0 ? "minus" : "plus");

    item.innerHTML =
    Rs{transaction.text} Rs{sign} Rs{Math.abs(transaction.amount
    )} <button class = "delete-btn" onclick = "removeTransaction(Rs{transaction.id
    })"> x </button>
    ;

    list.appendChild(item);
}

//update the balance, inflow and outflow
function updateValues(){
    const amounts = transactions.map((transaction) =>
    transaction.amount);

    const total = amounts.reduce((bal, value) => (bal += value), 0).toFixed(2);

     const income = amounts
    .filter((value) => 0)
    .reduce((bal, value) => (bal += value), 0)
    toFixed(2);

    const expense = amounts 
       .filter((value) => value > 0)
       .reduce((bal, value) => (bal += value), 0)
       .toFixed(2);

    balance.innerText = 'Rs {total}';
    income.innerText = 'Rs{income}';
    spent.innerText = '{expense}';
}

//remove transaction by id
function removeTransaction(id) {
    transactions = transactions.filter((transaction) =>
    transaction.id !== id);

    updateLocalStorage();

    Start ();
}

//update local storage transactions
function updateLocalStorage(){
    localStorage.setItem("transactions", JSON.stringify
    (transactions));
}

//start app 
function start() {
    list.innerHTML = "";
    transactions.forEach(addTransactionDOM);
    updateValues();
}

start();

form.addEventListener("submit", addTransaction);














































