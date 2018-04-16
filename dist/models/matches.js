'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _ = require('./');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Matches extends _2.default {

  constructor(data) {
    super(data);
    this.relationships = [{
      type: 'match'
    }];
  }

  set matches(match) {
    this.matchesMatch = match;
    return this;
  }

  get matches() {
    return this.matchesMatch;
  }
}
exports.default = Matches;