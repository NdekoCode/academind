import { Schema, model } from "mongoose";
import ErrorsCTRL from "../controllers/ErrorsCTRL.js";
// import MDL from "./MDL.js";
/** @type {Schema} */
const ProductSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
  },
  slug: {
    type: String,
    required: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    // Le nom en minuscule de la collection que fait reference ce document
    ref: "User",
    required: true,
  },
});
/**
 * Represente le produit à vendre lui-meme
 */
// export default class ProductMDL extends MDL {
//   /**
//    * Creates an instance of ProductMDL.
//    * @author NdekoCode
//    * @param {Product} product
//    * @memberof ProductMDL
//    */
//   static collection = "products";
//   constructor(product) {
//     super("products");
//     this.title = product.title;
//     this.price = parseFloat(product.price);
//     this.slug = product.slug;
//     this.description = product.description;
//     this.rating = parseInt(product.rating);
//     this.imageUrl = product.imageUrl;
//     this.userId = product.userId;
//     if (product.id) {
//       this._id = new ObjectId(product.id);
//     }
//   }

//   async save() {
//     try {
//       if (this._id) {
//         // update product
//         await ProductMDL.query.updateOne(
//           { _id: new ObjectId(this._id) },
//           { $set: this }
//         );
//       } else {
//         await ProductMDL.query.insertOne(this);
//       }
//     } catch (error) {
//       return console.log(error.message);
//     }
//   }

//   static async fetchAll() {
//     try {
//       const products = await ProductMDL.makeQueryOn().find().toArray();
//       return products;
//     } catch (err) {
//       return console.log(err);
//     }
//   }
//   static async findOneBy(params) {
//     try {
//       const product = await ProductMDL.makeQueryOn().find(params).next();
//       return product;
//     } catch (err) {
//       return console.log(err);
//     }
//   }
//   static async findById(id) {
//     try {
//       const product = await ProductMDL.makeQueryOn()
//         .find({
//           _id: new ObjectId(id),
//         })
//         .next();
//       return product;
//     } catch (err) {
//       return console.log(err);
//     }
//   }
//   static async deleteById(prodId) {
//     try {
//       return ProductMDL.makeQueryOn().deleteOne({
//         _id: new ObjectId(prodId),
//       });
//     } catch (error) {
//       return console.log(error);
//     }
//   }
// }
/** @type {Model} */
const ProductMDL = new model("Product", ProductSchema);
export default ProductMDL;
