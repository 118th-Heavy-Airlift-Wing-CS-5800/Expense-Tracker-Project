const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const DATA_FILE = path.join(__dirname, '../data/expenses.json');

// Load or initialize data
function loadExpenses() {
  if (!fs.existsSync(DATA_FILE)) return [];
  const data = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(data);
}

function saveExpenses(expenses) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(expenses, null, 2));
}

// GET /api/expenses - list all
router.get('/', (req, res) => {
  const expenses = loadExpenses();
  res.json(expenses);
});

// POST /api/expenses - add new
router.post('/', (req, res) => {
  const { category, amount } = req.body;

  if (!category || !amount) {
    return res.status(400).json({ message: 'Category and amount are required.' });
  }

  const expenses = loadExpenses();

  const newExpense = {
    id: Date.now(),
    category,
    amount: parseFloat(amount)
  };

  expenses.push(newExpense);
  saveExpenses(expenses);

  res.status(201).json({ message: 'Expense added.', expense: newExpense });
});

router.get('/:username/total', (req, res) => {
  const { username } = req.params;
  const expenses = loadExpenses();
  const userExpenses = expenses.filter(exp => exp.username === username);
  const total = userExpenses.reduce((sum, exp) => sum + Number(exp.amount), 0);

  res.json({ username, total });
});


module.exports = router;
