const Payment = require('../models/Payment');

exports.getPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate('artistId', 'artistId');
    // Flatten the response to include artistId directly
    const formattedPayments = payments.map(payment => ({
      ...payment.toObject(),
      artistId: payment.artistId ? payment.artistId.artistId : 'N/A', // Use custom artistId
    }));
    res.json(formattedPayments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.getArtistPayments = async (req, res) => {
  try {
    const payments = await Payment.find({ artistId: req.user.id }).populate('artistId', 'artistId');
    res.json(payments);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.updatePayment = async (req, res) => {
  const { status } = req.body;
  try {
    const payment = await Payment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.json(payment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.createPayment = async (req, res) => {
  const { orderId, artistId, amount } = req.body;
  try {
    const payment = new Payment({
      orderId,
      artistId, // Expecting artistId as ObjectId (_id from User)
      amount,
    });
    await payment.save();
    res.status(201).json(payment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deletePayment = async (req, res) => {
  try {
    const payment = await Payment.findByIdAndDelete(req.params.id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    res.json({ message: 'Payment deleted' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};