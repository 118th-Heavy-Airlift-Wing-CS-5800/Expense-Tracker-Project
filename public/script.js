document.addEventListener('DOMContentLoaded', () => {
  const expenseForm = document.getElementById('expenseForm');
  const expenseOutput = document.getElementById('expenseOutput');

  // Fetch and display existing expenses on load
  fetch('/expenses')
    .then((res) => res.json())
    .then((data) => {
      if (Array.isArray(data)) {
        displayExpenses(data);
      } else {
        expenseOutput.innerText = 'No expenses found.';
      }
    })
    .catch((err) => {
      console.error('Error fetching expenses:', err);
      expenseOutput.innerText = 'Error loading expenses.';
    });

  // Handle form submission
  expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const user = document.getElementById('user').value.trim();
    const category = document.getElementById('category').value.trim();
    const amount = parseFloat(document.getElementById('amount').value);
    const description = document.getElementById('description').value.trim();
    const date = document.getElementById('date').value;

    if (!user || !category || isNaN(amount) || !date) {
      alert('Please enter all required fields.');
      return;
    }

const expense = { user, category, amount, description, date };


    fetch('/expenses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(expense),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Failed to add expense.');
        }
        return res.json();
      })
      .then((newExpense) => {
        displayExpenses([newExpense], true);
        expenseForm.reset();
      })
      .catch((err) => {
        console.error('Error adding expense:', err);
        alert('Error adding expense.');
      });
  });

  // Display expenses on the page
  function displayExpenses(expenses, append = false) {
    if (!append) {
      expenseOutput.innerHTML = '';
    }

    expenses.forEach((expense) => {
      const div = document.createElement('div');
      div.textContent = `Category: ${expense.category}, Amount: ${expense.amount}`;
      expenseOutput.appendChild(div);
    });
  }
  const totalBtn = document.getElementById('viewTotalBtn');
const totalOutput = document.getElementById('totalOutput');

totalBtn.addEventListener('click', () => {
  fetch('/expenses/total')
    .then(res => res.json())
    .then(data => {
      totalOutput.innerText = `Total Expenses: $${data.total.toFixed(2)}`;
    })
    .catch(err => {
      console.error('Error fetching total:', err);
      totalOutput.innerText = 'Error retrieving total.';
    });
});

});
