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
  const { budgetId, name, amount, category } = req.body;

  if (!budgetId || !name || amount == null || !category) {
    return res.status(400).json({ message: 'budgetId, name, amount, and category are required.' });
  }

  const budgets = loadBudgets();
  const budget = budgets.find(b => b.id === parseInt(budgetId));

  if (!budget) {
    return res.status(404).json({ message: 'Budget not found.' });
  }

  const newExpense = {
    id: Date.now(),
    name,
    amount: parseFloat(amount),
    category
  };

  budget.expenses.push(newExpense);
  saveBudgets(budgets);

  res.status(201).json({ message: 'Expense added successfully.', expense: newExpense });
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
