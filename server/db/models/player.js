const mongoose = require('mongoose');

const Player = mongoose.model('Player', {
  name: {
    type: String,
    required: true,
    minlength: 3,
    trim: true
  },
  history: [{
    _match: {
      type: mongoose.Schema.Types.ObjectId,
      required: true
    },
    result: {
      type: Boolean,
      default: null
    }
  }]
});

module.exports = {Player};
