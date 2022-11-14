import { model, Schema } from "mongoose";
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

const UserSchema = Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstname: {
    type: String,
    required: false,
  },
  lastname: {
    type: String,
    required: false,
  },

  address: {
    type: String,
    required: false,
  },

  slug: {
    type: String,
    required: false,
  },
  cart: {
    items: [
      {
        productId: {
          // On dit à mongoose que cette partie contiendra un ObjectID
          type: Schema.Types.ObjectId,
          required: true,
          ref: "Product",
        },
        quantity: { type: Number, required: true },
      },
    ],
  },
});
UserSchema.methods.addToCart = function (product) {
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
      updateProducts.push({ productId: product._id, quantity });
    }
  } else {
    updateProducts = [{ productId: product._id, quantity }];
  }
  this.cart = {
    items: updateProducts,
  };
  this.save();
};
UserSchema.methods.deleteItemFromCart = function (prodId) {
  const updateCartItems = this.cart.items.filter(
    (item) => item.productId.toString() === prodId.toString()
  );
  this.cart.items = updateCartItems;
  this.save();
};

UserSchema.methods.clearCart = function () {
  this.cart = { items: [] };
  return this.save();
};
const UserMDL = new model("User", UserSchema);

export default UserMDL;
// export default class UserMDL extends MDL {
//   /**
//    * @description Ajoute une commande de l'utilisateur et supprime les produit du panier
//    * @author NdekoCode
//    * @memberof UserMDL
//    */
//   addOrder() {
//     this.getCart().then((products) => {
//       /** Pour eviter la duplication des données */
//       const order = {
//         items: products,
//         user: {
//           _id: this._id,
//           username: this.username,
//         },
//       };

//       UserMDL.makeQueryOn("orders")
//         .insertOne(order)
//         .then(() => {
//           // Une fois la commande passer on supprime les produits dans le panier
//           this.cart = { items: [] };
//           return UserMDL.query.updateOne(
//             { _id: this._id },
//             { $set: { cart: this.cart } }
//           );
//         });
//     });
//   }
//   async getOrders() {
//     const orders = await UserMDL.makeQueryOn("orders")
//       .find({ "user._id": new ObjectId(this._id) })
//       .toArray();
//     return orders;
//   }
// }
