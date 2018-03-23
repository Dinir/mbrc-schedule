const mongoose = require('mongoose');

const MatchSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  matchDate: {
    type: Date,
    required: true
  },
  next: {
    forWinner: {
      type: String,
      default: null
    },
    forLoser: {
      type: String,
      default: null
    }
  },
  players: [{
    _id: mongoose.Schema.Types.ObjectId,
    point: {
      type: Number,
      default: 0
    },
    result: {
      type: Boolean,
      default: null
    }
  }]
});

MatchSchema.post('update', function(next) {
  const match = this;

  if(match.isModified('players.result')) {
    console.log(`${this} has been modified.`);
  }
  next();
});

const Match = mongoose.model('Match', MatchSchema);

module.exports = {Match};
