const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true },
  surname: { type: String},
  phoneNumber: {type: String},
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, minlength: 6 },
  history: [{ type: mongoose.Types.ObjectId, ref: 'Item' }],
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);
