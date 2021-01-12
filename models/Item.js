const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemchema = new Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    categories: { type: String, required: true }, //JSON array
    tags: { type: String }, //JSON array
    images: { type: [String] },
    inStock: { type: Boolean, required: true },
    price: { type: Number, required: true },
    oldPrice: { type: Number, required: false },
    stars: { type: Number, default: 0 },
    labels: { type: String, required: false }, //JSON array
    reviews: {
        type: [{
            author: { type: mongoose.Schema.Types.ObjectId, required: true },
            review: { type: String, required: true }
        }]
    },
    _id: {type: String, required: true}
});

module.exports = mongoose.model('Item', itemchema);
