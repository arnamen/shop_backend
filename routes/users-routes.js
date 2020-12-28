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

router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    const requestedUser = DUMMY_USERS.find(user => user.id === id);
    if(!requestedUser) {
        const error = new Error('could not find user with provided id.');
        error.code = 404;
        next(error);
    }
    res.json(requestedUser);
});

router.get('/', (req,res, next) => {
    res.json(DUMMY_USERS);
});

router.post('/signup', (req,res, next) => {
    
});

router.post('/login', (req,res, next) => {
    
});

router.patch('/:id', (req,res, next) => {
    const id = req.params.id;
    const userToUpdate = DUMMY_USERS.find(user => user.id === id);
    if(!userToUpdate) {
        const error = new Error('could not find user with provided id.');
        error.code = 404;
        next(error);
    }
    res.json(userForUpdate);
});

module.exports = router;