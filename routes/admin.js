import { Router } from "express";
const router = Router();

router.get("/add-product", (req, res, next) => {
  console.log("In an other middleware");
  const formProduct = `
    <form action="/product    " method="POST">
      <input type="text" name="product" />
      <button type="submit">Add product</button>
    </form>
    `;
  res.send(formProduct);
});

router.post("/product", (req, res, next) => {
  console.log(req.body);
  res.redirect("/");
});

export default router;
