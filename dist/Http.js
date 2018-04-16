'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _isPlainObject = require('lodash/isPlainObject');

var _isPlainObject2 = _interopRequireDefault(_isPlainObject);

var _Errors = require('./Errors');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const defaults = {
  host: 'https://api.dc01.gamelockerapp.com/shards/',
  region: 'na',
  statusUrl: 'https://api.dc01.gamelockerapp.com/status',
  title: 'semc-vainglory'
};

class Http {
  constructor(apiKey = null, options = defaults) {
    const requestOptions = Object.assign({}, defaults, options);
    this._tempRegion = null;
    this._region = requestOptions.region.toLowerCase(), this.options = {
      url: `${requestOptions.host}`,
      status: requestOptions.statusUrl,
      headers: {
        'Content-Encoding': 'gzip',
        'Content-Type': 'application/json',
        'User-Agent': 'js/vainglory',
        Accept: 'application/vnd.api+json',
        Authorization: `Bearer ${apiKey}`,
        'X-TITLE-ID': requestOptions.title
      }
    };
  }

  getRequestedRegion() {
    return this.tempRegion ? this.tempRegion : this.region;
  }

  set tempRegion(newTempRegion) {
    this._tempRegion = newTempRegion;
    return this;
  }

  get tempRegion() {
    return this._tempRegion;
  }

  set region(newRegion) {
    this._region = newRegion;
    return this;
  }

  get region() {
    return this._region;
  }

  serialize(obj) {
    const queries = [];
    const loop = (obj, prefix = null) => {
      for (const property of Object.keys(obj)) {
        if (Object.prototype.hasOwnProperty.call(obj, property)) {
          if ((0, _isPlainObject2.default)(obj[property])) {
            loop(obj[property], property);
          } else if ((0, _isArray2.default)(obj[property])) {
            if (prefix) {
              queries.push(`${prefix}[${encodeURIComponent(property)}]=${obj[property].join(',')}`);
            } else {
              queries.push(`${encodeURIComponent(property)}=${obj[property].join(',')}`);
            }
          } else {
            if (prefix) {
              queries.push(`${prefix}[${encodeURIComponent(property)}]=${obj[property]}`);
            } else {
              queries.push(`${encodeURIComponent(property)}=${obj[property]}`);
            }
          }
        }
      }
    };

    loop(obj);
    return queries.join('&');
  }

  parseErrors(res, requestOptions, rateLimit) {
    const { status } = res;
    const err = { errors: true };
    const region = this.getRequestedRegion();
    switch (status) {
      case 401:
        return Object.assign({}, err, { messages: _Errors.UNAUTHORIZED, region, debug: requestOptions, rateLimit }, res);
      case 404:
        return Object.assign({}, err, { messages: _Errors.NOT_FOUND, region, debug: requestOptions, rateLimit }, res);
      case 500:
        return Object.assign({}, err, { messages: _Errors.INTERNAL, region, debug: requestOptions, rateLimit }, res);
      case 429:
        return Object.assign({}, err, { messages: _Errors.RATE_LIMIT, region, debug: requestOptions, rateLimit }, res);
      case 503:
        return Object.assign({}, err, { messages: _Errors.OFFLINE, region, debug: requestOptions, rateLimit }, res);
      case 406:
        return Object.assign({}, err, { messages: _Errors.NOT_ACCEPTABLE, region, debug: requestOptions, rateLimit }, res);
      default:
        return Object.assign({}, err, { messages: _Errors.UNKNOWN, region, debug: requestOptions, rateLimit }, res);
    }
  }

  status() {
    return (0, _nodeFetch2.default)(this.options.status);
  }

  parseRateLimit(headers) {
    return {
      limit: headers.get('x-ratelimit-limit'),
      remaining: headers.get('x-ratelimit-remaining'),
      reset: headers.get('x-ratelimit-reset'),
      requestId: headers.get('x-request-id')
    };
  }

  execute(method = 'GET', endpoint = null, query = null) {
    const requestOptions = Object.assign({}, this.options);
    if (endpoint === null) {
      return new Error('HTTP Error: No endpoint to provide a request to.');
    }

    const region = this.getRequestedRegion();

    requestOptions.url += `${region}/`;
    requestOptions.url += endpoint;

    if (query) {
      requestOptions.url += `?${this.serialize(query)}`;
    }

    return new Promise((resolve, reject) => {
      let rateLimit = null;
      this.tempRegion = null;

      (0, _nodeFetch2.default)(requestOptions.url, {
        method: requestOptions.method,
        headers: requestOptions.headers
      }).then(res => {
        rateLimit = this.parseRateLimit(res.headers);
        if (res.status !== 200) {
          return this.parseErrors(res, requestOptions, rateLimit);
        }
        return res.json();
      }).then(body => {
        // Empty responses
        if (!body) {
          return reject({ errors: true, messages: _Errors.NO_BODY, region, debug: requestOptions, rateLimit });
        }
        // Status code not 200
        if (body.errors) {
          return reject(Object.assign({}, body, { region, debug: requestOptions, rateLimit }));
        }

        return resolve({
          errors: null,
          body,
          region,
          debug: requestOptions,
          rateLimit
        });
      }).catch(err => {
        return reject({
          errors: true,
          messages: _Errors.NETWORK_ERROR,
          region,
          details: err,
          debug: requestOptions,
          rateLimit
        });
      });
    });
  }
}
exports.default = Http;