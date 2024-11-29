const express = require("express");
const router = express.Router();
const { clues } = require("../utils/database");
const hal = require("../utils/hal");

router.get("/clues", (req, res, next) => {
  res.status(200).json({
    links: {
      self: hal.halLinkObject("/clues"),
    },
    _embedded: clues,
  });
});

router.get("/clues/:id(\\d+)", (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const clue = clues.find((clue) => clue.clue_id === id);

  if (clue === undefined) {
    console.log("Le user n'a pas été trouvé");
    return res.status(404).json({});
  }

  res.status(200).json({
    _links: {
      self: hal.halLinkObject(`/clues/${clue.clue_id}`),
      clues: hal.halLinkObject(`/clues`),
    },
    clue_name: clue.clue_name,
    clue_race: clue.clue_description,
  });
});

module.exports = router;
