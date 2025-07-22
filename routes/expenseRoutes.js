const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const BUDGET_FILE = path.join(__dirname, '../data/budgets.json');

// Helper: Load budgets from file
function loadBudgets() {
  if (!fs.existsSync(BUDGET_FILE)) return [];
  const data = fs.readFileSync(BUDGET_FILE, 'utf-8');
  return JSON.parse(data);
}

// Helper: Save budgets to file
function saveBudgets(budgets) {
  fs.writeFileSync(BUDGET_FILE, JSON.stringify(budgets, null, 2));
}

// POST /api/expenses — Add an expense to a budget
router.post('/', (req, res) => {
  const { user, category, amount, description, date } = req.body;

  if (!user || !category || !amount || !date) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  const newExpense = {
    user,
    category,
    amount,
    description: description || '',
    date,
  };

  expenses.push(newExpense);
  res.status(201).json(newExpense);
});


// GET /api/expenses/:budgetId — Get all expenses for a budget
router.get('/:budgetId', (req, res) => {
  const budgetId = parseInt(req.params.budgetId);
  const budgets = loadBudgets();
  const budget = budgets.find(b => b.id === budgetId);

  if (!budget) {
    return res.status(404).json({ message: 'Budget not found.' });
  }

  res.json(budget.expenses);
  // GET /expenses/total - Get total amount of all expenses
router.get('/total', (req, res) => {
  try {
    const total = expenses.reduce((sum, exp) => sum + exp.amount, 0);
    res.json({ total });
  } catch (err) {
    res.status(500).json({ message: 'Error calculating total expenses.' });
  }
});

});

module.exports = router;
