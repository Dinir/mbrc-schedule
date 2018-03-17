class Element {
  constructor(tag, className, content) {
    const el = document.createElement(tag);
    el.className = className? className: '';
    el.innerHTML = content? content: '';

    this._el = el;
  }

  append(childs, propertyNames) {
    if(
      !childs.length ||
      (
        propertyNames &&
        typeof propertyNames !== 'string' &&
        childs.length !== propertyNames.length
      )
    )
      return this;

    if(childs.length === 1) {
      this._el.appendChild(childs[0]._el);
      if(propertyNames) {
        if(typeof propertyNames === 'string') {
          const propertyName = propertyNames;
          if(!this[propertyName]) this[propertyName] = [];
          this[propertyName].push(childs[0]);
        } else {
          const propertyName = propertyNames[0];
          this[propertyName] = childs[0];
        }
      } else {
        const propertyName = childs[0]._el.className;
        this[propertyName] = childs[0];
      }
    } else {
      if(propertyNames) {
        if(typeof propertyNames === 'string') {
          const propertyName = propertyNames;
          if(!this[propertyName])
            this[propertyName] = [];
          while(childs.length) {
            this._el.appendChild(childs[0]._el);
            this[propertyName].push(childs.shift());
          }
        } else {
          while(childs.length) {
            this._el.appendChild(childs[0]._el);
            this[propertyNames.shift()] = childs.shift();
          }
        }
      } else {
        while(childs.length) {
          this._el.appendChild(childs[0]._el);
          this[childs[0]._el.className] = childs.shift();
        }
      }
    }
    return this;
  }
}

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

  setDate(date) {
    if(date) this.header.matchDate._el.innerText = date;
    return this;
  }

  setName(name) {
    if(name) this.header.matchName._el.innerText = name;
    return this;
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

  /**
   *
   * @param {Boolean[]} winLoses
   * @param {String[]} nextMatches
   */
  updateResult(winLoses, nextMatches) {
    for(let index = 1; index <= winLoses.length; index++) {
      this.participants[index]._el.className =
        winLoses[index-1]? 'won': 'lost';
      // this.participants[index].next._el.innerText = winLoses[index-1]? nextMatches[0]: nextMatches[1];
      this.participants[index].next._el.innerText = nextMatches[winLoses[index-1]? 0: 1];
    }
  }
}

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
}


let testMatch = new Match('LB-A');
console.log(testMatch);

let testRound = new Round(3, ['A', 'B'], ['C', 'D']);
console.log(testRound);
