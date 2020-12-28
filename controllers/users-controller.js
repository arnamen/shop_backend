const HttpError = require('../models/http-error');

const DUMMY_USERS = [
    {
        id: '1',
        name: 'n1'
    },{
        id: '2',
        name: 'n2'
    }
];

const getUserById = (req, res, next) => {
    const id = req.params.id;
    const requestedUser = DUMMY_USERS.find(user => user.id === id);
    if(!requestedUser) {
        const error = new HttpError('could not find user with provided id.', 404);
        next(error);
    }
    res.json(requestedUser);
};

const getAllUsers = (req,res, next) => {
    res.json(DUMMY_USERS);
};

const createUser = (req,res, next) => {
    
};

const loginUser = (req,res, next) => {
    
};

const updateUser = (req,res, next) => {
    const id = req.params.id;
    const userToUpdate = DUMMY_USERS.find(user => user.id === id);
    if(!userToUpdate) {
        const error = new HttpError('could not find user with provided id.');
        next(error);
    }
    res.json(userForUpdate);
};

exports.getUserById = getUserById;
exports.getAllUsers = getAllUsers;
exports.createUser = createUser;
exports.loginUser = loginUser;
exports.updateUser = updateUser;