const express = require("express");
const router = express.Router();
const {characters} = require("../utils/database");
const {checkTokenMiddleware} = require("../utils/jwt");
const hal = require("../utils/hal");

router.post("/accuse", checkTokenMiddleware, (req, res, next) => {
  const name = req.body.name;
  console.log("Accusé reçu :", req.body);

  function toFirstLetterUpperCase(nameTyped) {
    const firstLetter = nameTyped.charAt(0);
    const firstLetterCap = firstLetter.toUpperCase();
    const remainingLetters = nameTyped.slice(1);
    return firstLetterCap + remainingLetters;
  }

  if (!name) {
    let responseObject = {
      _links: {
        self: hal.halLinkObject("/accuse"),
      },
      message: `Vous devez accuser un compagnon.`,
    };
    res.status(401).format({
      "application/hal+json": function () {
        res.send(responseObject);
      },
    });
  }

  const accusedCharacter = characters.find((character) => character.character_name === name);

  if (!accusedCharacter) {
    let responseObject = {
      _links: {
        self: hal.halLinkObject("/accuse"),
      },
      message: `${toFirstLetterUpperCase(name)} n'existe pas dans la liste des personnages.`,
    };
    res.status(401).format({
      "application/hal+json": function () {
        res.send(responseObject);
      },
    });
  }

  if (accusedCharacter.isGuilty) {
    let responseObject = {
      _links: {
        self: hal.halLinkObject("/accuse"),
      },
      message: `Bravo ! ${toFirstLetterUpperCase(
        name
      )} est bien coupable ! Désormais, il ne vous reste plus qu'à éliminer ce vile personnage`,
    };
    res.status(401).format({
      "application/hal+json": function () {
        res.send(responseObject);
      },
    });
  } else {
    let responseObject = {
      _links: {
        self: hal.halLinkObject("/accuse"),
      },
      message: `Non, ${toFirstLetterUpperCase(name)} n'est pas coupable...`,
    };
    res.status(401).format({
      "application/hal+json": function () {
        res.send(responseObject);
      },
    });
  }
});

module.exports = router;
