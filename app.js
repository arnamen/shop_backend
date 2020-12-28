const express = require('express');
const bodyParse = require('body-parser');

const HttpError = require('./models/http-error');
const usersRoutes = require('./routes/users-routes');
const itemsRoutes = require('./routes/items-routes');

const app = express();

app.use('/api/users', usersRoutes);
app.use('/api/items', itemsRoutes);

app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    return next(error);
});

app.use((error, req, res, next) => {
    if(res.headerSent) return next(error);
    res.status(error.code || 500).json({message: error.message || 'An unknown error occured'});
});

app.listen(5000);