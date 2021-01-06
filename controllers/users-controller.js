const {v4} = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');

const HttpError = require('../models/http-error');

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

const createUser = async (req, res, next) => {

    const {email,  password, name} = req.body;
    if(!email || !password || !name) next(new HttpError('Incorrect user registration data'), 400);
    let token;
    let createdUser;
    try {
        const hashedPassword = bcrypt.hashSync(password,12);

        const emailAlreadyExist = (await User.find({email: email})).length !== 0;
        const nameAlreadyExist = (await User.find({name: name})).length !== 0;
        if(emailAlreadyExist) return next(new HttpError('User with the same email already exist'), 400);
        if(nameAlreadyExist) return next(new HttpError('User with the same name already exist'), 400);
    
        createdUser = new User({email, password: hashedPassword, name});
        await createdUser.save();
    
        token = jwt.sign({userId: createdUser.id, email: createdUser.email}, "root", {expiresIn: '1d'});

    } catch (error) {
        console.log(error);
        return next(new HttpError('Signing up failed, please try again later.'), 500);
    }

    console.log(createdUser);

    res.status(201).json({
        message: `User ${name} was successfully created`,
        userData: createdUser,
        token
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