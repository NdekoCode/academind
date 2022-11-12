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

/**
 * Le produit à vendre
 * @typedef {object} Product
 * @property {number} id L'identifiant de l'article
 * @property {string} title Titre de l'article
 * @property {string} slug Le slug pour l'URL descriptif de l'article
 * @property {number} price Le prix de l'article
 * @property {string} description description de l'article
 * @property {string} [imageUrl="https://loremflickr.com/g/500/320/product,book?lock=5"] image de l'article
 * @property {number} rating La note de l'article
 * @property {string} slug L'URL vers l'article
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
  /**
   * @description Enregistre un utilisateur dans la base de donnée
   * @author NdekoCode
   * @return {void}
   * @memberof UserMDL
   */
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
  /**
   * @description Recupère un utilisateur grace à l'element passer en paramètre
   * @author NdekoCode
   * @static
   * @param {object} params
   * @return {User}
   * @memberof UserMDL
   */
  static async findOneBy(params) {
    try {
      const user = await UserMDL.makeQueryOn("users").find(params).next();
      return user;
    } catch (error) {
      return console.log(error);
    }
  }

  /**
   * @description Recupère un utilisateur grace à son identifiant
   * @author NdekoCode
   * @static
   * @param {ObjectId} userId
   * @return {User}
   * @memberof UserMDL
   */
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
    const updatedCart = {
      items: updateProducts,
    };
    UserMDL.query.updateOne(
      { _id: new ObjectId(this._id) },
      { $set: { cart: updatedCart } }
    );
  }
  /**
   * @description Recupere tous les produits d'un panier
   * @author NdekoCode
   * @return {Product[]}
   * @memberof UserMDL
   */
  async getCart() {
    // On recupère uniquement les identifiant dans le tableau
    const productIds = this.cart.items.map((item) => item.productId);
    let products = await UserMDL.makeQueryOn("products")
      .find({
        _id: { $in: productIds },
      })
      .toArray();
    return products.map((product) => ({
      ...product,
      quantity: this.cart.items.find(
        (p) => p.productId.toString() === product._id.toString()
      ).quantity,
    }));
  }
  /**
   * @description Supprime un produit dans le panier
   * @author NdekoCode
   * @param {ObjectId} productId
   * @memberof UserMDL
   */
  deleteItemFromCart(productId) {
    const updateCartItem = this.cart.items.filter(
      (item) => item.productId.toString() !== productId.toString()
    );
    UserMDL.query.updateOne(
      { _id: this._id },
      { $set: { cart: { items: updateCartItem } } }
    );
  }
}
