import { readFile, writeFile } from "node:fs";
import { loadFile } from "../utils/utils.js";
export default class MDL {
  static getProductFromFile(cb, file = "products.json") {
    readFile(loadFile("data/" + file), (err, content) => {
      if (err) {
        cb([]);
        return [];
      } else {
        cb(JSON.parse(content));
        return JSON.parse(content);
      }
    });
  }
  /**
   * @description Insert a new thing into a file
   * @author NdekoCode
   * @static
   * @param {*} data
   * @param {string} [file="products.json"]
   * @memberof MDL
   */
  static insertFromFile(data, file = "data/products.json") {
    writeFile(file, JSON.stringify(data, null, 2), (err) => console.log(err));
  }
}
