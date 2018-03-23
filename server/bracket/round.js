const Element = require('./element.js');
const Match = require('./match.js');

class Round extends Element {
  constructor(roundIndex, upperMatchNames, lowerMatchNames) {
    super('div', 'round');
    this._el.id =
      `round${String(roundIndex).padStart(2, '0')}`;

    this.append([
      new Element('div', 'roundNumber', `Round ${roundIndex}`)
    ]);

    const upperMatches = new Element('div', 'matches upper');
    for(let index = 1; index <= upperMatchNames.length; index++) {
      const matchName = upperMatchNames[index-1];
      upperMatches.append([new Match(matchName)], [`${index}`]);
    }
    const lowerMatches = new Element('div', 'matches lower');
    for(let index = 1; index <= lowerMatchNames.length; index++) {
      const matchName = lowerMatchNames[index-1];
      lowerMatches.append([new Match(matchName)], [`${index}`]);
    }

    this.append(
      [upperMatches, lowerMatches],
      ['upper', 'lower']
    );
  }
}

module.exports = {Round};
