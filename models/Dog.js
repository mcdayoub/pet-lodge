const { model, Schema } = require('mongoose');

const dogSchema = new Schema({
  name: String,
  bookedAt: String,
  walks: [
    {
      walkedAt: String,
      username: String
    }
  ],
  username: String,
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  lastWalked: String
});

module.exports = model('Dog', dogSchema);
