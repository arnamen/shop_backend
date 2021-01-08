const ObjectId = require('mongoose').Types.ObjectId;

const Item = require('../models/Item');
const HttpError = require('../models/http-error');

const addItem = async (req, res, next) => {
    const itemData = req.body;
    const { name = "", description, categories, tags, inStock, price, oldPrice, stars, images = null, labels, reviews = null } = itemData;
    const itemId = name.replace(/\\<|\>|\:|\"|\/|\\|\||\?|\*|\!/gm, '.'); //remove path-restricted symbols from id
    try {
        const createdItem = new Item({ ...itemData, _id: itemId + '_' + ObjectId() });
        const saveditem = await createdItem.save();
        res.status(201).json({ id: saveditem._id });
    } catch (error) {
        console.log(error);
        next(new HttpError("Unable to create item with provided data", 400));
    }

}

const getItemById = async (req, res, next) => {

    const id = req.params.id;

    try {
        const requestedItem = await Item.find({ _id: id });
        res.json(requestedItem);
    } catch (e) {
        const error = new HttpError('Could not find item with provided id.', 404);
        next(error);
    }

};

const getItems = async (req, res, next) => {
    const skip = req.query.skip || 2; //amount of documents to skip 
    const perPage = req.query.perPage || 5; //amount of documents to retrieve
    try {
        const requestedItem = await Item.find().skip(skip).limit(perPage);
        res.json(requestedItem);
    } catch (e) {
        const error = new HttpError('Could not find item with provided id.', 404);
        next(error);
    }
};

const updateItem = async (req, res, next) => {
    console.log(req.files);
    const id = req.params.id;
    const itemData = req.body;
    const { name, description, categories, tags, inStock, price, oldPrice, stars, images = null, labels, reviews = null } = itemData;
    
    try {
        const itemToUpdate = await Item.findOne({_id: id});

        if (!itemToUpdate) {
            const error = new HttpError('could not find item with provided id.', 404);
            next(error);
        }

            itemToUpdate.name = name || itemToUpdate.name;
            itemToUpdate.description = description || itemToUpdate.description;
            itemToUpdate.categories = categories || itemToUpdate.categories;
            itemToUpdate.tags = tags || itemToUpdate.tags;
            itemToUpdate.inStock = inStock || itemToUpdate.inStock;
            itemToUpdate.price = price || itemToUpdate.price;
            itemToUpdate.oldPrice = oldPrice || itemToUpdate.oldPrice;
            itemToUpdate.stars = stars || itemToUpdate.stars;
            itemToUpdate.images = images || itemToUpdate.images;
            itemToUpdate.labels = labels || itemToUpdate.labels;
            itemToUpdate.reviews = reviews || itemToUpdate.reviews;

        const updatedItem = await itemToUpdate.save();
        return res.json(updatedItem);
    } catch (e) {
        console.log(e);
        const error = new HttpError('Failed to update item with provided id.', 400);
        return next(error);
    }

};

const deleteItem = async (req, res, next) => {

    const id = req.params.id;
    let result;

    try {
        result = await Item.deleteOne({_id: id});
    } catch (e) {
        console.log(e);
        const error = new HttpError('Failed to delete item with provided id.', 400);
        return next(error);
    }


    res.json(result);
};

exports.getItemById = getItemById;
exports.getItems = getItems;
exports.updateItem = updateItem;
exports.deleteItem = deleteItem;
exports.addItem = addItem;