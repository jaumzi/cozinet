const crypto = require('crypto');
const ParametrosDoSistema = require('./ParametrosDoSistema');

module.exports = {
  async Encriptar(string) {
    const { params } = await ParametrosDoSistema();
    let result = crypto.pbkdf2Sync(string, params.salt, 100000, 512, 'sha512');
    return result.toString('hex');
  }
};
