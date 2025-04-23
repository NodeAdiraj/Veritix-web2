const coseToJwk = require('cose-to-jwk');
const { createPublicKey } = require('crypto');

const coseToPem = async (coseBuffer) => {
  const jwk = await coseToJwk(coseBuffer);
  const keyObject = createPublicKey({ key: jwk, format: 'jwk' });
  return keyObject.export({ type: 'spki', format: 'pem' });
};

module.exports = coseToPem;