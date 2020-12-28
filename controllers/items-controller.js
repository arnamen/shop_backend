
const HttpError = require('../models/http-error');

const DUMMY_ITEMS = [
    {
        id: '1',
        name: 'p1'
    },{
        id: '2',
        name: 'p2'
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
    
}

const getAllItems = (req,res, next) => {
    const encoded = btoa(JSON.stringify(DUMMY_ITEMS));
    console.log(encoded.length);
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
    res.json(itemToDelete);
};

exports.getItemById = getItemById;
exports.getAllItems = getAllItems;
exports.updateItem = updateItem;
exports.deleteItem = deleteItem;
exports.addItem = addItem;