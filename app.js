const express = require('express');
const bodyParse = require('body-parser');

const usersRoutes = require('./routes/users-routes');
const itemsRoutes = require('./routes/items-routes');

const app = express();

app.use('/api/users', usersRoutes);
app.use('/api/items', itemsRoutes);

app.listen(5000);