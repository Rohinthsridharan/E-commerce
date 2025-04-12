// const bcrypt = require('bcryptjs');
// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// exports.register = async (req, res) => {
//   const { name, email, password, role } = req.body;
//   try {
//     const hashedPassword = await bcrypt.hash(password, 10);
//     const user = new User({ name, email, password: hashedPassword, role: role || 'user' });
//     await user.save();
//     const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.status(201).json({ token, role: user.role });
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// exports.login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user || !await bcrypt.compare(password, user.password)) {
//       return res.status(400).json({ message: 'Invalid credentials' });
//     }
//     const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.json({ token, role: user.role });
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// // exports.getArtists = async (req, res) => {
// //   try {
// //     const artists = await User.find({ role: 'artist' });
// //     res.json(artists);
// //   } catch (err) {
// //     res.status(500).json({ message: err.message });
// //   }
// // };

// exports.getArtists = async (req, res) => {
//   try {
//     const artists = await User.find({ role: 'artist' }).select('-password');
//     res.json(artists);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // exports.registerArtist = async (req, res) => {
// //   const { name, email, password } = req.body;
// //   try {
// //     const hashedPassword = await bcrypt.hash(password, 10);
// //     const user = new User({ name, email, password: hashedPassword, role: 'artist' });
// //     await user.save();
// //     res.status(201).json({ user });
// //   } catch (err) {
// //     res.status(400).json({ message: err.message });
// //   }
// // };

// exports.registerArtist = async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     // Check if email already exists
//     const userExists = await User.findOne({ email });
//     if (userExists) {
//       return res.status(400).json({ message: 'Email already in use' });
//     }

//     // Generate custom artistId (e.g., AA0001)
//     const lastArtist = await User.findOne({ role: 'artist' }).sort({ artistId: -1 });
//     let newArtistId = 'AA0001';
//     if (lastArtist && lastArtist.artistId) {
//       const lastIdNum = parseInt(lastArtist.artistId.slice(2), 10);
//       newArtistId = `AA${String(lastIdNum + 1).padStart(4, '0')}`;
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create new artist
//     const user = new User({
//       name,
//       email,
//       password: hashedPassword,
//       role: 'artist',
//       artistId: newArtistId,
//     });
//     await user.save();

//     res.status(201).json({ user });
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// // controllers/authController.js
// const multer = require('multer');
// const path = require('path');

// // Configure multer for file upload
// const storage = multer.diskStorage({
//   destination: './uploads/',
//   filename: (req, file, cb) => {
//     cb(null, `${req.user.id}-${Date.now()}${path.extname(file.originalname)}`);
//   }
// });

// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 5000000 }, // 5MB limit
//   fileFilter: (req, file, cb) => {
//     const filetypes = /jpeg|jpg|png/;
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//     const mimetype = filetypes.test(file.mimetype);
//     if (extname && mimetype) {
//       return cb(null, true);
//     }
//     cb('Error: Images only (jpeg, jpg, png)!');
//   }
// }).single('profileImage');

// exports.getProfile = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id).select('-password');
//     if (!user) return res.status(404).json({ message: 'User not found' });
//     res.json(user);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// exports.updateProfile = async (req, res) => {
//   upload(req, res, async (err) => {
//     if (err) {
//       return res.status(400).json({ message: err });
//     }
//     try {
//       const { name, address, phone } = req.body;
//       const user = await User.findById(req.user.id);
      
//       if (!user) return res.status(404).json({ message: 'User not found' });
      
//       user.name = name || user.name;
//       user.address = address || user.address;
//       user.phone = phone || user.phone;
//       if (req.file) {
//         user.profileImage = `/uploads/${req.file.filename}`;
//       }
      
//       await user.save();
//       res.json({
//         name: user.name,
//         email: user.email,
//         address: user.address,
//         phone: user.phone,
//         profileImage: user.profileImage
//       });
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
//   });
// };

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const multer = require('multer');
const path = require('path');

// Configure multer for file upload (unchanged)
const storage = multer.diskStorage({
  destination: './uploads/',
  filename: (req, file, cb) => {
    cb(null, `${req.user.id}-${Date.now()}${path.extname(file.originalname)}`);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5000000 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    if (extname && mimetype) {
      return cb(null, true);
    }
    cb('Error: Images only (jpeg, jpg, png)!');
  }
}).single('profileImage');

exports.register = async (req, res) => {
  const { name, email, password, role } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword, role: role || 'user' });
    await user.save();
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(201).json({ token, role: user.role });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token, role: user.role });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getArtists = async (req, res) => {
  try {
    const artists = await User.find({ role: 'artist' }).select('-password');
    res.json(artists);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.registerArtist = async (req, res) => {
  const { name, email, password, gmailAppPassword } = req.body; // Added gmailAppPassword
  try {
    // Check if email already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Generate custom artistId (e.g., AA0001)
    const lastArtist = await User.findOne({ role: 'artist' }).sort({ artistId: -1 });
    let newArtistId = 'AA0001';
    if (lastArtist && lastArtist.artistId) {
      const lastIdNum = parseInt(lastArtist.artistId.slice(2), 10);
      newArtistId = `AA${String(lastIdNum + 1).padStart(4, '0')}`;
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new artist
    const user = new User({
      name,
      email,
      password: hashedPassword,
      role: 'artist',
      artistId: newArtistId,
      gmailAppPassword, // Will be encrypted by pre-save hook
    });
    await user.save();

    // Return user details without sensitive info
    res.status(201).json({
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        artistId: user.artistId,
      }
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updateProfile = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: err });
    }
    try {
      const { name, address, phone } = req.body;
      const user = await User.findById(req.user.id);
      
      if (!user) return res.status(404).json({ message: 'User not found' });
      
      user.name = name || user.name;
      user.address = address || user.address;
      user.phone = phone || user.phone;
      if (req.file) {
        user.profileImage = `/uploads/${req.file.filename}`;
      }
      
      await user.save();
      res.json({
        name: user.name,
        email: user.email,
        address: user.address,
        phone: user.phone,
        profileImage: user.profileImage
      });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
};

// In authController.js
exports.updateArtist = async (req, res) => {
  const { name, email, password, gmailAppPassword } = req.body;
  try {
    const user = await User.findById(req.params.id);
    if (!user || user.role !== 'artist') {
      return res.status(404).json({ message: 'Artist not found' });
    }

    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return res.status(400).json({ message: 'Email already in use' });
      }
      user.email = email;
    }

    user.name = name || user.name;
    if (password) user.password = await bcrypt.hash(password, 10);
    if (gmailAppPassword) user.gmailAppPassword = gmailAppPassword; // Will be encrypted by pre-save hook

    await user.save();
    res.json({
      user: { _id: user._id, name: user.name, email: user.email, artistId: user.artistId }
    });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};