document.addEventListener('DOMContentLoaded', () => {
  const expenseForm = document.getElementById('expenseForm');
  const expenseList = document.getElementById('expenseList');
  const userForm = document.getElementById('userForm');
  const userOutput = document.getElementById('userOutput');

  const EXPENSE_API = '/api/expenses';
  const USER_API = '/api/users';

  // Add expense
  expenseForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const category = document.getElementById('category').value;
    const amount = document.getElementById('amount').value;

    try {
      const response = await fetch(EXPENSE_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category, amount })
      });

      if (!response.ok) throw new Error('Failed to add expense.');
      loadExpenses();
      expenseForm.reset();
    } catch {
      alert('❌ Error adding expense.');
    }
  });

  // Load expenses
  async function loadExpenses() {
    try {
      const res = await fetch(EXPENSE_API);
      const expenses = await res.json();
      expenseList.innerHTML = '';
      expenses.forEach(e => {
        const li = document.createElement('li');
        li.textContent = `Category: ${e.category}, Amount: $${e.amount}`;
        expenseList.appendChild(li);
      });
    } catch {
      expenseList.innerHTML = '<li>❌ Failed to load expenses.</li>';
    }
  }

  // Create user
  userForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const username = document.getElementById('usernameInput').value.trim();
    const email = document.getElementById('emailInput').value.trim();
    const password = document.getElementById('passwordInput').value.trim();

    try {
      const response = await fetch(USER_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password })

      });

      const data = await response.json();
      if (response.ok) {
        userOutput.textContent = `✅ User "${data.user.username}" created successfully.`;
      } else {
        userOutput.textContent = `❌ ${data.message || 'Failed to create user.'}`;
      }
    } catch (err) {
      console.error('Error creating user:', err);
      userOutput.textContent = '❌ Error creating user.';
    }
  });

  // Initial load
  loadExpenses();
});
