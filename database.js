// ENUM
const Races = {
  DWARF: "Dwarf",
  ELF: "Elf",
  HUMAN: "Human",
  HALF_ELF: "Half-elf",
};

const Classes = {
  CLERIC: "Cleric",
  FIGHTER: "Fighter",
  WIZARD: "Wizard",
  ROGUE: "Rogue",
};

// CLASS
class Character {
  constructor(
    character_id,
    character_name,
    character_race,
    character_class,
    character_background,
    character_ideals,
    character_personality_traits,
    character_flaws,
    character_status
  ) {
    this.character_id = character_id;
    this.character_name = character_name;
    this.character_race = character_race;
    this.character_class = character_class;
    this.character_background = character_background;
    this.character_ideals = character_ideals;
    this.character_personality_traits = character_personality_traits;
    this.character_flaws = character_flaws;
    this.character_status = character_status;
  }
}

class Location {
  constructor(location_id, location_name, location_description) {
    this.location_id = location_id;
    this.location_name = location_name;
    this.location_description = location_description;
  }
}

class Item {
  constructor(object_id, object_name, object_description) {
    this.object_id = object_id;
    this.object_name = object_name;
    this.object_description = object_description;
  }
}

class Clue {
  constructor(clue_id, clue_name, clue_description, clue_type) {
    this.clue_id = clue_id;
    this.clue_name = clue_name;
    this.clue_description = clue_description;
  }
}
// DATAS
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
    `Ne fait confiance à personne, toujours prêt à mentir pour se couvrir.`
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
    `Obsédée par le savoir, parfois insensible aux autres.`
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
    `Colérique, ne réfléchit pas toujours avant d'agir.`
  ),
  new Character(
    4,
    "Raphaël",
    Races.ELF,
    Classes.CLERIC,
    `Prêtre d'un culte bienveillant, il a autrefois failli à protéger une relique sacrée, et il considère cette mission comme une opportunité de rédemption.`,
    ["Soins", "Magie divine", "Persuasion"],
    `Le pardon est la voie vers la lumière.`,
    ["Calme", "Réfléchi", "Compatissant"],
    `Trop confiant, parfois aveuglé par son besoin de rédemption.`
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

const items = [
  new Item(1, `Débris du piédestal`, `Restes de l'endroit où la Couronne était posée.`),
  new Item(2, `Amulette en forme de dragon`, `Trouvée dans la main du gardien magique.`),
  new Item(3, `Inscriptions en draconique`, `Gravées sur les murs, traduisibles par Lyanna.`),
  new Item(4, `Vieux grimoire`, `Mentionne un rituel destructeur impliquant la Couronne.`),
  new Item(5, `Morceaux de poudre d’argent`, `Témoins d’un rituel récent ou interrompu.`),
  new Item(6, `Reliques mineures`, `Émettent une faible lumière magique.`),
  new Item(7, `Dague rituelle`, `Gravée de symboles du culte sombre, encore ensanglantée.`),
  new Item(8, `Parchemin d’invocation`, `Décrit un rituel impliquant la Couronne.`),
  new Item(9, `Cristaux magiques`, `Dégagent une énergie résiduelle, manipulés récemment.`),
];

const clues = [
  new Clue(1, `Empreinte de pas ensanglantée`, `Mène hors de la salle vers le sanctuaire.`),
  new Clue(2, `Amulette en forme de dragon`, `Liée à une secte de culte draconique.`),
  new Clue(
    3,
    `Note cryptée`,
    `Évoque un "Maître" et un "temps opportun" pour utiliser la Couronne. Signée "R".`
  ),
  new Clue(4, `Réaction de Raphaël`, `Son malaise face aux artefacts émettant une lumière étrange.`),
  new Clue(5, `Empreintes de pas`, `Correspondent à la taille des bottes de Darian.`),
  new Clue(6, `Dague rituelle`, `Preuve matérielle d’un rituel lié au culte sombre.`),
  new Clue(7, `Parchemin d’invocation`, `Décrit un rituel nécessitant la Couronne et un sacrifice.`),
  new Clue(8, `Cristaux magiques`, `Indiquent une activité magique récente.`),
];

module.exports = { characters, locations, items, clues, Character, Location, Item, Clue };
