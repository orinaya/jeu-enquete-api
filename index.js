//Utilisation du paquet http
const http = require("http");
const hostname = "localhost";
const port = 3000;
//Déclaration du serveur
const server = http.createServer((req, res) => {
  //L'objet res sera utilisé pour construire la réponse HTTP
  res.statusCode = 200;
  res.setHeader("Content-Type", "text/plain");
  res.end("Hello World\n");
});
//Lancement du serveur (écoute sur le port indiqué)
server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});
