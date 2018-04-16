'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ = require('./');

var _2 = _interopRequireDefault(_);

var _skillTiers = require('./resources/skillTiers');

var _skillTiers2 = _interopRequireDefault(_skillTiers);

var _karma = require('./resources/karma');

var _karma2 = _interopRequireDefault(_karma);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Player extends _2.default {

  constructor(data) {
    super(data);
  }

  get name() {
    return this.data.attributes.name;
  }

  get shardId() {
    return this.data.attributes.shardId;
  }

  get createdAt() {
    return this.data.attributes.createdAt;
  }

  get skillTier() {
    const stats = this.raw.attributes.stats;
    return _skillTiers2.default.find(tier => tier.serverName === stats.skillTier) || null;
  }

  get karmaLevel() {
    const stats = this.raw.attributes.stats;
    return _karma2.default.find(tier => tier.serverName === stats.karmaLevel) || null;
  }

  get stats() {
    return this.raw.attributes.stats;
  }

  get titleId() {
    return this.data.attributes.titleId;
  }

}
exports.default = Player;