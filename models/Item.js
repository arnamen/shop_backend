const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  categories: {type: [String], required: true},
  tags: {type: mongoose.Schema.Types.Mixed}, //объект произвольных тегов (название - значение)
  imagesPath: { type: [String] },
  inStock: {type: Boolean, required: true},
  price: {type: Number, required: true},
  oldPrice: {type: Number, required: false},
  stars: {type: Number, required: true},
  labels: {type: [String], required: false},
});

module.exports = mongoose.model('Place', placeSchema);
