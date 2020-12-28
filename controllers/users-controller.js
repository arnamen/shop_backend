const {v4} = require('uuid');

const HttpError = require('../models/http-error');

const DUMMY_USERS = [
    {
        id: '1',
        name: 'n1',
        email: 'test@test.com',
        password: 'test'
    },{
        id: '2',
        name: 'n2',
        email: 'test2@test.com',
        password: 'test2'
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

const createUser = (req, res, next) => {

    const {email, password, name} = req.body;
    if(!email || !password || !name) next(new HttpError('Incorrect user registration data'), 400);

    const emailAlreadyExist = !!DUMMY_USERS.find(user => user.email === email);
    const nameAlreadyExist = !!DUMMY_USERS.find(user => user.name === name);
    if(emailAlreadyExist) return next(new HttpError('User with the same email already exist'), 400);
    if(nameAlreadyExist) return next(new HttpError('User with the same name already exist'), 400);

    const id = v4();
    const createdUser = {id,name,email,password};
    DUMMY_USERS.push(createdUser);

    res.status(201).json({
        message: `User ${name} was successfully created`,
        userData: createdUser
    });

};

const loginUser = (req,res, next) => {

    const {email, password} = req.body;
    if(!email || !password) next(new HttpError('Incorrect login data'), 400);

    const userData = DUMMY_USERS.find(user => user.email === email && user.password === password);
    if(!userData) return next(new HttpError('Incorrect login data'), 400);

    res.status(200).json(userData);

};

const updateUser = (req,res, next) => {
    res.status(500).json({message: 'This feature is in development'});
};

exports.getUserById = getUserById;
exports.getAllUsers = getAllUsers;
exports.createUser = createUser;
exports.loginUser = loginUser;
exports.updateUser = updateUser;