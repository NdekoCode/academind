import slugify from "slugify";
/* import CartItemMDL from "../models/CartItemMDL.js";
import CartMDL from "../models/CartMDL.js";
import OrderItemMDL from "../models/OrderItemMDL.js";
import OrderMDL from "../models/OrderMDL.js"; */
import ProductMDL from "../models/ProductMDL.js";
import UserMDL from "../models/UserMDL.js";
// import UserMDL from "../models/UserMDL.js";
async function fakeData() {
  // UserMDL.truncate({ cascade: true, restartIdentity: true });
  // ProductMDL.truncate({ cascade: true, restartIdentity: true });
  const response = await fetch("https://fakestoreapi.com/products");
  const responseData = await response.json();
  const responseUser = await fetch("https://fakestoreapi.com/users");
  const responseUserData = await responseUser.json();
  const user = new UserMDL({
    username: "Ndekocode",
    email: "arickbulakali@gmail.com",
    firstname: "Arick",
    lastname: "Bulakali",
    password: "Ndekocode",
    address: `Goma / Virunga No. 078`,
    slug: slugify("Ndekocode", { lower: true }),
  });
  user.save();
  for (let { email, username, password, name, address } of responseUserData) {
    const fakeUser = new UserMDL({
      username,
      email,
      firstname: name.firstname,
      lastname: name.lastname,
      password,
      address: `${address.city} / ${address.street} No. ${address.number}`,
      slug: slugify(username, { lower: true }),
    });
    fakeUser.save();
  }
  const newUser = new UserMDL({
    username: "Golla golla",
    email: "golagola@gmail.com",
    firstname: "Gloire",
    lastname: "Mutaliko",
    password: "Gola123",
    address: `Goma / Himbi No. 078`,
    slug: slugify("Golla golla", { lower: true }),
  });
  newUser.save();
  for (let { title, price, description, image, rating } of responseData) {
    const product = new ProductMDL({
      title,
      price,
      description,
      imageUrl: image,
      rating: parseInt(rating.rate),
      slug: slugify(title, { lower: true }),
      userId: parseInt(Math.random() * 9 + 1),
    });
    await product.save();
  }
  /* 
  for (let i = 1; i < 6; i++) {
    await CartMDL.create({
      userId: i,
    });
  }

  for (let i = 1; i < 7; i++) {
    await OrderMDL.create({
      userId: i,
    });
  } */
}

export default fakeData;
