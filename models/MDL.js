import { getDB } from "../utils/database.js";

export default class MDL {
  /**
   * @description La connection à la base de donnée
   * @author NdekoCode
   * @static
   * @memberof MDL
   */
  getDB() {
    return getDB();
  }
}
