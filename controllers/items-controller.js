
const { json } = require('body-parser');
const HttpError = require('../models/http-error');

let DUMMY_ITEMS = [
    {
        name:  'dymmy_item1',
        categories: ['dummycat-1', 'dummycat-2'],
        tags: {
            tag1: 'tag1val',
            tag2: 'tag2val'
        },
        description: 'some description',
        inStock: true,
        price: 1500,
        oldPrice: 2000,
        images: null,
        stars: 0,
        labels: ['new', 'popular'],
        id: 'dymmy_item1'
    },{
        name:  'dymmy_item2',
        categories: ['dummycat-11', 'dummycat-22'],
        tags: {
            tag1: 'tag1val',
            tag2: 'tag2val'
        },
        description: 'some description222',
        inStock: false,
        price: 2000,
        images: null,
        stars: 0,
        labels: ['popular'],
        id: 'dymmy_item2'
    }
];

const getItemById = (req, res, next) => {
    const id = req.params.id;
    const requestedItem = DUMMY_ITEMS.find(item => item.id === id);
    if(!requestedItem) {
        const error = new HttpError('could not find item with provided id.', 404);
        next(error);
    }
    res.json(requestedItem);
};

const addItem = (req,res, next) => {
    //{name, categories, tags, description, inStock, price, oldPrice, images = null, stars = 0, labels}
    const itemData = req.body;
    DUMMY_ITEMS.push(itemData);
    res.status(201).json({message: 'item created', itemData});
}

const getAllItems = (req,res, next) => {
    res.json(DUMMY_ITEMS);
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
exports.getAllItems = getAllItems;
exports.updateItem = updateItem;
exports.deleteItem = deleteItem;
exports.addItem = addItem;