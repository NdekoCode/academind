import db from "./database.js";
import slugify from "slugify";
async function fakeData() {
  db.execute("TRUNCATE TABLE products");
  const response = await fetch("https://fakestoreapi.com/products");
  const responseData = await response.json();
  for (let { title, price, description, image, rating } of responseData) {
    db.execute(
      "INSERT INTO products(title,price,description,imageUrl,rating,slug) VALUES(?,?,?,?,?,?)",
      [
        title,
        price,
        description,
        image,
        parseInt(rating.rate),
        slugify(title, { lower: true }),
      ]
    );
  }
}
export default fakeData;
