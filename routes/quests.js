const express = require("express");
const router = express.Router();
const hal = require("../utils/hal");

router.get("/", (req, res, next) => {
  res.status(200).json({
    links: {
      self: hal.halLinkObject("/"),
    },
    message: [
      `Eldrin, vous avez une nouvelle quête ! 🧙‍♂️ Vous et votre guilde vous dirigez vers le nord, à la recherche d'une relique mythique : la Couronne d'Emeritus. Mais alors que vous approchez de votre destination, une lettre mystérieuse vous parvient, vous mettant en garde : l'un de vos compagnons est sur le point de vous trahir. Dans cette quête, personne ne peut être réellement fiable. Le destin de ce monde repose sur vos épaules. Saurez-vous percer les mystères et découvrir la vérité avant qu'il ne soit trop tard ? Si vous êtes prêt à relever ce défi, rendez-vous à la page /login et prouvez votre identité.`,
    ],
  });
  console.log(` 
    __________________________________________
 / \\                                         \.
|   |                                        |.
 \\_ |    Cher aventurier,                    |.
    |                                        |.
    |    Il y a un traître parmi vous.       |.
    |    Il veut la Couronne. Trouvez le     |.
    |    et découvrez ses motivations        |.
    |    avant qu'il ne soit trop tard.      |.
    |    250 pièces d'or à la clé.           |.
    |                                        |.
    |                                - O     |.
    |                                        |.
    |   _____________________________________|___
    |  /                                        /.
    \\_/________________________________________/.`);
});

module.exports = router;
