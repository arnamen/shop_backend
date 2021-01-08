const jwt = require('jsonwebtoken');

const User = require('../models/User');
const HttpError = require("../models/http-error");

const checkAuth = async (req, res, next) => {
  const token = req.header.authorization.split(' ')[1];  
  if(!token) return next(new HttpError('You have to authorize to perform this action.', 401));
  const id = req.params.id;
    try {
        const decodedData = jwt.verify(token, 'root');
        const requestedUser = await User.find({_id: id});

        if(decodedData.userId !== id) return next(new HttpError('You have no access to this action.', 403));

        next();

    } catch (error) {
        return next(new HttpError('Unable to verify token. Try again later.', 500));
    }

};

module.exports = checkAuth;