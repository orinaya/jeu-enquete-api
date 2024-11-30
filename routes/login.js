const express = require("express");
const router = express.Router();
const database = require("../utils/database");
const hal = require("../utils/hal");
const bcrypt = require("bcrypt");
const jwt = require("../utils/jwt");

/**
 * @param {} name
 * @param {*} password
 * @returnsbcrypt
 */

// vérifier si l'utilisateur existe
function isAuthentificated(name, password) {
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
function isAuthorized(name) {
  const user = findUserByName(name);
  return user && user.isAuthorized;
}

router.post("/login", (req, res, next) => {
  const name = req.body.name;
  const password = req.body.password;

  console.log("Identifiants reçus :", req.body);

  const isAuthAsCompanion = isAuthentificated(name, password) && isAuthorized(name);

  if (!isAuthAsCompanion) {
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

  const accessToken = jwt.createJWT(name, true, "1 day");

  let responseObject = {
    _links: {
      self: hal.halLinkObject("/login"),
      characters: hal.halLinkObject("/characters"),
      locations: hal.halLinkObject("/locations"),
      items: hal.halLinkObject("/items"),
      clues: hal.halLinkObject("/clues"),
    },
    jwt: accessToken,
    message: `Bienvenue ${name} !`,
  };

  return res.status(200).format({
    "application/hal+json": function () {
      res.send(responseObject);
      console.log("Bienvenue", name);
    },
  });
});

module.exports = router;
