'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _package = require('../../package.json');

var _package2 = _interopRequireDefault(_package);

var _matches = require('./matches');

var _matches2 = _interopRequireDefault(_matches);

var _players = require('./players');

var _players2 = _interopRequireDefault(_players);

var _tournament = require('./tournament');

var _tournament2 = _interopRequireDefault(_tournament);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Api {
  constructor(http) {
    this.http = http;
  }

  status() {
    return new Promise((resolve, reject) => {
      this.http.status().then(res => res.json()).then(body => {
        if (body && body.data) {
          return resolve({
            id: body.data.id,
            releasedAt: body.data.attributes.releasedAt,
            version: body.data.attributes.version,
            clientVersion: _package2.default.version });
        }
        return resolve(body);
      }).catch(err => {
        reject(err);
      });
    });
  }

  setRegion(context, region) {
    this.http.region = region;
    return context;
  }

  region(context, region) {
    this.http.tempRegion = region;
    return context;
  }

  bindTo(context) {
    // Overwrites region
    context.setRegion = this.setRegion.bind(this, context);
    // Temporarily sets region for current call
    context.region = this.region.bind(this, context);
    context.status = this.status.bind(this);

    context.matches = (0, _matches2.default)(this.http);
    context.players = (0, _players2.default)(this.http);
    context.tournament = (0, _tournament2.default)(this.http);
  }

}
exports.default = Api;