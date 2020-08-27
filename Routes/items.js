const express = require('express');

const { 
    getAllItems,
    getItemById,
    addNewItem,
    deleteItem,
} = require('../Controllers/itemController');

const router = express.Router();

// @desc    Get list of items
// @route   GET /api/v1/items
// @access  Public
router.get('/', getAllItems);

// @desc    Get specific item by id
// @route   GET /api/v1/items/:id
// @access  Public
router.get('/:id', getItemById);

// @desc    Add a new item
// @route   POST /api/v1/items/add
// @access  Public
router.post('/add', addNewItem);

// @desc    Get list of items
// @route   DELETE /api/v1/items/:id
// @access  Public
router.delete('/:id', deleteItem);

module.exports = router;