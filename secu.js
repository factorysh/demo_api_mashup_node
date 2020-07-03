const crypto = require('crypto');

function validate_password(password, salt) {
  const ts = password.split(".");
  if (ts.length != 2) {
    throw "bad size";
  }
  return crypto.createHmac('sha256', salt).update(ts[0]).digest('base64') == ts[1];
}

module.exports = validate_password;