'use strict';

var _api = require('./api');

var _api2 = _interopRequireDefault(_api);

var _Http = require('./Http');

var _Http2 = _interopRequireDefault(_Http);

var _Utils = require('./Utils');

var _Utils2 = _interopRequireDefault(_Utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Vainglory {
  constructor(apiKey = null, options = {}) {
    if (!apiKey) {
      throw new Error('Missing API Key.');
    }

    const api = new _api2.default(new _Http2.default(apiKey, options));
    api.bindTo(this);
    this.models = _Utils2.default.models;
  }

}

module.exports = Vainglory;