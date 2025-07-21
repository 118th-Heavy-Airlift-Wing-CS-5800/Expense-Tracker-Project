const baseUrl = "https://expense-tracker-cs-5800.onrender.com"; // Replace with your Render URL

function createUser() {
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;

  fetch(`${baseUrl}/users`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, email }),
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById("userResponse").innerText = JSON.stringify(data);
    });
}

function addBudget() {
  const username = document.getElementById("budget-user").value;
  const amount = document.getElementById("budget-amount").value;

  fetch(`${baseUrl}/budgets`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, amount: parseFloat(amount) }),
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById("budgetResponse").innerText = JSON.stringify(data);
    });
}

function addExpense() {
  const username = document.getElementById("expense-user").value;
  const name = document.getElementById("expense-name").value;
  const amount = document.getElementById("expense-amount").value;

  fetch(`${baseUrl}/expenses`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, name, amount: parseFloat(amount) }),
  })
    .then(res => res.json())
    .then(data => {
      document.getElementById("expenseResponse").innerText = JSON.stringify(data);
    });
}