import { getDB } from "../utils/database.js";

export default class MDL {
  static collection;
  static query;
  constructor(collection = "") {
    if (collection) {
      MDL.collection = collection;
    }
    /**
     * @type {TSchema}
     */
    MDL.query = this.getDB().collection(MDL.collection);
  }
  /**
   * @description La connection à la base de donnée
   * @author NdekoCode
   * @static
   * @memberof MDL
   */
  getDB() {
    return getDB();
  }
  static makeQueryOn(collection) {
    return getDB().collection(collection);
  }
}
