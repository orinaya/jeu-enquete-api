const express = require("express");
const router = express.Router();
const { locations } = require("../database");
const hal = require("../hal");

router.get("/locations", (req, res, next) => {
  res.status(200).json({
    links: {
      self: hal.halLinkObject("/locations"),
    },
    _embedded: locations,
  });
});

router.get("/locations/:id(\\d+)", (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const location = locations.find((location) => location.location_id === id);

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
  });
});

module.exports = router;
