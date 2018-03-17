'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Element = function () {
  function Element(tag, className, content) {
    _classCallCheck(this, Element);

    var el = document.createElement(tag);
    el.className = className ? className : '';
    el.innerHTML = content ? content : '';

    this._el = el;
  }

  _createClass(Element, [{
    key: 'append',
    value: function append(childs, propertyNames) {
      if (!childs.length || propertyNames && typeof propertyNames !== 'string' && childs.length !== propertyNames.length) return this;

      if (childs.length === 1) {
        this._el.appendChild(childs[0]._el);
        if (propertyNames) {
          if (typeof propertyNames === 'string') {
            var propertyName = propertyNames;
            if (!this[propertyName]) this[propertyName] = [];
            this[propertyName].push(childs[0]);
          } else {
            var _propertyName = propertyNames[0];
            this[_propertyName] = childs[0];
          }
        } else {
          var _propertyName2 = childs[0]._el.className;
          this[_propertyName2] = childs[0];
        }
      } else {
        if (propertyNames) {
          if (typeof propertyNames === 'string') {
            var _propertyName3 = propertyNames;
            if (!this[_propertyName3]) this[_propertyName3] = [];
            while (childs.length) {
              this._el.appendChild(childs[0]._el);
              this[_propertyName3].push(childs.shift());
            }
          } else {
            while (childs.length) {
              this._el.appendChild(childs[0]._el);
              this[propertyNames.shift()] = childs.shift();
            }
          }
        } else {
          while (childs.length) {
            this._el.appendChild(childs[0]._el);
            this[childs[0]._el.className] = childs.shift();
          }
        }
      }
      return this;
    }
  }]);

  return Element;
}();

var Match = function (_Element) {
  _inherits(Match, _Element);

  function Match(name) {
    _classCallCheck(this, Match);

    var _this = _possibleConstructorReturn(this, (Match.__proto__ || Object.getPrototypeOf(Match)).call(this, 'div', 'match'));

    var header = new Element('div', 'header');
    var matchDate = new Element('div', 'matchDate');
    var matchName = new Element('span', 'matchName');

    header.append([matchDate, matchName]);

    var participants = new Element('div', 'participants');

    for (var index = 1; index <= 4; index++) {
      var player = new Element('div');
      player.append([new Element('span', 'from'), new Element('span', 'id'), new Element('span', 'next')]);
      participants.append([player], ['' + index]);
    }

    _this.append([header, participants]);

    if (name) _this.setName(name);
    return _this;
  }

  _createClass(Match, [{
    key: 'setDate',
    value: function setDate(date) {
      if (date) this.header.matchDate._el.innerText = date;
      return this;
    }
  }, {
    key: 'setName',
    value: function setName(name) {
      if (name) this.header.matchName._el.innerText = name;
      return this;
    }
  }, {
    key: 'set',
    value: function set(date, name) {
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

  }, {
    key: 'updatePlayers',
    value: function updatePlayers(players) {
      for (var slot in players) {
        if (!players.hasOwnProperty(slot) || slot < 1 || slot > 4) continue;
        var player = players[slot];
        if (player.f) this.participants[slot]['from']._el.innerText = player.f;
        if (player.i) this.participants[slot].id._el.innerText = player.i;
        if (player.n) this.participants[slot].next._el.innerText = player.n;
        if (player.r !== undefined) this.participants[slot]._el.className = player.r ? 'won' : 'lost';
      }
      return this;
    }

    /**
     *
     * @param {Boolean[]} winLoses
     * @param {String[]} nextMatches
     */

  }, {
    key: 'updateResult',
    value: function updateResult(winLoses, nextMatches) {
      for (var index = 1; index <= winLoses.length; index++) {
        this.participants[index]._el.className = winLoses[index - 1] ? 'won' : 'lost';
        // this.participants[index].next._el.innerText = winLoses[index-1]? nextMatches[0]: nextMatches[1];
        this.participants[index].next._el.innerText = nextMatches[winLoses[index - 1] ? 0 : 1];
      }
    }
  }]);

  return Match;
}(Element);

var Round = function (_Element2) {
  _inherits(Round, _Element2);

  function Round(roundIndex, upperMatchNames, lowerMatchNames) {
    _classCallCheck(this, Round);

    var _this2 = _possibleConstructorReturn(this, (Round.__proto__ || Object.getPrototypeOf(Round)).call(this, 'div', 'round'));

    _this2._el.id = 'round' + String(roundIndex).padStart(2, '0');

    _this2.append([new Element('div', 'roundNumber', 'Round ' + roundIndex)]);

    var upperMatches = new Element('div', 'matches upper');
    for (var index = 1; index <= upperMatchNames.length; index++) {
      var matchName = upperMatchNames[index - 1];
      upperMatches.append([new Match(matchName)], ['' + index]);
    }
    var lowerMatches = new Element('div', 'matches lower');
    for (var _index = 1; _index <= lowerMatchNames.length; _index++) {
      var _matchName = lowerMatchNames[_index - 1];
      lowerMatches.append([new Match(_matchName)], ['' + _index]);
    }

    _this2.append([upperMatches, lowerMatches], ['upper', 'lower']);
    return _this2;
  }

  return Round;
}(Element);

var Bracket = function (_Element3) {
  _inherits(Bracket, _Element3);

  function Bracket(rounds) {
    _classCallCheck(this, Bracket);

    var _this3 = _possibleConstructorReturn(this, (Bracket.__proto__ || Object.getPrototypeOf(Bracket)).call(this, 'div'));

    _this3._el.id = 'bracket';
    _this3.rounds = [undefined];

    var roundIndex = 1;
    var roundsArr = Array.from(arguments);

    while (roundsArr.length) {
      var matches = roundsArr.shift();
      _this3.append([new Round(roundIndex++, matches[0], matches[1])], 'rounds');
    }
    return _this3;
  }

  _createClass(Bracket, [{
    key: 'm',
    value: function m(round, side, match) {
      return this.rounds[round][side ? 'upper' : 'lower'][match];
    }
  }]);

  return Bracket;
}(Element);

var testMatch = new Match('LB-A');
console.log(testMatch);

var testRound = new Round(3, ['A', 'B'], ['C', 'D']);
console.log(testRound);
//# sourceMappingURL=initBracket.js.map