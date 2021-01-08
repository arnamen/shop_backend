const express = require('express');

const fileUpload = require('../middleware/file-upload');
const router = express.Router();

const { getItems, addItem, getItemById, updateItem, deleteItem } = require('../controllers/items-controller');

router.get('/:id', getItemById);

router.get('/', getItems);

router.post('/', fileUpload.array('images', 5), addItem);

router.patch('/:id', fileUpload.array('images', 5), updateItem);

router.delete('/:id', deleteItem);

module.exports = router;