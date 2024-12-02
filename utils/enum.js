const ErrorMessages = {
  400: (type) => `Erreur 400 : Mauvaise requête. Le ${type} est mal formé.`,
  401: (type) => `Erreur 401 : Accès non autorisé pour ${type}.`,
  404: (type) => `Erreur 404. Le ${type} n'a pas été trouvé.`,
};

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

module.exports = { ErrorMessages, Races, Classes };
