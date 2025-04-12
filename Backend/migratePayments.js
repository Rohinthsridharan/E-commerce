const mongoose = require('mongoose');
const Payment = require('./models/Payment');
const User = require('./models/User');

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  const payments = await Payment.find();
  for (const payment of payments) {
    const user = await User.findById(payment.artistId);
    if (user && user.artistId) {
      payment.artistId = user.artistId; // Replace ObjectId with custom artistId
      await payment.save();
    }
  }
  console.log('Payments updated with custom artistId');
  mongoose.connection.close();
}).catch(err => console.error(err));