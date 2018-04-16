'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalizeError = normalizeError;
const RATE_LIMIT = exports.RATE_LIMIT = 'Request rate limited. Free for non-commercial use for up to 10 requests per minute! To increase your rate limit, please contact api@superevilmegacorp.com';
const UNAUTHORIZED = exports.UNAUTHORIZED = 'Unauthorized Access. invalid API key provided.';
const UNKNOWN = exports.UNKNOWN = 'Unknown error, please check your request and try again.';
const INTERNAL = exports.INTERNAL = 'Internal Server Error.';
const NO_BODY = exports.NO_BODY = 'No body returned from response.';
const NOT_FOUND = exports.NOT_FOUND = 'The specified object could not be found.';
const OFFLINE = exports.OFFLINE = 'API is currently offline, try again later.';
const NOT_ACCEPTABLE = exports.NOT_ACCEPTABLE = 'You requested a format that is\'t JSON';
const NETWORK_ERROR = exports.NETWORK_ERROR = 'Network error, check host name.';

function normalizeError(messages = 'Unknown Client error', attachments = {}) {
  return Object.assign({
    errors: true,
    messages
  }, attachments);
}