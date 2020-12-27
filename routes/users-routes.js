const express = require('express');

const router = express.Router();

const DUMMY_USERS = [
    {
        id: '1',
        name: 'n1'
    },{
        id: '2',
        name: 'n2'
    }
]

router.get('/:uid', (req, res, next) => {
    const uid = req.params.uid;
    const requestedUser = DUMMY_USERS.find(user => user.id === uid);
    res.json(requestedUser);
});

router.get('', (req,res, next) => {
    res.json(DUMMY_USERS);
});

router.post('/signup', (req,res, next) => {
    
});

router.post('/login', (req,res, next) => {
    
});

router.patch('/:uid', (req,res, next) => {
    
});

module.exports = router;