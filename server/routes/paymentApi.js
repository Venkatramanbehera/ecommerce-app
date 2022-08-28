const express = require("express");
const router = express.Router();
const auth = require("../middleware/authorization");
const Products = require("../models/Products");
const Cart = require("../models/Cart");
const Payment = require("../models/Payment");
const Stripe = require("stripe");
const stripe = Stripe(
  "sk_test_51LbfsGSJsO3HnCHULZeUJICmIa7xHvTlT2Ru0ZoTmPvzfXC9Vp9ifHmGvQyEpbD1HGJ1t3dYLCxMgp2ftL2JdKxx007A2wwpI4"
);

router.post("/", auth, async (req, res) => {
  try {
    const { cart, total, token } = req.body;
    const { card } = token;
    const shippingAddress = {
      address1: card.address_line1,
      address2: card.address_line2,
      city: card.address_city,
      country: card.address_country,
      state: card.address_state,
      zip: card.address_zip,
    };
    stripe.charges.create(
      {
        amount: total * 100,
        currency: "usd",
        receipt_email: token.email,
        source: req.body.token.id,
        description: `payment for the purpose of ${cart.Products.length} items from eShop`,
      },
      async (err, charge) => {
        if (err) {
          return res.send({ status: 400, err });
        }
        if (charge && charge.status === "succeeded") {
          const authorization = {
            ...charge.payment_method_details,
            recipt: charge.recipt.url,
            token: token.id,
          };
          const context = {
            authorization,
            userId: req.user.id,
            cartId: cart._id,
            reference: charge.id,
            transaction: charge.balance_transaction,
            shippingAddress,
          };
          let payment = new Payment(context);
          payment = await payment.save();
          await Cart.findOneAndUpdate(
            { _id: cart._id },
            { $set: { fulfilled: true } },
            { new: true }
          );
          const theCart = await Cart.findById({ _id: cart._id });
          theCart.products.forEach(async (product) => {
            let productDetails = await Products.findById({ _id: product });
            const qty = Number(productDetails.quantity) - 1;
            await Products.findOneAndUpdate(
              { _id: product },
              { $set: { quantity: qty } },
              { new: true }
            );
          });
          res.send({ status: 200 });
        }
      }
    );
  } catch (error) {
    res.sendStatus(500);
  }
});

module.exports = router;
