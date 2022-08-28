const express = require("express");
const router = express.Router();
const auth = require("../middleware/authorization");
const Products = require("../models/Products");
const Cart = require("../models/Cart");
const { isEmpty } = require("lodash");

router.get("/", auth, async (req, res) => {
  try {
    // console.log(req.body);
    const userId = req.user.id;
    const carts = await Cart.find({ userId });
    if (isEmpty(carts)) {
      return res.send({ products: [] });
    }
    let retrivedCart;
    carts.forEach((cart) => {
      if (!cart.fulfilled) {
        retrivedCart = cart;
      }
    });
    let products = [];
    let result;
    if (!isEmpty(retrivedCart)) {
      products = retrivedCart.products.map(
        async (product) => await Products.findById({ _id: product })
      );
      products = await Promise.all(products);
      result = { ...retrivedCart.toJSON(), products };
    }
    res.send({ result });
  } catch (error) {
    res.send(500);
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const cartId = req.params.id;
    const product = req.body.product;
    const cart = await Cart.updateMany(
      { _id: cartId },
      { $pullAll: { products: [product] } }
    );
    res.send({ cart });
  } catch (error) {
    res.send(500);
  }
});

router.post("/", auth, async (req, res) => {
  try {
    const userId = req.user.id;
    const { products } = req.body;
    let cart, unfulfilledCart;
    const carts = await Cart.find({ userId });
    const hasValidCarts = carts.reduce((acc, value) => {
      if (!value.fulfilled) {
        unfulfilledCart = value;
      }
    }, true);
    if (hasValidCarts) {
      cart = new Cart({ userId, products });
      cart = await cart.save();
    } else {
      const stringProduct = [...unfulfilledCart.products, ...products].map(
        (product) => product.toString()
      );
      const newProducts = Array.from(new Set(stringProduct));
      cart = await Cart.findByIdAndUpdate(
        {
          _id: unfulfilledCart._id,
        },
        { products: newProducts }
      );
    }
    let value = cart.products.map(async (id) => await Products.findById(id));
    value = await Promise.all(value);
    res.send({ ...cart.toJSON(), products: value });
  } catch (error) {
    res.send(error);
  }
});
module.exports = router;
