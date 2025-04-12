// // File: Backend/controllers/orderController.js
// const Order = require('../models/Order');
// const Payment = require('../models/Payment');
// const Product = require('../models/Product');


// exports.getOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({ customer: req.user.id })
//       .populate('productId');
//     const validOrders = orders.filter(order => order.productId && order.productId.name && typeof order.total === 'number');
//     res.json(validOrders);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.getArtistOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({ artistId: req.user.id })
//       .populate('productId', 'name');
//     res.json(orders);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.getAdminOrders = async (req, res) => {
//   try {
//     const orders = await Order.find()
//       .populate('productId')
//       .populate('artistId', '_id') // Only fetch _id for artistId
//       .populate('customer', '_id'); // Only fetch _id for customer

//     // Add custom formatted IDs to the response
//     const formattedOrders = orders.map((order, index) => {
//       const customerIndex = String(index + 1).padStart(2, '0'); // e.g., 01, 02
//       const artistIndex = String(index + 1).padStart(4, '0'); // e.g., 0001, 0002
//       return {
//         ...order._doc, // Spread the original order document
//         customerDisplayId: `customer${customerIndex}`, // e.g., customer01
//         artistDisplayId: `AA${artistIndex}`, // e.g., AA0001
//       };
//     });

//     res.json(formattedOrders);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.createOrder = async (req, res) => {
//   const { productId, total, description, address } = req.body; // Added address
//   const pictureUrl = req.file ? `/uploads/${req.file.filename}` : null;
//   try {
//     const product = await Product.findById(productId);
//     if (!product) return res.status(404).json({ message: 'Product not found' });

//     const order = new Order({
//       customer: req.user.id, // Kept customer
//       address, // Added address
//       productId,
//       artistId: product.artistId,
//       total,
//       description,
//       pictureUrl,
//     });
//     await order.save();

//     const payment = new Payment({
//       orderId: order._id,
//       artistId: product.artistId,
//       amount: total * 0.82,
//     });
//     await payment.save();

//     res.status(201).json(order);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// exports.updateOrder = async (req, res) => {
//   const { status, trackingId, trackingLink } = req.body;
//   try {
//     const updateData = {};
//     if (status) updateData.status = status;
//     if (trackingId) updateData.trackingId = trackingId;
//     if (trackingLink) updateData.trackingLink = trackingLink;

//     const order = await Order.findByIdAndUpdate(
//       req.params.id,
//       updateData,
//       { new: true }
//     );
//     res.json(order);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// exports.deleteOrder = async (req, res) => {
//   try {
//     await Order.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Order deleted' });
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// exports.uploadProof = async (req, res) => {
//   const proofUrl = req.file ? `/uploads/${req.file.filename}` : null;
//   try {
//     const order = await Order.findByIdAndUpdate(req.params.id, { proofUrl }, { new: true });
//     res.json(order);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

const Order = require('../models/Order');
const Payment = require('../models/Payment');
const Product = require('../models/Product');
const User = require('../models/User');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Helper function to create Nodemailer transporter dynamically
const createTransporter = (artistEmail, artistPassword) => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: artistEmail,
      pass: artistPassword,
    },
  });
};

// Helper function to format IDs based on index
const formatIds = (order, index) => {
  const orderIndex = String(index + 1).padStart(4, '0');
  const customerIndex = String(index + 1).padStart(2, '0');
  const artistIndex = String(index + 1).padStart(4, '0');
  return {
    ...order._doc,
    orderDisplayId: `ORDER${orderIndex}`,
    customerDisplayId: `customer${customerIndex}`,
    artistDisplayId: `AA${artistIndex}`,
  };
};

