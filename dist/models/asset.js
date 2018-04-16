'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

var _ = require('./');

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

class Asset extends _2.default {

  constructor(data) {
    super(data);
  }

  get URL() {
    return this.data.attributes.URL;
  }

  get contentType() {
    return this.data.attributes.contentType;
  }

  get createdAt() {
    return this.data.attributes.createdAt;
  }

  get description() {
    return this.data.attributes.description;
  }

  get filename() {
    return this.data.attributes.filename;
  }

  get name() {
    return this.data.attributes.name;
  }

  resolve() {
    var _this = this;

    return _asyncToGenerator(function* () {
      try {
        const response = yield (0, _nodeFetch2.default)(_this.URL);
        const body = yield response.json();
        return body;
      } catch (e) {
        console.log(e);
        return false;
      }
    })();
  }

}
exports.default = Asset;