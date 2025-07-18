// const Product = require('../models/Product');

// exports.getProducts = async (req, res) => {
//   try {
//     const products = await Product.find().populate('artistId', 'name');
//     res.json(products);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.createProduct = async (req, res) => {
//   const { name, price } = req.body;
//   const image = req.file ? `/uploads/${req.file.filename}` : null;

//   try {
//     if (!name || !price) {
//       return res.status(400).json({ message: 'Name and price are required' });
//     }

//     const product = new Product({
//       name,
//       price,
//       image, // Path includes original extension
//       artistId: req.user.id,
//     });

//     await product.save();
//     res.status(201).json(product);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

const Product = require('../models/Product');

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find().populate('artistId', 'name');
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createProduct = async (req, res) => {
  const { name, price , category } = req.body;
  const image = req.file ? `/uploads/${req.file.filename}` : null;

  try {
    if (!name || !price || !category || !req.file) {
      return res.status(400).json({ message: 'Name, price, category and image are required' });
    }

    const product = new Product({
      name,
      price,
      image, // Path includes original extension
      artistId: req.user.id,
      category, // Added category to product creation
    });

    await product.save();
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getArtistProducts = async (req, res) => {
  try {
    const products = await Product.find({ artistId: req.user.id }).populate('artistId', 'name');
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};