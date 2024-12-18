const express = require("express");
const path = require("path");

const hostname = "localhost";
const port = 3000;

const homeRouter = require("./routes/quests");
const loginRouter = require("./routes/login");
const charactersRouter = require("./routes/characters");
const locationsRouter = require("./routes/locations");
const accuseRouter = require("./routes/accuse");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, "public")));

app.use(homeRouter, loginRouter, charactersRouter, locationsRouter, accuseRouter);

app.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

module.exports = app;
