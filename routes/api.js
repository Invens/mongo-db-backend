// routes/api.js
const express = require('express');
const router = express.Router();
const Category = require('../models/category');

// Get all categories
router.get('/categories', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Get designs for a specific category
router.get('/categories/:slug', async (req, res) => {
  try {
    const category = await Category.findOne({ slug: req.params.slug });
    if (!category) {
      return res.status(404).json({ error: 'Category not found' });
    }
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Upload new designs
router.post('/categories', async (req, res) => {
  try {
    const newCategory = req.body;
    const category = new Category(newCategory);
    await category.save();
    res.json(category);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
