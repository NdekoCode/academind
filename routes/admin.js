import { Router } from "express";
import {
  activeLink,
  indexRand,
  numberRand,
  ratingRand,
} from "../utils/utils.js";
export const products = [
  {
    title: "Une belle chaussure",
    imageUrl: `https://loremflickr.com/g/500/320/product,book?lock=${indexRand}`,
    price: numberRand,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    rating: ratingRand,
  },
];
const router = Router();
router.get("/add-product", (req, res, next) => {
  return res.render("pages/add-product", {
    pageTitle: "Add a product",
    prods: products,
    path: "/admin/add-product",
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true,
    activeLink,
  });
});

router.post("/add-product", (req, res, next) => {
  const index = indexRand + 1;
  products.push({
    title: req.body.title,
    price: numberRand,
    imageUrl: `https://loremflickr.com/g/500/320/product,book?lock=${index}`,
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    rating: ratingRand,
  });
  return res.redirect("/");
});

export default router;
