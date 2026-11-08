
let expenseForm = document.getElementById("expenseForm");

let expenseName = document.getElementById("expenseName");
let amount = document.getElementById("amount");
let category = document.getElementById("category");

let expenseList = document.getElementById("expenseList");
let total = document.getElementById("total");

let expenses = [];

expenseForm.addEventListener("submit", function(event) {

    event.preventDefault();

    let name = expenseName.value.trim();
    let price = Number(amount.value);
    let type = category.value;

    if (name === "" || price <= 0 || !Number.isFinite(price) || type === "") {
        alert("Please enter valid expense details.");
        return;
    }

    let expense = {
        id: Date.now(),
        name: name,
        amount: price,
        category: type
    };

    expenses.push(expense);

    displayExpenses();

    expenseForm.reset();

});

function displayExpenses() {

    expenseList.innerHTML = "";

    let totalAmount = 0;

    if (expenses.length === 0) {
        expenseList.innerHTML =
            '<p class="empty">No expenses added yet.</p>';
    }

    expenses.forEach(function(expense) {

        totalAmount += expense.amount;

        let item = document.createElement("div");
        item.className = "expense-item";

        let details = document.createElement("div");

        let name = document.createElement("h3");
        name.textContent = expense.name;

        let type = document.createElement("p");
        type.textContent = expense.category;

        details.appendChild(name);
        details.appendChild(type);

        let price = document.createElement("span");
        price.className = "expense-amount";
        price.textContent = "Rs. " + expense.amount.toFixed(2);

        let deleteButton = document.createElement("button");
        deleteButton.className = "delete-btn";
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function() {

            expenses = expenses.filter(function(item) {
                return item.id !== expense.id;
            });

            displayExpenses();

        });

        item.appendChild(details);
        item.appendChild(price);
        item.appendChild(deleteButton);

        expenseList.appendChild(item);

    });

    total.textContent = "Rs. " + totalAmount.toFixed(2);

}
