import { fileURLToPath } from "url";
import path from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const rootDir = path.dirname(__dirname)+path.sep;
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