// Send email to admin and customer
const sendTrackingEmail = async (order, artist, customerEmail) => {
  if (!artist || !artist.email || !artist.gmailAppPassword) {
    console.error('Artist email or app password missing');
    return;
  }

  const plaintextPassword = artist.decryptGmailAppPassword();
  if (!plaintextPassword) {
    console.error('Failed to decrypt artist Gmail app password');
    return;
  }

  const transporter = createTransporter(artist.email, plaintextPassword);

  const mailOptions = {
    from: `${artist.name} <${artist.email}>`,
    to: `${process.env.ADMIN_EMAIL}${customerEmail ? ',' + customerEmail : ''}`, // Include customer email if available
    cc: artist.email,
    subject: `Order ${order.orderDisplayId} - Tracking Information Updated`,
    text: `
      Dear Admin${customerEmail ? ' and Customer' : ''},

      The tracking information for Order ${order.orderDisplayId} has been updated by the artist (${order.artistDisplayId}):
      - Tracking ID: ${order.trackingId || 'N/A'}
      - Tracking Link: ${order.trackingLink || 'N/A'}
      - Status: ${order.status || 'N/A'}
      - Product: ${order.productId?.name || 'N/A'}

      Regards,
      ${artist.name} 
      (${artist.email})
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email sent to admin and ${customerEmail || 'no customer'} from ${artist.email}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.user.id }).populate('productId');
    const validOrders = orders.filter(order => order.productId && order.productId.name && typeof order.total === 'number');
    const formattedOrders = validOrders.map((order, index) => formatIds(order, index));
    res.json(formattedOrders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getArtistOrders = async (req, res) => {
  try {
    const orders = await Order.find({ artistId: req.user.id }).populate('productId', 'name');
    const formattedOrders = orders.map((order, index) => formatIds(order, index));
    res.json(formattedOrders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getAdminOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate('productId')
      .populate('artistId', 'name email') // No need for gmailAppPassword here
      .populate('customer', '_id');
    const formattedOrders = orders.map((order, index) => formatIds(order, index));
    res.json(formattedOrders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createOrder = async (req, res) => {
  const { productId, total, description, address } = req.body;
  const pictureUrl = req.file ? `/uploads/${req.file.filename}` : null;
  try {
    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const order = new Order({
      customer: req.user.id,
      address,
      productId,
      artistId: product.artistId,
      total,
      description,
      pictureUrl,
    });
    await order.save();

    const payment = new Payment({
      orderId: order._id,
      artistId: product.artistId,
      amount: total * 0.82,
    });
    await payment.save();

    const allOrders = await Order.find().sort({ createdAt: 1 });
    const orderIndex = allOrders.findIndex(o => o._id.toString() === order._id.toString());
    const formattedOrder = formatIds(order, orderIndex);
    res.status(201).json(formattedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.updateOrder = async (req, res) => {
  const { status, trackingId, trackingLink } = req.body;
  try {
    const updateData = {};
    if (status) updateData.status = status;
    if (trackingId) updateData.trackingId = trackingId;
    if (trackingLink) updateData.trackingLink = trackingLink;

    const order = await Order.findByIdAndUpdate(req.params.id, updateData, { new: true })
      .populate('productId', 'name')
      .populate('artistId', 'name email gmailAppPassword')
      .populate('customer', 'email'); // Populate customer email
    if (!order) return res.status(404).json({ message: 'Order not found' });

    const allOrders = await Order.find().sort({ createdAt: 1 });
    const orderIndex = allOrders.findIndex(o => o._id.toString() === order._id.toString());
    const formattedOrder = formatIds(order, orderIndex);

    if (trackingId || trackingLink) {
      const artist = order.artistId;
      const customerEmail = order.customer?.email || '';
      await sendTrackingEmail(formattedOrder, artist, customerEmail);
    }

    res.json(formattedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteOrder = async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.json({ message: 'Order deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.uploadProof = async (req, res) => {
  const proofUrl = req.file ? `/uploads/${req.file.filename}` : null;
  try {
    const order = await Order.findByIdAndUpdate(req.params.id, { proofUrl }, { new: true });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    const allOrders = await Order.find().sort({ createdAt: 1 });
    const orderIndex = allOrders.findIndex(o => o._id.toString() === order._id.toString());
    const formattedOrder = formatIds(order, orderIndex);
    res.json(formattedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};