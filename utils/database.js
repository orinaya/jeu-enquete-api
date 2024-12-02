var bcrypt = require("bcrypt");

// ENUM
const Races = {
  DWARF: "Dwarf",
  ELF: "Elf",
  HUMAN: "Human",
  HALF_ELF: "Half elf",
  HIGH_ELF: "High Elf",
  HALF_HIGH_ELF: "Half High Elf",
  TIEFLING: "Tiefling",
};

const Classes = {
  CLERIC: "Cleric",
  FIGHTER: "Fighter",
  WIZARD: "Wizard",
  ROGUE: "Rogue",
  PALADIN: "Paladin",
  BARBARIAN: "Barbarian",
};

// CLASS
class User {
  constructor(user_id, name, password = "", user_race, user_class, isAuthorized = false) {
    this.user_id = user_id;
    this.name = name;
    this.password = bcrypt.hashSync(password, 5);
    this.user_race = user_race;
    this.user_class = user_class;
    this.isAuthorized = isAuthorized;
  }
}

class Character {
  constructor(
    character_id,
    character_name,
    character_race,
    character_class,
    character_background,
    character_skills,
    character_ideals,
    character_flaws,
    character_personality,
    isGuilty
  ) {
    this.character_id = character_id;
    this.character_name = character_name;
    this.character_race = character_race;
    this.character_class = character_class;
    this.character_background = character_background;
    this.character_skills = character_skills;
    this.character_ideals = character_ideals;
    this.character_flaws = character_flaws;
    this.character_personality = character_personality;
    this.isGuilty = isGuilty;
  }

  toPublic() {
    const { isGuilty, ...publicData } = this;
    return publicData;
  }
}

class Location {
  constructor(location_id, location_name, location_description) {
    this.location_id = location_id;
    this.location_name = location_name;
    this.location_description = location_description;
  }

  addClues(cluesList) {
    this.clues = cluesList.filter((clue) => clue.location_id === this.location_id);
  }
}

class Clue {
  constructor(clue_id, clue_name, clue_description, location_id = null) {
    this.clue_id = clue_id;
    this.clue_name = clue_name;
    this.clue_description = clue_description;
    this.location_id = location_id;
  }
}

// DATAS
const users = [
  new User(1, "astarion", "Dolor1@", Races.HIGH_ELF, Classes.ROGUE, false),
  new User(2, "eldrin", "Venenum1@", Races.HUMAN, Classes.PALADIN, true),
  new User(3, "karlach", "Ignis1@", Races.TIEFLING, Classes.BARBARIAN, false),
  new User(4, "shadowheart", "Parabellum1@", Races.HALF_HIGH_ELF, Classes.CLERIC, false),
];

const characters = [
  new Character(
    1,
    "Solas",
    Races.HALF_ELF,
    Classes.ROGUE,
    `Ancien membre d'une guilde de voleurs redoutée, il a quitté cette vie en jurant de se racheter. Cependant, des traces de son passé continuent de le hanter.`,
    ["Crochetage", "Dissimulation", "Perception"],
    `Le monde est cruel, il faut être plus malin que lui pour survivre.`,
    ["Charmeur", "Rusé", "Calculateur"],
    `Ne fait confiance à personne, toujours prêt à mentir pour se couvrir.`,
    false
  ),
  new Character(
    2,
    "Tav",
    Races.HUMAN,
    Classes.WIZARD,
    `Disciple d'un ordre magique, elle a été bannie pour avoir utilisé une magie interdite afin de sauver son mentor. Elle cherche à retrouver une place dans la société magique.`,
    ["Analyse des artefacts", "Cryptographie", "Connaissance des arcanes"],
    `La connaissance est la clé de tout pouvoir.`,
    ["Curieuse", "Obstinée", "Analytique"],
    `Obsédée par le savoir, parfois insensible aux autres.`,
    false
  ),
  new Character(
    3,
    "Thorgar",
    Races.DWARF,
    Classes.FIGHTER,
    `Ancien capitaine de la garde royale, il a été déshonoré après un échec sur le champ de bataille. Il espère retrouver sa gloire perdue grâce à cette mission.`,
    ["Force brute", "Stratégie militaire", "Survie"],
    `L'honneur se gagne par les actes, pas par les mots.`,
    ["Loyal", "Impulsif", "Bourru"],
    `Colérique, ne réfléchit pas toujours avant d'agir.`,
    false
  ),
  new Character(
    4,
    "Raphael",
    Races.ELF,
    Classes.CLERIC,
    `Prêtre d'un culte bienveillant, il a autrefois failli à protéger une relique sacrée, et il considère cette mission comme une opportunité de rédemption.`,
    ["Soins", "Magie divine", "Persuasion"],
    `Le pardon est la voie vers la lumière.`,
    ["Calme", "Réfléchi", "Compatissant"],
    `Trop confiant, parfois aveuglé par son besoin de rédemption.`,
    true
  ),
];

const locations = [
  new Location(
    1,
    "Salle du Trésor",
    `Une pièce circulaire à l’intérieur des cavernes magmatiques, illuminée par la lueur rougeoyante du magma environnant. Au centre se trouve un piédestal brisé, où la relique, la Couronne du Dragon, était exposée avant sa disparition.`
  ),
  new Location(
    2,
    "Sanctuaire des Anciennes Magies",
    `Une vaste bibliothèque en ruines, les murs recouverts d’étagères effondrées contenant des tomes anciens. L’air est empli d’une étrange énergie magique. Les lieux semblent intacts mais abandonnés depuis des siècles.`
  ),
  new Location(
    3,
    "Cavernes Magmatiques",
    ` Un réseau de cavernes souterraines où le magma coule lentement à travers des fissures dans le sol. Des stalactites de roche noire pendent du plafond, tandis que des gravures anciennes ornent les murs. L’atmosphère est suffocante, et l’air crépite de magie ancienne.`
  ),
];

const clues = [
  new Clue(1, `Débris du piédestal`, `Restes de l'endroit où la Couronne était posée.`, 1), //lié à personne juste montre la scène du "crime"
  new Clue(2, `Amulette en forme de dragon`, `Liée à une secte de culte draconique.`, 1), // secte -> raphaël
  new Clue(3, `Inscriptions en draconique`, `Gravées sur les murs, traduisibles par Tav.`, 1), // magie
  new Clue(4, `Vieux grimoire`, `Mentionne un rituel destructeur impliquant la Couronne.`, 2), // magie
  new Clue(5, `Morceaux de poudre d’argent`, `Témoins d’un rituel récent ou interrompu.`, 2), // magie
  new Clue(6, `Reliques mineures`, `Émettent une faible lumière magique.`, 2), // magie
  new Clue(7, `Dague rituelle`, `Gravée de symboles du culte sombre, encore ensanglantée.`, 3), // culte
  new Clue(8, `Parchemin d’invocation`, `Décrit un rituel impliquant la Couronne et un sacrifice.`, 3), //
  new Clue(9, `Cristaux magiques`, `Indiquent une activité magique récente.`, 3), //
  new Clue(
    10,
    `Note cryptée`,
    `Évoque un "Maître" et un "temps opportun" pour utiliser la Couronne. Signée "R".`,
    2
  ), // signé R
];

module.exports = {
  Character,
  Location,
  Clue,
  User,
  characters,
  locations,
  clues,
  users,
};
