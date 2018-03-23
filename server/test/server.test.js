/* eslint-disable no-undef */
const {ObjectID} = require('mongodb');
const expect = require('expect');
const request = require('supertest');

const {app} = require('../server');
const {Match} = require('../db/models/match');
const {Player} = require('../db/models/player');

const playersID = [
  new ObjectID(),
  new ObjectID()
];
const players = [
  {
    _id: playersID[0],
    name: 'player1'
  },
  {
    _id: playersID[1],
    name: 'player2'
  }
];
const matches = [
  {
    name: 'UB-F',
    matchDate: new Date(2018, 3, 24, 12, 0),
    next: {
      forWinner: 'UBSF',
      forLoser: 'LB-F'
    },
    players: [
      {_id: playersID[0]},
      {_id: playersID[1]}
    ]
  }
];

beforeEach('populatePlayers', done => {
  Player.remove({}).then(() => {
    return Player.insertMany(players);
  }).then(() => done());
});
beforeEach('populateMatches', done => {
  Match.remove({}).then(() => {
    return Match.insertMany(matches);
  }).then(() => done());
});

it('makes new matches and put winners and losers to each match', done => {
  const result = [false, true];

  Match.findOneAndUpdate({
    name: 'UB-F'
  }, {$set: {
    'players.0.result': result[0],
    'players.1.result': result[1]
  }}, {new: true}).then(
    match => {
      if(!match)
        done(e);
      expect(match.players[0].result).toBe(true);
      expect(match.players[1].result).toBe(false);

      Match.findOne({
        name: match.next.forWinner
      }).then(nextMatch => {
        if(!nextMath) {

        }
      })
    }).catch(e => done(e));
});
