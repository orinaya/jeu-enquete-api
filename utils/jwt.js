const fs = require("fs");
const jsonwebtoken = require("jsonwebtoken");

// const SECRET = fs.readFileSync("private.key");
const SECRET = fs.readFileSync("private.key", "utf8").trim();
const EXPIRATION = "1 day";

/**
 * @param {*} headervalue
 * @returns
 */

const extractBearerToken = (headervalue) => {
  if (typeof headervalue !== "string") {
    return false;
  }
  const matches = headervalue.match(/(bearer)\s+(\S+)/i);
  return matches && matches[2];
};

/**
 * @param {*} req
 * @param {*} res
 * @param {*} next
 * @returns
 */
const checkTokenMiddleware = (req, res, next) => {
  const token = req.headers.authorization && extractBearerToken(req.headers.authorization);
  if (!token) {
    return res.status(401).json({ msg: "Vous n'êtes pas autorisé-e à accéder à cette ressource." });
  }

  jsonwebtoken.verify(token, SECRET, (err, decodedToken) => {
    if (err) {
      res.status(401).json({
        msg: "Vous n'êtes pas autorisé-e à accéder à cette ressource.",
      });
      return;
    }
    console.log("Token valide :", decodedToken);
    res.locals.decodedToken = decodedToken;
    next();
  });
};

/**
 * @param {*} name
 * @param {*} isAuthorized
 * @returns
 */
function createJWT(name, isAuthorized, expiration = EXPIRATION) {
  return jsonwebtoken.sign(
    {
      name: name,
      isAuthorized: isAuthorized,
    },
    SECRET,
    {
      expiresIn: expiration,
    }
  );
}

module.exports = { createJWT, checkTokenMiddleware };
