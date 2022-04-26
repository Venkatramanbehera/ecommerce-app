const express = require("express");
const router = express.Router();
const auth = require("../middleware/authorization");
const { check, validationResult } = require("express-validator");
const Product = require("../models/Products");
router.post(
  "/",
  [
    auth,
    [
      check("name", "Name is Required").not().isEmpty(),
      check("description", "description is Required").not().isEmpty(),
      check("category", "category is Required").not().isEmpty(),
      check("price", "price is Required").not().isEmpty(),
      check("quantity", "quantity is Required").not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { name, description, category, price, brand, quantity } = req.body;
      const newProduct = new Product({
        userId: req.user.id,
        name,
        description,
        category,
        price,
        brand,
        quantity,
      });
      const product = await newProduct.save();
      res.json({ product });
    } catch (error) {
      // console.error(error.message)
      return res.status(500).json({ msg: "Server Error" });
    }
  }
);

// get all products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ msg: "Server Error" });
  }
});

function isValidObjectID(parameter, name) {
  let checkForValidMongoDbID = new RegExp("^[0-9a-fA-F]{24}$");
  return checkForValidMongoDbID.test(parameter);
}

// get product
router.get("/:id", async (req, res) => {
  // console.log('first', req.params.id);
  if (isValidObjectID(req.params.id) === false) {
    return res.status(400).json({ msg: "Please provide valid object id" });
  }
  try {
    const product = await Product.findById({ _id: req.params.id });
    if (!product) {
      return res.status(400).json({ msg: "Product was not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ msg: "Server Error" });
  }
});

router.get("/instructor/:id", auth, async (req, res) => {
  try {
    const products = await Product.find({ userId: req.params.id });
    res.json(products);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Server Error" });
  }
});

module.exports = router;
