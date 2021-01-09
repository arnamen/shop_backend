const jwt = require('jsonwebtoken');

const User = require('../models/User');
const HttpError = require("../models/http-error");

const checkAuth = async (req, res, next) => {

    try {
        const token = req.header.authorization.split(' ')[1];
        if (!token) return next(new HttpError('You have to authorize to perform this action.', 401));
        const id = req.params.id;
        const decodedData = jwt.verify(token, 'root');

        if (decodedData.userId !== id) return next(new HttpError('You have no access to this action.', 403));

        next();

    } catch (error) {
        return next(new HttpError('Unable to authorize.', 400));
    }

};

module.exports = checkAuth;