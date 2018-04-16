'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ = require('./');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Roster extends _2.default {

  constructor(data) {
    super(data);
    this.relationships = [{
      type: 'participants'
    }];
  }

  get stats() {
    return this.data.attributes.stats;
  }

  set participants(participants) {
    this.rosterParticipants = participants;
    return this;
  }

  get participants() {
    return this.rosterParticipants;
  }

}
exports.default = Roster;