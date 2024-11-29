const fs = require("fs");

const jsonwebtoken = require("jsonwebtoken");

const SECRET = fs.readFileSync("private.key");

const EXPIRATION = "1 day";

const extractBearerToken = (headervalue) => {
  if (typeof headervalue !== "string") {
    return false;
  }
  const matches = headervalue.match(/(bearer)\s+(\S+)/i);
  return matches && matches[2];
};

const checkTokenMiddleware = (req, res, next) => {
  const jwt = req.headers.authorization && extractBearerToken(req.headers.authorization);
  console.log(jwt);
  next();
};

/**
 * Retourne un jwt signé avec une date d'expiration
 * @param {*} login L'identifiant de l'utilisateur
 * @param {*} isCompanion
 * @returns
 */
function createJWT(login, isCompanion, expiration = EXPIRATION) {
  return jsonwebtoken.sign(
    {
      login: login,
      isCompanion: isCompanion,
    },
    SECRET,
    {
      expiresIn: expiration,
    }
  );
}

module.exports = { createJWT, checkTokenMiddleware };
