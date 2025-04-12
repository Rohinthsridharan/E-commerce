const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, default: null }, // Changed to optional
  artistId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  category:{ type: String, required: true },
  
});

module.exports = mongoose.model('Product', productSchema);