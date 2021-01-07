const express = require('express');

const checkAuth = require('../middleware/check-auth');

const router = express.Router();

const { getUserById, getAllUsers, createUser, loginUser, updateUser } = require('../controllers/users-controller');

router.get('/:id', getUserById);

router.get('/', getAllUsers);

router.post('/signup', createUser);

router.post('/login', loginUser);

router.patch('/:id', checkAuth, updateUser);

module.exports = router;