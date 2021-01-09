const {v4} = require('uuid');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');
const User = require('../models/User');

const HttpError = require('../models/http-error');

const getUserById = async (req, res, next) => {
    const id = req.params.id;
    try {
        const requestedUser = await User.findOne({_id: id});
    if(!requestedUser) {
        const error = new HttpError('could not find user with provided id.', 404);
        return next(error);
    }
    res.json({name: requestedUser.name, id: requestedUser.id});
    } catch (error) {
        next(error);
    }
};

const getAllUsers = async (req,res, next) => {
    const users = (await User.find()).map(user => {return {name: user.name, id: user.id}});
    res.json(users);
};

const createUser = async (req, res, next) => {

    const {email,  password, name, surname} = req.body;
    if(!email || !password || !name, !surname) next(new HttpError('Incorrect user registration data', 400));
    let token;
    let createdUser;

    try {
        const hashedPassword = bcrypt.hashSync(password,12);

        const emailAlreadyExist = (await User.find({email: email})).length !== 0;
        if(emailAlreadyExist) return next(new HttpError('User with the same email already exist', 400));
    
        createdUser = new User({email, password: hashedPassword, name, surname});
        createdUser = await createdUser.save();

        token = jwt.sign({userId: createdUser._id, email: createdUser.email}, "root", {expiresIn: '1d'});
        res.status(201).json({
            id: createdUser.id,
            token
        });
    } catch (error) {
        console.log(error);
        return next(new HttpError('Signing up failed, please try again later.', 500));
    }

};

const loginUser = async (req,res, next) => {

    const {email, password} = req.body;
    if(!email || !password) next(new HttpError('Incorrect login data', 400));

    let token;

    try {
        const userData = await User.findOne({email: email});
        const userPassword = userData.password;
        const isPasswordValid = bcrypt.compareSync(password, userPassword);
        if(!isPasswordValid) return next(new HttpError('Incorrect login data', 400));
    
        token = jwt.sign({userId: userData.id, email: userData.email}, "root", {expiresIn: '1d'});

    } catch (error) {
        console.log(error);
        return next(new HttpError('Signing up failed, please try again later.', 500));
    }

    res.status(200).json({token: token});

};

const updateUser = async (req,res, next) => {
    const id = req.params.id;
    const {name, password} = req.body;
    try {
        const hashedPassword = password ? bcrypt.hashSync(password,12) : null;
        const requestedUser = await User.findOne({_id: id});
    if(!requestedUser) {
        const error = new HttpError('could not find user with provided id.', 404);
        return next(error);
    }
    await User.updateOne({_id: id}, {name: name || requestedUser.name, password: hashedPassword || requestedUser.password});

    res.json({message: "Updated successfully"});
    } catch (error) {
        next(error);
    }
};

exports.getUserById = getUserById;
exports.getAllUsers = getAllUsers;
exports.createUser = createUser;
exports.loginUser = loginUser;
exports.updateUser = updateUser;