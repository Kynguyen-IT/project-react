const express = require("express");
const router = express.Router();

const ProductCrtl = require("../controllers/product");

router.get("/", ProductCrtl.GetAllProducts);

router.post("/create", ProductCrtl.CreateProduct);

router.delete("/:id", ProductCrtl.DeleteProduct);

router.get("/:id", ProductCrtl.GetProductById);

router.put("/:id", ProductCrtl.UpdateProductById);

module.exports = router;
