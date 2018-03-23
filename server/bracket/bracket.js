const Round = require('./round.js');

class Bracket extends Element {
  constructor(rounds) {
    super('div');
    this._el.id = 'bracket';
    this.rounds = [ undefined ];

    let roundIndex = 1;
    const roundsArr = Array.from(arguments);

    while(roundsArr.length) {
      const matches = roundsArr.shift();
      this.append(
        [new Round(roundIndex++, matches[0], matches[1])],
        'rounds'
      );
    }
  }

  m(round, side, match) {
    return this
      .rounds[round][side? 'upper': 'lower'][match];
  }

  /**
   *
   * @param {Object} matchResult
   * @param {number[]} matchResult.match
   * @param {number[]} matchResult.result
   * @param {(number[]|string|null)[]} matchResult.nextMatch
   * @returns {Bracket}
   */
  updateResult(matchResult) {
    let {match, result, next} = matchResult;
    if(!result) return this;
    let currentMatch = this.m(...match);
    let winnerMatch, loserMatch;
    if(Array.isArray(next[0])) {
      winnerMatch = this.m(...next[0]);
    } else if(typeof next[0] === 'string' || next[0] === null) {
      winnerMatch = next[0];
    } else {
      return this;
    }
    if(Array.isArray(next[1])) {
      loserMatch = this.m(...next[1]);
    } else if(typeof next[1] === 'string' || next[1] === null) {
      loserMatch = next[1];
    } else {
      return this;
    }
    const winners = [];
    const losers = [];

    for(let index = 1; index <= result.length; index++) {
      const hasWon = result[index-1];
      const nextMatch = hasWon? winnerMatch: loserMatch;
      const playerFinished =
        typeof nextMatch === 'string' || nextMatch === null;
      currentMatch.participants[index]
        ._el.className = hasWon? 'won': 'lost';

      currentMatch.participants[index]
        .next._el.innerText = playerFinished?
          nextMatch: nextMatch.name;

      if(!playerFinished) {
        if(hasWon)
          winners.push(currentMatch.participants[index].id._el.innerText);
        else
          losers.push(currentMatch.participants[index].id._el.innerText);
      }
    }
    if(typeof winnerMatch !== 'string' && winnerMatch !== null)
      winners.forEach(name => {
        winnerMatch.addPlayerToEmptySlot({
          f: currentMatch.name, i: name
        });
      });
    if(typeof loserMatch !== 'string' && loserMatch !== null)
      losers.forEach(name => {
        loserMatch.addPlayerToEmptySlot({
          f: currentMatch.name, i: name
        });
      });

    return this;
  }
}