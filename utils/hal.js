/**
 * Export des fonctions helpers pour la spécification HAL
 * Voir la spécification HAL : https://stateless.group/hal_specification.html
 * Voir la spécification HAL (RFC, source) : https://datatracker.ietf.org/doc/html/draft-kelly-json-hal
 */

/**
 * Retourne un Link Object, conforme à la spécification HAL
 * @param {*} url
 * @param {*} type
 * @param {*} name
 * @param {*} templated
 * @param {*} deprecation
 * @returns
 */
function halLinkObject(path, type = "", name = "", templated = false, deprecation = false) {
  return {
    href: path,
    templated: templated,
    ...(type && { type: type }),
    ...(name && { name: name }),
    ...(deprecation && { deprecation: deprecation }),
  };
}

module.exports = { halLinkObject };
