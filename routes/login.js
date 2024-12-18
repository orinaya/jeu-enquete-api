const express = require("express");
const router = express.Router();
const database = require("../utils/database");
const hal = require("../utils/hal");
const bcrypt = require("bcrypt");
const jwt = require("../utils/jwt");
const { ErrorMessages } = require("../utils/enum");

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
    res.status(401).json({
      message: `Cet utilisateur (${name}) n'est pas membre de la guilde . Faites demi-tour.`,
    });
  }

  const accessToken = jwt.createJWT(name, true, "1 day");

  let responseObject = {
    _links: {
      self: hal.halLinkObject("/login"),
      characters: hal.halLinkObject("/characters"),
      locations: hal.halLinkObject("/locations"),
    },
    jwt: accessToken,
    message: `Bienvenue ${toFirstLetterUpperCase(name)}, vous pouvez commencer votre enquête !`,
  };

  return res.status(200).format({
    "application/hal+json": function () {
      res.send(responseObject);
      console.log("Bienvenue", toFirstLetterUpperCase(name), ", vous pouvez commencer votre enquête !");
    },
  });
});

module.exports = router;
