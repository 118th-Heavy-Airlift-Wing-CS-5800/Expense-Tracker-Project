const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

const DATA_FILE = path.join(__dirname, '../data/budgets.json');

// Helper: Load budgets from file
function loadBudgets() {
  if (!fs.existsSync(DATA_FILE)) return [];
  const data = fs.readFileSync(DATA_FILE, 'utf-8');
  return JSON.parse(data);
}

// Helper: Save budgets to file
function saveBudgets(budgets) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(budgets, null, 2));
}

// GET /api/budgets — List all budgets
router.get('/', (req, res) => {
  const budgets = loadBudgets();
  res.json(budgets);
});

// POST /api/budgets — Create a new budget
router.post('/', (req, res) => {
  const { budgetName, username, income } = req.body;

  if (!budgetName || !username || income == null) {
    return res.status(400).json({ message: 'budgetName, username, and income are required.' });
  }

  const budgets = loadBudgets();

  const newBudget = {
    id: Date.now(), // simple unique ID
    budgetName,
    username,
    income,
    expenses: [] // initially empty
  };

  budgets.push(newBudget);
  saveBudgets(budgets);

  res.status(201).json({ message: 'Budget created successfully.', budget: newBudget });
});

module.exports = router; 
