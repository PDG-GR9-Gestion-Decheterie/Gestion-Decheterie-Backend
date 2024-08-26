export function flattenObject(obj, prefix = "") {
  const flattened = {};

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        // Récursivité pour aplatir les objets imbriqués
        Object.assign(flattened, flattenObject(obj[key], `${prefix}${key}_`));
      } else {
        // Ajoute la propriété avec le préfixe
        flattened[`${prefix}${key}`] = obj[key];
      }
    }
  }

  return flattened;
}
