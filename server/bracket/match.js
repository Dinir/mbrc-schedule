const moment = require('moment-timezone');

const Element = require('./element.js');

class Match extends Element {
  constructor(name) {
    super('div', 'match');

    const header = new Element('div', 'header');
    const matchDate = new Element('div', 'matchDate');
    const matchName = new Element('span', 'matchName');

    header.append([
      matchDate,
      matchName
    ]);

    const participants = new Element('div', 'participants');

    for(let index = 1; index <= 4; index++) {
      let player = new Element('div');
      player.append([
        new Element('span', 'from'),
        new Element('span', 'id'),
        new Element('span', 'next')
      ]);
      participants.append([player], [`${index}`]);
    }

    this.append([
      header,
      participants
    ]);

    if(name) this.setName(name);
  }

  setDate(date, actualDate = true) {
    if(!date) return this;
    if(!actualDate) {
      this._date = date;
      this.header.matchDate._el.innerText = date;
      return this;
    }
    this._date = moment.utc(date);
    this.header.matchDate._el.innerText =
      this._date.tz(userTimezone).format('ddd D, HH:mm');
    return this;
  }

  setName(name) {
    if(name) this.header.matchName._el.innerText = name;
    return this;
  }

  get date() {
    return this._date;
  }

  get name() {
    return this.header.matchName._el.innerText;
  }

  set(date, name) {
    this.setDate(date);
    this.setName(name);
    return this;
  }
  /**
   * update player information in the match.
   *
   * @param {object} players object about player information,
   * following the format below.
   * Every property is optional, specify the property you want to update.
   * {
   *  1: {from:String, name:String, next:String}
   *  2: {from:String, name:String, next:String}
   *  3: {from:String, name:String, next:String}
   *  4: {from:String, name:String, next:String}
   * }
   */
  updatePlayers(players) {
    for(let slot in players) {
      if(
        !players.hasOwnProperty(slot) ||
        slot < 1 || slot > 4
      ) continue;
      let player = players[slot];
      if(player.f)
        this.participants[slot]['from']._el.innerText = player.f;
      if(player.i)
        this.participants[slot].id._el.innerText = player.i;
      if(player.n)
        this.participants[slot].next._el.innerText = player.n;
      if(player.r !== undefined)
        this.participants[slot]._el.className =
          player.r? 'won': 'lost';
    }
    return this;
  }

  addPlayerToEmptySlot(player) {
    let slotToFill = 1;
    while(this.participants[slotToFill].id._el.innerText) {
      slotToFill++;
    }
    if (slotToFill > 4) return this;
    this.updatePlayers({[slotToFill]: player});
    return this;
  }

  /**
   *
   * @param {Boolean[]} winLoses
   * @param {String[]} nextMatches
   */
  updateResult(winLoses, nextMatches) {
    for(let index = 1; index <= winLoses.length; index++) {
      this.participants[index]._el.className =
        winLoses[index-1]? 'won': 'lost';
      this.participants[index].next._el.innerText = nextMatches[winLoses[index-1]? 0: 1];
    }
  }
}

module.exports = {Match};
