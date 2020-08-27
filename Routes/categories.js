const express = require('express');

const { 
    getAllCategories,
    getCategoryById,
    addNewCategory,
    deleteCategory
} = require('../Controllers/categoryController');

const router = express.Router();

// @desc    Get list of category
// @route   GET /api/v1/categories
// @access  Public
router.get('/', getAllCategories);

// @desc    Get specific category by id
// @route   GET /api/v1/categories/:id
// @access  Public
router.get('/:id', getCategoryById);

// @desc    Get a list of all items in a category
// @route   GET /api/v1/categories/:id/items
// @access  Public
router.get('/:id/items', getCategoryById);

// @desc    Add a new category
// @route   POST /api/v1/categories/add
// @access  Public
router.post('/add', addNewCategory);

// @desc    Delete a category
// @route   DELETE /api/v1/categories/:id
// @access  Public
router.delete('/:id', deleteCategory);

module.exports = router;