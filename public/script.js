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

    const category = document.getElementById('category').value.trim();
    const amount = parseFloat(document.getElementById('amount').value);

    if (!category || isNaN(amount)) {
      alert('Please enter valid category and amount.');
      return;
    }

    const expense = { category, amount };

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
});
