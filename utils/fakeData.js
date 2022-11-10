import slugify from "slugify";
import CartItemMDL from "../models/CartItemMDL.js";
import CartMDL from "../models/CartMDL.js";
import OrderItemMDL from "../models/OrderItemMDL.js";
import OrderMDL from "../models/OrderMDL.js";
import ProductMDL from "../models/ProductMDL.js";
import UserMDL from "../models/UserMDL.js";
async function fakeData() {
  // UserMDL.truncate({ cascade: true, restartIdentity: true });
  // ProductMDL.truncate({ cascade: true, restartIdentity: true });
  const response = await fetch("https://fakestoreapi.com/products");
  const responseData = await response.json();
  const responseUser = await fetch("https://fakestoreapi.com/users");
  const responseUserData = await responseUser.json();

  await UserMDL.create({
    username: "Ndekocode",
    email: "arickbulakali@gmail.com",
    firstname: "Arick",
    lastname: "Bulakali",
    password: "Ndekocode",
    address: `Goma / Virunga No. 078`,
    slug: slugify("Ndekocode", { lower: true }),
  });
  for (let { email, username, password, name, address } of responseUserData) {
    await UserMDL.create({
      username,
      email,
      firstname: name.firstname,
      lastname: name.lastname,
      password,
      address: `${address.city} / ${address.street} No. ${address.number}`,
      slug: slugify(username, { lower: true }),
    });
  }
  await UserMDL.create({
    username: "Golla golla",
    email: "golagola@gmail.com",
    firstname: "Gloire",
    lastname: "Mutaliko",
    password: "Gola123",
    address: `Goma / Himbi No. 078`,
    slug: slugify("Golla golla", { lower: true }),
  });
  for (let { title, price, description, image, rating } of responseData) {
    await ProductMDL.create({
      title,
      price,
      description,
      imageUrl: image,
      rating: parseInt(rating.rate),
      slug: slugify(title, { lower: true }),
      userId: parseInt(Math.random() * 9 + 1),
    });
  }

  for (let i = 1; i < 6; i++) {
    await CartMDL.create({
      userId: i,
    });
  }

  for (let prod of responseData) {
    await CartItemMDL.create({
      quantity: parseInt(Math.random() * 4 + 1),
      cartId: parseInt(Math.random() * 5 + 1),
      productId: parseInt(Math.random() * 19 + 1),
    });
  }

  for (let i = 1; i < 6; i++) {
    await OrderMDL.create({
      userId: i,
    });
  }
  for (let i = 1; i < 6; i++) {
    await OrderItemMDL.create({
      orderId: parseInt(Math.random() * 5 + 1),
      productId: parseInt(Math.random() * 19 + 1),
    });
  }
}
export default fakeData;
