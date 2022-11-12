import { ObjectId } from "mongodb";
import MDL from "./MDL.js";
/**
 * @typedef {object} User Le model de l'UTILISATEUR
 * @property {number} id l'identifiant de l'utilisateur
 * @property {string} username le username de l'utilisateur
 * @property {string} email l'email de l'utilisateur
 * @property {string} firstname Le prenom de l'utilisateur
 * @property {string} lastname Le nom de l'utilisateur
 * @property {string} password Le mot de passe de l'utilisateur
 * @property {string} address L'adresse de l'utilisateur
 * @property {string} slug Le lien d'URL de l'utilisateur
 *
 */
export default class UserMDL extends MDL {
  /**
   * Creates an instance of UserMDL.
   * @author NdekoCode
   * @param {User} user
   * @memberof UserMDL
   */
  constructor(user) {
    super("users");
    this.username = user.username;
    this.email = user.email;
    this.password = user.password;
    this.firstname = user.firstname;
    this.lastname = user.lastname;
    this.address = user.address;
    this.slug = user.slug;
    if (user._id) {
      this._id = new ObjectId(user._id);
    }
    if (user.cart) {
      // this.cart = {items:[]}
      this.cart = user.cart;
    }
  }
  async save() {
    try {
      if (this._id) {
        await UserMDL.query.updateOne({
          _id: new ObjectId(this._id),
          $set: this,
        });
      } else {
        await UserMDL.query.insertOne(this);
      }
    } catch (error) {
      return console.log(error);
    }
  }
  static async findOneBy(params) {
    try {
      const user = await UserMDL.makeQueryOn("users").find(params).next();
      return user;
    } catch (error) {
      return console.log(error);
    }
  }
  static async findById(userId) {
    try {
      const user = await UserMDL.makeQueryOn("users").findOne({
        _id: new ObjectId(userId),
      });
      return user;
    } catch (error) {
      return console.log(error);
    }
  }
  addToCart(product) {
    let updateProducts;
    let quantity = 1;
    if (this.cart) {
      const productIndex = this.cart.items.findIndex(
        (cp) => cp.productId.toString() === product._id.toString()
      );
      updateProducts = [...this.cart.items];
      if (productIndex >= 0) {
        updateProducts[productIndex].quantity += 1;
      } else {
        updateProducts.push({ productId: new ObjectId(product._id), quantity });
      }
    } else {
      updateProducts = [{ productId: new ObjectId(product._id), quantity }];
    }
    console.log(quantity);
    // console.log(updateProducts);
    const updatedCart = {
      items: updateProducts,
    };
    UserMDL.query.updateOne(
      { _id: new ObjectId(this._id) },
      { $set: { cart: updatedCart } }
    );
  }
}
