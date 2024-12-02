const express = require("express");
const router = express.Router();
const { characters } = require("../utils/database");
const { checkTokenMiddleware } = require("../utils/jwt");
const hal = require("../utils/hal");
const { ErrorMessages } = require("../utils/enum");

router.post("/accuse", checkTokenMiddleware, (req, res, next) => {
  const name = req.body.name;
  console.log("Accusé reçu :", req.body);

  function toFirstLetterUpperCase(nameTyped) {
    const firstLetter = nameTyped.charAt(0);
    const firstLetterCap = firstLetter.toUpperCase();
    const remainingLetters = nameTyped.slice(1);
    return firstLetterCap + remainingLetters;
  }

  // `name` manquant
  if (!name) {
    return res.status(400).json({
      message: ErrorMessages[400]("nom")`. Vous devez accuser un compagnon.`,
    });
  }

  // Personnage non trouvé
  const accusedCharacter = characters.find((character) => character.character_name === name);

  if (!accusedCharacter) {
    return res.status(404).json({
      message: ErrorMessages[404](`personnage ${toFirstLetterUpperCase(name)}`),
    });
  }

  // Personnage coupable
  if (accusedCharacter.isGuilty) {
    return res.status(200).json({
      _links: {
        self: hal.halLinkObject("/accuse"),
      },
      message: `Bravo ! ${toFirstLetterUpperCase(
        name
      )} est bien coupable ! Désormais, il ne vous reste plus qu'à éliminer ce vile personnage`,
    });
  } else {
    // Personnage non coupable
    res.status(200).json({
      _links: {
        self: hal.halLinkObject("/accuse"),
      },
      message: `Non, ${toFirstLetterUpperCase(name)} n'est pas coupable...`,
    });
  }
});

module.exports = router;
