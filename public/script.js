document.addEventListener('DOMContentLoaded', () => {
  const expenseForm = document.getElementById('expenseForm');
  const expenseList = document.getElementById('expenseList');

  const API_URL = '/api/expenses';

  // Add expense
  expenseForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const category = document.getElementById('category').value;
    const amount = document.getElementById('amount').value;

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, amount })
      });

      if (!response.ok) throw new Error('Failed to add expense.');

      // Refresh list
      loadExpenses();

      // Clear form
      expenseForm.reset();
    } catch (error) {
      alert('Error adding expense');
    }
  });

  // Load expenses
  async function loadExpenses() {
    try {
      const res = await fetch(API_URL);
      const expenses = await res.json();

      expenseList.innerHTML = '';
      expenses.forEach(e => {
        const li = document.createElement('li');
        li.textContent = `Category: ${e.category}, Amount: $${e.amount}`;
        expenseList.appendChild(li);
      });
    } catch {
      expenseList.innerHTML = '<li>Failed to load expenses.</li>';
    }
  }

  loadExpenses();
  document.getElementById('userForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const username = document.getElementById('usernameInput').value;
  const email = document.getElementById('emailInput').value;

  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email })
    });

    const data = await response.json();

    const output = document.getElementById('userOutput');
    if (response.ok) {
      output.textContent = `✅ User "${data.user.username}" created successfully.`;
    } else {
      output.textContent = `❌ ${data.message}`;
    }
  } catch (err) {
    console.error('Error creating user:', err);
    document.getElementById('userOutput').textContent = '❌ Error creating user.';
  }
});
document.getElementById('userForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const username = document.getElementById('usernameInput').value.trim();
  const email = document.getElementById('emailInput').value.trim();

  try {
    const response = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email })
    });

    const data = await response.json();

    const output = document.getElementById('userOutput');
    if (response.ok) {
      output.textContent = `✅ User "${data.user.username}" created successfully.`;
    } else {
      output.textContent = `❌ ${data.message || 'Failed to create user.'}`;
    }
  } catch (err) {
    console.error('Error creating user:', err);
    document.getElementById('userOutput').textContent = '❌ Error creating user.';
  }
});


});
