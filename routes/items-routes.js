const express = require('express');
const atob = require('atob');
const btoa = require('btoa');
const router = express.Router();

const HttpError = require('../models/http-error');

const DUMMY_ITEMS = [
    {
        id: '1',
        name: 'p1'
    },{
        id: '2',
        name: 'p2'
    }
];

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    const requestedItem = DUMMY_ITEMS.find(item => item.id === id);
    if(!requestedItem) {
        const error = new HttpError('could not find item with provided id.', 404);
        next(error);
    }
    res.json(requestedItem);
});

router.get('/', (req,res, next) => {
    const encoded = btoa(JSON.stringify(DUMMY_ITEMS));
    console.log(encoded.length);
    res.json(DUMMY_ITEMS);
});

router.post('/', (req,res, next) => {
    
});

router.patch('/:id', (req,res, next) => {
    const id = req.params.id;
    const itemToUpdate = DUMMY_ITEMS.find(item => item.id === id);
    if(!itemToUpdate) {
        const error = new HttpError('could not find item with provided id.', 404);
        next(error);
    }
    res.json(itemToUpdate);
});

router.delete('/:id', (req,res, next) => {
    const id = req.params.id;
    const itemToDelete = DUMMY_ITEMS.find(item => item.id === id);
    if(!itemToDelete) {
        const error = new HttpError('could not find item with provided id.', 404);
        next(error);
    }
    res.json(itemToDelete);
});

module.exports = router;