const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect(process.env.MONGODB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(async () => {
  const artists = await User.find({ role: 'artist', artistId: { $exists: false } });
  let counter = 1;
  for (const artist of artists) {
    artist.artistId = `AA${String(counter).padStart(4, '0')}`;
    await artist.save();
    counter++;
  }
  console.log('Artists updated with artistId');
  mongoose.connection.close();
}).catch(err => console.error(err));