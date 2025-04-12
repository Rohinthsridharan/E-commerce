// const mongoose = require('mongoose');

// const orderSchema = new mongoose.Schema({
//   customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Updated to ObjectId with ref
//   productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
//   artistId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
//   address: { type: String, required: true },
//   total: { type: Number, required: true },
//   description: { type: String },
//   pictureUrl: { type: String, default: null },
//   proofUrl: { type: String, default: null },
//   status: { type: String, enum: ['pending', 'in_progress', 'completed'], default: 'pending' },
//   createdAt: { type: Date, default: Date.now },
// });

// const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
// module.exports = Order;

const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Kept as is
  address: { type: String, required: true }, // Added address field
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  artistId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  total: { type: Number, required: true },
  description: { type: String },
  pictureUrl: { type: String, default: null },
  proofUrl: { type: String, default: null },
  status: { type: String, enum: ['pending', 'in_progress', 'completed'], default: 'pending' },
  createdAt: { type: Date, default: Date.now },
  // In orderSchema add:
  trackingId: { type: String, default: null },
  trackingLink: { type: String, default: null },
});

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
module.exports = Order;