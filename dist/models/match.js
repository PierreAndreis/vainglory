'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _gameModes = require('./resources/gameModes');

var _gameModes2 = _interopRequireDefault(_gameModes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Match extends _2.default {

  constructor(data) {
    super(data);
    this.relationships = [{
      type: 'rosters'
    }, {
      type: 'assets'
    }];
  }

  get createdAt() {
    return this.data.attributes.createdAt;
  }

  get duration() {
    return this.data.attributes.duration;
  }

  get _gameMode() {
    return this.data.attributes.gameMode;
  }

  get gameMode() {
    const normalizedGameMode = _gameModes2.default.find(mode => mode.serverName === this._gameMode);
    return normalizedGameMode ? normalizedGameMode.name : this._gameMode;
  }

  get patchVersion() {
    return this.data.attributes.patchVersion;
  }

  get shardId() {
    return this.data.attributes.shardId;
  }

  get stats() {
    return this.data.attributes.stats;
  }

  get titleId() {
    return this.data.attributes.titleId;
  }

  set rosters(rosters) {
    this.matchRoster = rosters;
    return this;
  }

  get rosters() {
    return this.matchRoster;
  }
}
exports.default = Match;