const Item = require('../models/Item');

const ObjectId = require('mongoose').Types.ObjectId;

const HttpError = require('../models/http-error');

const addItem = async (req,res, next) => {
    const itemData = req.body;
    const {name = "", description, categories, tags, inStock, price, oldPrice, stars, images = null, labels, reviews = null} = itemData;
    const itemId = name.replace(/\\<|\>|\:|\"|\/|\\|\||\?|\*|\!/gm,'.'); //remove path-restricted symbols from id
    try {
        const createdItem = new Item({...itemData, _id: itemId + '_' + ObjectId()});
        const saveditem = await createdItem.save();
        res.status(201).json({id: saveditem._id});
    } catch (error) {
        console.log(error);
        next(new HttpError("Unable to create item with provided data", 400));
    }
    
}

const getItemById = async (req, res, next) => {

    const id = req.params.id;

    try {
        const requestedItem = await Item.find({_id: id});
        res.json(requestedItem);
    } catch (e) {
        const error = new HttpError('Could not find item with provided id.', 404);
        next(error);
    }

};

const getItems = async (req,res, next) => {
    const skip = req.query.skip || 0;
    const perPage = req.query.perPage || 5;
    try {
        const requestedItem = await Item.find().skip(skip).limit(perPage);
        res.json(requestedItem);
    } catch (e) {
        const error = new HttpError('Could not find item with provided id.', 404);
        next(error);
    }
};

const updateItem = (req,res, next) => {
    const id = req.params.id;
    const itemToUpdate = DUMMY_ITEMS.find(item => item.id === id);
    if(!itemToUpdate) {
        const error = new HttpError('could not find item with provided id.', 404);
        next(error);
    }
    res.json(itemToUpdate);
};

const deleteItem = (req,res, next) => {
    const id = req.params.id;
    const itemToDelete = DUMMY_ITEMS.find(item => item.id === id);
    if(!itemToDelete) {
        const error = new HttpError('could not find item with provided id.', 404);
        next(error);
    }
    DUMMY_ITEMS = DUMMY_ITEMS.filter(item => item.id !== id);
    res.json({message: 'deleted successfully', itemToDelete});
};

exports.getItemById = getItemById;
exports.getItems = getItems;
exports.updateItem = updateItem;
exports.deleteItem = deleteItem;
exports.addItem = addItem;