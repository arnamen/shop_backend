const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');

const HttpError = require('./models/http-error');
const usersRoutes = require('./routes/users-routes');
const itemsRoutes = require('./routes/items-routes');

const app = express();
app.use(express.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, DELETE');
    
  
    next();
  });
app.get('/uploads/items/:itemId/images/:image', (req, res) => {
    const itemId = req.params.itemId;
    const image = req.params.image;
    const imagePath = path.join(__dirname, '/uploads/items/', itemId, '/images/', image);
    
    if(fs.existsSync(imagePath)) {
        return res.sendFile(imagePath);
    }
    res.status(404).send();
});
app.use('/api/users', usersRoutes);
app.use('/api/items', itemsRoutes);

app.use((req, res, next) => {
    const error = new HttpError('Could not find this route.', 404);
    return next(error);
});

app.use((error, req, res, next) => {
    if (res.headerSent) return next(error);
    console.log(error);
    res.status(error.code || 500).json({ message: error.message || 'An unknown error occured' });
});

mongoose
    .connect(
        `mongodb+srv://root:1325467a@cluster0.xesan.mongodb.net/drawerShopDB?retryWrites=true&w=majority`, 
        { useNewUrlParser: true, useUnifiedTopology: true }
    )
    .then(() => {
        app.listen(5000);
    })
    .catch(err => {
        console.log(err);
    });