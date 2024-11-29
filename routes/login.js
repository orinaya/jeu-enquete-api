var express = require("express");
var router = express.Router();
var database = require("../utils/database");
var hal = require("../utils/hal");
var bcrypt = require("bcrypt");
var jwt = require("../utils/jwt");

/**
 * @param {} name
 * @param {*} password
 * @returnsbcrypt
 */

function authenticate(name, password) {
  const user = database.users.find((user) => {
    return user.name === name && bcrypt.compareSync(password, user.password);
  });

  if (user === undefined) return false;

  return true;
}

// Trouver le user par nom
function findUserByName(name) {
  return database.users.find((user) => user.name === name);
}

/**
 * @param {} name
 * @returns
 */

// Majuscule première lettre du prénom
function toFirstLetterUpperCase(nameTyped) {
  const firstLetter = nameTyped.charAt(0);
  const firstLetterCap = firstLetter.toUpperCase();
  const remainingLetters = nameTyped.slice(1);
  return firstLetterCap + remainingLetters;
}

//vérifier si le compagnon fait parti de la guilde
function isCompanion(name) {
  const user = findUserByName(name);
  return user && user.isAuthorized;
}

router.post("/login", (req, res, next) => {
  const name = req.body.name;
  const password = req.body.password;

  console.log("Identifiants reçus :", req.body);

  if (authenticate(name, password)) {
    if (!isCompanion(name, password)) {
      res
        .status(401)
        .send(`Vous n'êtes pas membre de la guilde ${toFirstLetterUpperCase(name)}, faites demi tour.`);
      return;
    }

    const accessToken = jwt.createJWT(name, true, "1 day");

    let responseObject = {
      _links: {
        self: hal.halLinkObject("/login"),
      },
      jwt: accessToken,
      message: `Bienvenue ${toFirstLetterUpperCase(name)} !`,
    };

    res.status(200).format({
      "application/hal+json": function () {
        res.send(responseObject);
      },
    });

    console.log("Bienvenue", toFirstLetterUpperCase(name), "!");
  } else {
    let responseObject = {
      _links: {
        self: hal.halLinkObject("/login"),
      },
      message: `Vous n'êtes pas membre de la guilde ${toFirstLetterUpperCase(name)}, faites demi tour.`,
    };
    res.status(401).format({
      "application/hal+json": function () {
        res.send(responseObject);
      },
    });
  }
});

module.exports = router;
