const express = require('express');
const atob = require('atob');
const btoa = require('btoa');
const router = express.Router();

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
    
});

router.delete('/:id', (req,res, next) => {
    
});

module.exports = router;