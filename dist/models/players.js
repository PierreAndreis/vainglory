'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ = require('./');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Players extends _2.default {

  constructor(data) {
    super(data);
    this.relationships = [{
      type: 'player'
    }];
  }

  set players(player) {
    this.playersPlayer = player;
    return this;
  }

  get players() {
    return this.playersPlayer;
  }
}
exports.default = Players;