const express = require('express');
const bodyParse = require('body-parser');

const usersRoutes = require('./routes/users-routes');

const app = express();

app.use('/api/users', usersRoutes);

app.listen(5000);