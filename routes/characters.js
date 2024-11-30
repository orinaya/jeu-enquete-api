const express = require("express");
const router = express.Router();
const { characters } = require("../utils/database");
const { checkTokenMiddleware } = require("../utils/jwt");
const hal = require("../utils/hal");

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

  if (character === undefined) {
    console.log("Les personnes n'ont pas été trouvé");
    return res.status(404).json({});
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
    character_ideals: character.character_ideals,
    character_personality_traits: character.character_personality_traits,
    character_flaws: character.character_flaws,
    character_status: character.character_status,
  });
});

module.exports = router;
