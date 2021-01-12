const ObjectId = require('mongoose').Types.ObjectId;

const Item = require('../models/Item');
const HttpError = require('../models/http-error');

const addItem = async (req, res, next) => {
    let itemData = req.body;
    const uploadedImages = req.files;
    const { name, description, categories, tags, inStock, price, oldPrice, stars, labels, reviews = null } = itemData;
    if(tags) itemData.tags = JSON.stringify(JSON.parse(tags)); //checking if JSON is valid
    if(categories) itemData.categories = JSON.stringify(JSON.parse(categories)); //checking if JSON is valid
    if(labels) itemData.labels = JSON.stringify(JSON.parse(labels)); //checking if JSON is valid

    let uploadedImagesPath;

    if(uploadedImages) uploadedImagesPath = uploadedImages.map(image => (image.destination + image.currentName));

    const itemId = name.replace(/\\<|\>|\:|\"|\/|\\|\||\?|\*|\!|\s/gm, '.'); //remove path-restricted symbols from id
    try {

        const createdItem = new Item({ 
            ...itemData, 
            _id: itemId,
        images: uploadedImagesPath 
    });

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
    const skip = req.query.skip || 0; //amount of documents to skip 
    const perPage = req.query.perPage || 999; //amount of documents to retrieve
    try {
        const result = await Item.find()/* .skip(skip).limit(perPage) */;
        console.log(result);
        res.json(result);
    } catch (e) {
        const error = new HttpError('Could not get items.', 404);
        console.log(e);
        next(error);
    }
};

const updateItem = async (req, res, next) => {
    const uploadedImages = req.files;
    const id = req.params.id;
    const itemData = req.body;
    const { name, description, categories, tags, inStock, price, oldPrice, stars, labels, reviews = null } = itemData;
    
    let uploadedImagesPath;
    if(uploadedImages) uploadedImagesPath = uploadedImages.map(image => (image.destination + image.currentName));

    try {
        const itemToUpdate = await Item.findOne({_id: id});
        if(itemToUpdate.images && itemToUpdate.images.length >= 0) itemToUpdate.images.push(...uploadedImagesPath);

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
            itemToUpdate.images = itemToUpdate.images || uploadedImagesPath;
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