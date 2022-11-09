import slugify from "slugify";
import ProductMDL from "../models/ProductMDL.js";
import UserMDL from "../models/UserMDL.js";
async function fakeData() {
  // UserMDL.truncate({ cascade: true, restartIdentity: true });
  // ProductMDL.truncate({ cascade: true, restartIdentity: true });
  const response = await fetch("https://fakestoreapi.com/products");
  const responseData = await response.json();
  const responseUser = await fetch("https://fakestoreapi.com/users");
  const responseUserData = await responseUser.json();

  UserMDL.create({
    username: "Ndekocode",
    email: "arickbulakali@gmail.com",
    firstname: "Arick",
    lastname: "Bulakali",
    password: "Ndekocode",
    address: `Goma / Virunga No. 078`,
    slug: slugify("Ndekocode", { lower: true }),
  });
  for (let {
    id,
    email,
    username,
    password,
    name,
    address,
  } of responseUserData) {
    UserMDL.create({
      username,
      email,
      firstname: name.firstname,
      lastname: name.lastname,
      password,
      address: `${address.city} / ${address.street} No. ${address.number}`,
      slug: slugify(username, { lower: true }),
    });
  }
  UserMDL.create({
    username: "Golla golla",
    email: "golagola@gmail.com",
    firstname: "Gloire",
    lastname: "Mutaliko",
    password: "Gola123",
    address: `Goma / Himbi No. 078`,
    slug: slugify("Golla golla", { lower: true }),
  });
  for (let { title, price, description, image, rating } of responseData) {
    ProductMDL.create({
      title,
      price,
      description,
      imageUrl: image,
      rating: parseInt(rating.rate),
      slug: slugify(title, { lower: true }),
      userId: parseInt(Math.random() * 10),
    });
  }
}
export default fakeData;
