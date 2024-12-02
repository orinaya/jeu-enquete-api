# API RESTful - Jeu d'enquête Médiéval-Fantasie

![Bannière](assets/api-banner.png)

![Thème](https://img.shields.io/badge/Th%C3%A8me-Fantaisie-B3DEDD?style=for-the-badge)
![Type](https://img.shields.io/badge/Type-Enqu%C3%AAte-DEB3B3?style=for-the-badge)
![Durée](https://img.shields.io/badge/Dur%C3%A9e-10%20min-DECB42?style=for-the-badge)

⚔️ Plongez dans une aventure immersive en explorant les APIs avec ce **jeu d'enquête médiéval-fantastique**, où vous incarnerez <mark style="background-color: #B3DEDD;color: #1F4746 ;padding: 1px 3px; border-radius: 3px">**Eldrin Le Protecteur**</mark>, paladin noble et vénérable.

## Table des matières

1. [Stack technique](#1-stack-technique)
2. [Nouvelle quête disponible](#2-nouvelle-quête-disponible)
3. [Installer le projet](#3-installer-le-projet)
4. [Tester le projet](#4-tester-le-projet)
   - [Authentifiez-vous](#authentifiez-vous)
   - [Amusez-vous](#amusez-vous)
   - [Accuser](#accuser)
5. [Conception du projet](#5-conception-du-projet)
   - [Dictionnaire des données](#dictionnaires-des-données)
   - [Ressources](#ressources)
6. [Sécurité](#6-sécurité)
   - [JSON Web Token](#json-web-token)
   - [Middleware](#middleware)
   - [Hashage du mot de passe](#hashage-du-mot-de-passe)
   - [Code Statut](#code-statut)
7. [Remarques](#7-remarques)
8. [Références](#8-références)

## 1. Stack technique

| Catégorie                   | Technologie                                                                                                                                                                                                                                                                                                                                 |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Langages & Frameworks       | ![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black) ![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white) |
| Authentification & Sécurité | ![Bcrypt](https://img.shields.io/badge/Bcrypt-4488C6?style=for-the-badge&logo=lock&logoColor=white) ![jsonwebtoken](https://img.shields.io/badge/JSONWebToken-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)                                                                                                                |
| Outils                      | ![Git](https://img.shields.io/badge/Git-F05032?style=for-the-badge&logo=git&logoColor=white)                                                                                                                                                                                                                                                |

## 2. Nouvelle quête disponible

```
   __________________________________________
 / \                                         \.
|   |                                        |.
 \_ |    Cher aventurier,                    |.
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
    \_/________________________________________/.
```

🧙‍♂️ Vous et votre guilde vous dirigez vers le nord, à la recherche d'une relique mythique : la <b>Couronne d'Emeritus</b>. Mais alors que vous approchez de votre destination, une lettre mystérieuse vous parvient, vous mettant en garde : l'un de vos compagnons est sur le point de vous trahir.

Dans cette quête, personne ne peut être réellement fiable. Le destin de ce monde repose sur vos épaules. Saurez-vous percer les mystères et découvrir la vérité avant qu'il ne soit trop tard ?

Si vous êtes prêt à relever ce défi, suivez les étapes ci-dessous pour lancer et tester le projet.

**L'enquête vous attend, aventurier !** 🕵️‍♂️

## 3. Installer le projet

📂 Clôner le dépôt

```
git clone https://github.com/orinaya/jeu-enquete-api.git
```

📂 Il vous faudra ensuite créer à la racine du projet un fichier vide nommé

```
private.key
```

📦 Téléchargez les dépendances du projet

```
npm install
```

🔐 Générez une clé secrète. Cette dernière apparaitra dans votre fichier `private.key`

```
node utils/genkey.js
```

▶️ Lancez le projet

```
npm run start
```

## 4. Tester le projet

⬇️ Rendez-vous ici, pour découvrir la quête qui vous attend ⬇️

```
curl localhost:3000
```

### Authentifiez-vous

Les utilisateurs :

| id  | name        | password     | race          | class     | isAuthorized |
| --- | ----------- | ------------ | ------------- | --------- | ------------ |
| 1   | astarion    | Dolor1@      | High Elf      | Rogue     | false        |
| 2   | eldrin      | Venenum1@    | Human         | Paladin   | true         |
| 3   | karlach     | Ignis1@      | Tiefling      | Barbarian | false        |
| 4   | shadowheart | Parabellum1@ | Half High Elf | Cleric    | false        |

⚠️ Attention, seul le paladin est membre de la guilde, à vous de prouver qu'il s'agit bel et bien de vous. ⚠️

```
curl -X POST -d "name={name}&password={password}" localhost:3000/login
```

N'oubliez pas de garder votre token JWT sous la main, vos compagnons pourraient croire que vous avez utiliser un sort de déguisement. 😉

```
token=jwt-reçu
```

### Amusez-vous

Désormais, vous êtes libres de parcourir les lieux et découvrir les indices cachés. Vous trouverez toutes les ressources ici : ➡️ [Ressources](#ressources) ⬅️

Exemple :

```
curl -X GET http://localhost:3000/characters -H "Authorization: Bearer $token"
```

<blockquote>💡TIPS : Commencez par regarder vos compagnons de voyage, les connaître mieux vous aidera à mieux interpréter les indices.</blockquote>

### Accuser

Lorsque vous êtes prêt à accuser un compagnon :

```
curl -X POST \
-d "name={name}" \
-H "Authorization: Bearer $token" \
localhost:3000/accuse
```

Si vous trouvez le coupable, vous allez devoir l'éliminer avant qu'il ne vous trahisse et détruise le monde :

```
curl -X DELETE -H "Authorization: Bearer $token" localhost:3000/characters/{id}
```

⚠️ Attention, éliminer une personne est un acte grave, vos actes auront des conséquences si vous vous trompez ⚠️

## 5. Conception du projet

### Dictionnaires des données

| Code                  | Libellé                              | Type | Obligatoire ? | Remarques / Contraintes                           |
| --------------------- | ------------------------------------ | ---- | ------------- | ------------------------------------------------- |
| **user_id**           | Id de l'utilisateur                  | N    | Oui           | Identifiant UNIQUE                                |
| name                  | Nom de l'utilisateur                 | AN   | Oui           | Sert à s'identifier                               |
| password              | Mot de passe de l'utilisateur        | AN   | Oui           | Mot de passe hashé avec bcrypt                    |
| user_race             | Race du personnage                   | A    | Oui           | Enum (Elf, half-elf, human, dwarf, etc...)        |
| user_class            | Classe du personnage                 | A    | Oui           | Enum (Rogue, Fighter, Cleric, Wizard, etc...)     |
| isAuthorized          | Utilisateur membre de la guilde ?    | B    | Oui           | True ou false : compagnon ou non ?                |
| **character_id**      | Id du personnage                     | N    | Oui           | Identifiant UNIQUE                                |
| character_name        | Nom du personnage                    | A    | Oui           |                                                   |
| character_race        | Race du personnage                   | A    | Oui           | Enum (Elf, half-elf, human, dwarf)                |
| character_class       | Classe du personnage                 | A    | Oui           | Enum (Rogue, Fighter, Cleric, Wizard)             |
| character_background  | Histoire du personnage               | AN   | Oui           |                                                   |
| character_skills      | Compétences du personnage            | A    | Oui           | Plusieurs compétences possibles                   |
| character_ideals      | Idéaux du personnage                 | AN   | Oui           |                                                   |
| character_flaws       | Défauts du personnage                | AN   | Oui           | Plusieurs défauts possibles                       |
| character_personality | Traits de personnalité du personnage | AN   | Oui           |                                                   |
| isGuilty              | Est-il le coupable ?                 | B    | Oui           | True ou false : coupable ou non ?                 |
| **location_id**       | Id du lieu                           | N    | Oui           | Identifiant UNIQUE, utilisé pour situer un indice |
| location_name         | Nom du lieu                          | AN   | Oui           |                                                   |
| location_description  | Description du lieu                  | AN   | Oui           |                                                   |
| **clue_id**           | Id de l'indice                       | N    | Oui           | Identifiant UNIQUE                                |
| clue_name             | Nom de l'indice                      | AN   | Oui           |                                                   |
| clue_description      | Description de l'indice              | AN   | Oui           |                                                   |

<blockquote> Légende: A: Alphabétique ; N : Numérique ; AN: Alpha-Numérique ; B : Booléen </blockquote>

### Ressources

| Ressources                                             | URL                     | Méthodes HTTP   | Paramètres d'URL  | Commentaires                                        | Headers HTTP                     |
| ------------------------------------------------------ | ----------------------- | --------------- | ----------------- | --------------------------------------------------- | -------------------------------- |
| Introduction de la quête                               | `/`                     | `GET`           |                   | Explique l'enquête                                  | `Content-Type: application/json` |
| Authentification de l'utilisateur                      | `/login`                | `POST`          | `name`,`password` | Authentifie (isAuthorized) et retourne un token JWT | `Content-Type: application/json` |
| Affichage de la liste des personnages                  | `/characters`           | `GET`           |                   |                                                     | `Authorization: Bearer $token`   |
| Affichage d'un personnage spécifique                   | `/characters/{id}`      | `GET`, `DELETE` |                   |                                                     | `Authorization: Bearer $token`   |
| Affichage de la liste des lieux                        | `/locations`            | `GET`           |                   |                                                     | `Authorization: Bearer $token`   |
| Affichage d'un lieu spécifique                         | `/locations/{id}`       | `GET`           |                   |                                                     | `Authorization: Bearer $token`   |
| Affichage de la liste des indices d'un lieu spécifique | `/locations/{id}/clues` | `GET`           |                   |                                                     | `Authorization: Bearer $token`   |
| Accuser un personnage                                  | `/accuse`               | `POST`          | `name`            |                                                     | `Authorization: Bearer $token`   |

## 6. Sécurité

### JSON Web Token

Les utilisateurs obtiennent un jeton JWT lors de l'authentification.
Ce jeton doit être validé par le middleware `checkTokenMiddleware` pour accéder aux routes protégées.
Ainsi, les données sensibles ne sont pas exposés aux utilisateurs non autorisés (`isAuthorized`).

### Middleware

Le middleware `checkTokenMiddleware` vérifie le JWT dans l'en-tête de la requête.
Il bloque l'accès en cas de jeton invalide ou expiré.

### Hashage du mot de passe

Les mots de passe sont hashés grâce à **bcrypt**.

### Code statut

Une enum a été ajoutée pour centraliser les messages des codes statuts. Ils permettent de comprendre l'erreur rencontrés par l'utilisateur.

## 7. Remarques

J'ai trouvé le projet à la fois intéressant et efficace pour explorer le monde des APIs. Il m'a permis de mieux appréhender le processus et la manipulation de donnée, tout en explorant des concepts comme l’authentification, les middlewares et les tokens, de manière ludique.
Ce projet m'a également permis de partager ma passion pour la fantaisie à travers ses lieux et ses personnages.
En termes de défis, le plus complexe a été de trouver une solution pour la méthode `DELETE`. Cependant, j'ai réussi à trouver une solution avec une explication logique.
Dans le futur, j'aimerais faire évoluer ce jeu en ajoutant pourquoi pas des personnages ou en créant d'autres quêtes.

## 8. Références

1. [Cheat Sheet Markdown](https://www.markdownguide.org/cheat-sheet/)
2. [Documentation Badges Markdown](https://shields.io/)
3. [MDN Web Docs - API Express, Node.js, Javascript](https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs)
4. [JWT](https://jwt.io/)
5. [Specification HAL](https://stateless.group/hal_specification.html)
6. [ExpressJS](https://expressjs.com/fr/)
7. Dépôt GitHub [@paul-schuhm](https://github.com/paul-schuhm) - https://github.com/paul-schuhm/web-api
