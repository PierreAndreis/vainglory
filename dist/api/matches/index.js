'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isString = require('lodash/isString');

var _isString2 = _interopRequireDefault(_isString);

var _parser = require('../parser');

var _parser2 = _interopRequireDefault(_parser);

var _Errors = require('../../Errors');

var _Utils = require('../../Utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const ENDPOINT_PREFIX = 'matches';

exports.default = http => {
  let single = (() => {
    var _ref = _asyncToGenerator(function* (matchId) {
      if (!matchId) {
        return (0, _Errors.normalizeError)('Expected required matchId. Usage: .single(matchId)');
      }

      if (!(0, _isString2.default)(matchId)) {
        return (0, _Errors.normalizeError)('Expected a string for matchId');
      }

      const endpoint = `${ENDPOINT_PREFIX}/${matchId}`;
      try {
        const response = yield http.execute('GET', endpoint);
        const { errors, messages } = response;

        if (errors) {
          return (0, _Errors.normalizeError)(messages);
        }

        const model = (0, _parser2.default)('match', response.body);
        model.extend('rateLimit', response.rateLimit);

        return model;
      } catch (e) {
        return (0, _Errors.normalizeError)(null, e);
      }
    });

    return function single(_x) {
      return _ref.apply(this, arguments);
    };
  })();

  let collection = (() => {
    var _ref2 = _asyncToGenerator(function* (collectionOptions = {}) {
      const now = new Date();
      const minus28Days = new Date();

      minus28Days.setDate(now.getDate() - 28);

      const defaults = {
        page: { offset: 0, limit: 50 },
        sort: 'createdAt',
        filter: { 'createdAt-start': minus28Days.toISOString(), 'createdAt-end': now.toISOString(), playerNames: [], teamNames: [] }
      };

      const query = Object.assign({}, defaults, collectionOptions);

      if (query.filter.playerNames && query.filter.playerNames.length > 0) {
        query.filter.playerNames = (0, _Utils.encodePlayerNames)(query.filter.playerNames);
      }

      try {
        const response = yield http.execute('GET', `${ENDPOINT_PREFIX}`, query);
        const { errors, messages } = response;

        if (errors) {
          return (0, _Errors.normalizeError)(messages);
        }
        const model = (0, _parser2.default)('matches', response.body);
        model.extend('rateLimit', response.rateLimit);

        return model;
      } catch (e) {
        return (0, _Errors.normalizeError)(null, e);
      }
    });

    return function collection() {
      return _ref2.apply(this, arguments);
    };
  })();

  return { single, collection };
};