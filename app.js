const express = require('express');
const bodyParse = require('body-parser');

const usersRoutes = require('./routes/users-routes');
const itemsRoutes = require('./routes/items-routes');

const app = express();

app.use('/api/users', usersRoutes);
app.use('/api/items', itemsRoutes);
app.use((error, req, res, next) => {
    if(res.headerSent) return next(error);
    res.status(error.code || 500).json({message: error.message || 'An unknown error occured'});
});

app.listen(5000);