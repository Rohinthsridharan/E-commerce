// // models/User.js
// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   address: { type: String, default: '' },
//   phone: { type: String, default: '' },
//   profileImage: { type: String, default: '' },
//   role: { type: String, enum: ['user', 'artist', 'admin'], default: 'user' },
//   artistId: { type: String, unique: true, sparse: true },
// });

// module.exports = mongoose.model('User', userSchema);

const mongoose = require('mongoose');
const crypto = require('crypto');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: { type: String, default: '' },
  phone: { type: String, default: '' },
  profileImage: { type: String, default: '' },
  role: { type: String, enum: ['user', 'artist', 'admin'], default: 'user' },
  artistId: { type: String, unique: true, sparse: true },
  gmailAppPassword: { type: String }, // Encrypted app password for artists
});

// Encryption key (store this in .env)
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || '32-character-secret-key-here!!!!'; // Must be 32 characters for AES-256
const IV_LENGTH = 16; // For AES

// Encrypt gmailAppPassword before saving
userSchema.pre('save', function (next) {
  if (this.isModified('gmailAppPassword') && this.gmailAppPassword) {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), iv);
    let encrypted = cipher.update(this.gmailAppPassword);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    this.gmailAppPassword = iv.toString('hex') + ':' + encrypted.toString('hex');
  }
  next();
});

// Method to decrypt gmailAppPassword
userSchema.methods.decryptGmailAppPassword = function () {
  if (!this.gmailAppPassword) return null;
  const [iv, encryptedText] = this.gmailAppPassword.split(':');
  const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(ENCRYPTION_KEY), Buffer.from(iv, 'hex'));
  let decrypted = decipher.update(Buffer.from(encryptedText, 'hex'));
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};

module.exports = mongoose.model('User', userSchema);