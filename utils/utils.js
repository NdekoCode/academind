import { fileURLToPath } from "url";
import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const rootDir = path.dirname(__dirname) + path.sep;
export const numberRand = parseFloat(Math.random() * 200).toFixed(2);
export const ratingRand = parseInt(Math.random() * 6);
export const indexRand = parseInt(Math.random() * 100);
/**
 * @description Permettra de charger un fichier en partant du dossier dans lequel il se trourve
 * @author NdekoCode
 * @export
 * @param {string} filePath Le fichier à charger
 * @param {string} [direPath=""] Le dossier dans lequel se trouve se fichier
 * @return {string}
 */
export function loadFile(filePath) {
  let regex = /[\/|\\]/gi;
  filePath = filePath.replaceAll(regex, path.sep);
  return path.join(rootDir, filePath);
}

/**
 * @description Permet de verifier un lien courant et lui donne une classe active
 * @author NdekoCode
 * @export
 * @param {boolean} pathVerify
 * @return {string}
 */
export function activeLink(pathVerify) {
  return pathVerify ? "active" : "text-gray-700";
}
