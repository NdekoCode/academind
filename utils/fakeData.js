import slugify from "slugify";
import ProductMDL from "../models/ProductMDL.js";
async function fakeData() {
  const response = await fetch("https://fakestoreapi.com/products");
  const responseData = await response.json();
  for (let { title, price, description, image, rating } of responseData) {
    ProductMDL.create({
      title,
      price,
      description,
      imageUrl: image,
      rating: parseInt(rating.rate),
      slug: slugify(title, { lower: true }),
    });
  }
}
export default fakeData;
