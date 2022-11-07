import db from "./database.js";

async function fakeData() {
  db.execute("DROP TABLE IF EXISTS products");
  const response = await fetch("https://fakestoreapi.com/products");
  const responseData = await response.json();
  for (let { title, price, description, image, rating } of responseData) {
    db.execute(
      "INSERT INTO products(title,price,description,imageUrl,rating) VALUES(?,?,?,?,?)",
      [title, price, description, image, parseInt(rating.rate)]
    );
  }
}
export default fakeData;
