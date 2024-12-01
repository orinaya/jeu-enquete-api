const express = require("express");
const router = express.Router();
const { locations, clues } = require("../utils/database");
const { checkTokenMiddleware } = require("../utils/jwt");
const hal = require("../utils/hal");

router.get("/locations", checkTokenMiddleware, (req, res, next) => {
  res.status(200).json({
    links: {
      self: hal.halLinkObject("/locations"),
    },
    _embedded: locations,
  });
});

router.get("/locations/:id(\\d+)", checkTokenMiddleware, (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const location = locations.find((location) => location.location_id === id);

  locations.forEach((location) => {
    location.addClues(clues);
  });

  if (location === undefined) {
    console.log("Le lieu n'a pas été trouvé");
    return res.status(404).json({});
  }

  res.status(200).json({
    _links: {
      self: hal.halLinkObject(`/locations/${location.location_id}`),
      locations: hal.halLinkObject(`/locations`),
    },
    location_name: location.location_name,
    location_race: location.location_description,
    clues: location.clues,
  });
});

router.get("/locations/:id(\\d+)/clues", checkTokenMiddleware, (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const location = locations.find((location) => location.location_id === id);

  if (location === undefined) {
    console.log("Le lieu n'a pas été trouvé");
    return res.status(404).json({});
  }

  const cluesLocation = clues.filter((clue) => clue.location_id === id);

  res.status(200).json({
    _links: {
      self: hal.halLinkObject(`/locations/${location.location_id}/clues`),
      locations: hal.halLinkObject(`/locations`),
    },
    clues: cluesLocation.map((clue) => ({
      clue_name: clue.clue_name,
      clue_description: clue.clue_description,
      _links: {
        self: hal.halLinkObject(`/clues/${clue.clue_id}`),
        location: hal.halLinkObject(`/locations/${location.location_id}`),
      },
    })),
  });
});

module.exports = router;
