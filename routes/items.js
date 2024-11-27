const express = require("express");
const router = express.Router();
const { items } = require("../database");
const hal = require("../hal");

router.get("/items", (req, res, next) => {
  res.status(200).json({
    links: {
      self: hal.halLinkObject("/items"),
    },
    _embedded: items,
  });
});

router.get("/items/:id(\\d+)", (req, res, next) => {
  const id = parseInt(req.params.id, 10);
  const item = items.find((item) => item.item_id === id);

  if (item === undefined) {
    console.log("Le user n'a pas été trouvé");
    return res.status(404).json({});
  }

  res.status(200).json({
    _links: {
      self: hal.halLinkObject(`/items/${item.item_id}`),
      items: hal.halLinkObject(`/items`),
    },
    item_name: item.item_name,
    item_race: item.item_description,
  });
});

module.exports = router;
