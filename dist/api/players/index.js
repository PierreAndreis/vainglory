'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isString = require('lodash/isString');

var _isString2 = _interopRequireDefault(_isString);

var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _parser = require('../parser');

var _parser2 = _interopRequireDefault(_parser);

var _Errors = require('../../Errors');

var _Utils = require('../../Utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const ENDPOINT_PREFIX = 'players';

exports.default = http => {
  let getByName = (() => {
    var _ref = _asyncToGenerator(function* (playerNames) {
      if (!playerNames) {
        return (0, _Errors.normalizeError)('Expected required playerNames. Usage: .getByName([playerNames])');
      }

      if (!(0, _isArray2.default)(playerNames)) {
        return (0, _Errors.normalizeError)('Expected an array for playerNames');
      }

      const defaults = { filter: { playerName: [] } };
      const query = Object.assign({}, defaults, { filter: { playerNames } });

      if (query.filter.playerNames) {
        query.filter.playerNames = (0, _Utils.encodePlayerNames)(query.filter.playerNames);
      }

      try {
        const response = yield http.execute('GET', `${ENDPOINT_PREFIX}`, query);
        const { errors, messages } = response;

        if (errors) {
          return (0, _Errors.normalizeError)(messages);
        }

        const model = (0, _parser2.default)('players', response.body);
        model.extend('rateLimit', response.rateLimit);

        return model;
      } catch (e) {
        return (0, _Errors.normalizeError)(null, e);
      }
    });

    return function getByName(_x) {
      return _ref.apply(this, arguments);
    };
  })();

  let getById = (() => {
    var _ref2 = _asyncToGenerator(function* (playerId) {
      if (!playerId) {
        return (0, _Errors.normalizeError)('Expected required playerId. Usage: .single(playerId)');
      }

      if (!(0, _isString2.default)(playerId)) {
        return (0, _Errors.normalizeError)('Expected a string for playerId');
      }

      const endpoint = `${ENDPOINT_PREFIX}/${playerId}`;

      try {
        const response = yield http.execute('GET', endpoint);
        const { errors, messages } = response;

        if (errors) {
          return (0, _Errors.normalizeError)(messages);
        }

        const model = (0, _parser2.default)('player', response.body);
        model.extend('rateLimit', response.rateLimit);

        return model;
      } catch (e) {
        return (0, _Errors.normalizeError)(null, e);
      }
    });

    return function getById(_x2) {
      return _ref2.apply(this, arguments);
    };
  })();

  return { getByName, getById };
};