const express = require("express");
const router = express.Router();
const { characters } = require("../utils/database");
const { checkTokenMiddleware } = require("../utils/jwt");
const hal = require("../utils/hal");
const { ErrorMessages } = require("../utils/enum");

router.get("/characters", checkTokenMiddleware, (req, res, next) => {
  const publicCharacters = characters.map((character) => character.toPublic());

  res.status(200).json({
    links: {
      self: hal.halLinkObject("/characters"),
    },
    _embedded: publicCharacters,
  });
});

router.get("/characters/:id(\\d+)", checkTokenMiddleware, (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const publicCharacters = characters.map((character) => character.toPublic());
  const character = publicCharacters.find((character) => character.character_id === id);

  // Personnage non trouvé
  if (character === undefined) {
    return res.status(404).json({
      message: ErrorMessages[404]("personnage"),
    });
  }

  res.status(200).json({
    _links: {
      self: hal.halLinkObject(`/characters/${character.character_id}`),
      characters: hal.halLinkObject(`/characters`),
    },
    character_name: character.character_name,
    character_race: character.character_race,
    character_class: character.character_class,
    character_background: character.character_background,
    character_skills: character.character_skills,
    character_ideals: character.character_ideals,
    character_flaws: character.character_flaws,
    character_personality: character.character_personality,
  });
});

router.delete("/characters/:id(\\d+)", checkTokenMiddleware, (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const publicCharacters = characters.map((character) => character.toPublic());
  const character = publicCharacters.find((char) => char.character_id === id);

  if (!character) {
    return res.status(404).json({
      message: ErrorMessages[404]("personnage"),
    });
  }

  const index = characters.findIndex((char) => char.character_id === id);

  if (index === undefined) {
    return res.status(404).json({
      message: ErrorMessages[404]("personnage"),
    });
  }

  const removedCharacter = characters.splice(index, 1)[0];

  // Attention si on se trompe de personnage, cela a des conséquences... comme dans la vraie vie
  if (!removedCharacter.isGuilty) {
    res.status(200).json({
      _links: {
        self: hal.halLinkObject(`/characters/${removedCharacter.character_id}`),
        characters: hal.halLinkObject(`/characters`),
      },
      message: `Oups ! Vous avez tué un innocent : ${removedCharacter.character_name}. Les actes ont des conséquences...`,
    });
  } else {
    res.status(200).json({
      _links: {
        self: hal.halLinkObject(`/characters/${removedCharacter.character_id}`),
        characters: hal.halLinkObject(`/characters`),
      },
      message: `Bravo ! Vous avez éliminé le coupable : ${removedCharacter.character_name}. L'enquête est terminée.`,
    });
  }
});

module.exports = router;
