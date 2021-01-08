const express = require('express');
const atob = require('atob');
const btoa = require('btoa');
const router = express.Router();

const { getItems, addItem, getItemById, updateItem, deleteItem } = require('../controllers/items-controller');

router.get('/:id', getItemById);

router.get('/', getItems);

router.post('/', addItem);

router.patch('/:id', updateItem);

router.delete('/:id', deleteItem);

module.exports = router;