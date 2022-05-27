const express = require("express");
const router = express.Router();
const auth = require("../middleware/authorization");
const { check, validationResult } = require("express-validator");
const Profile = require("../models/Profile");
const Products = require("../models/Products");
const User = require("../models/User");

router.get("/:id", async (req, res) => {
  try {
    const profile = await Profile.findOne({ userId: req.params.id });
    if (!profile) {
      return res.status(400).json({ msg: "There is no such profile" });
    }
    res.json(profile);
  } catch (e) {
    console.error(e);
    res.status(500).send("Server Error");
  }
});
router.post(
  "/",
  auth,
  [
    check("address", "Address is required").not().isEmpty(),
    check("bio", "Bio is required").not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      website,
      address,
      bio,
      facebook,
      youtube,
      linkedin,
      instagram,
      twitter,
    } = req.body;
    const profileData = {};
    profileData.userId = req.user.id;
    if (website) profileData.website = website;
    if (address) profileData.address = address;
    if (bio) profileData.bio = bio;

    //   put social media link into a object

    profileData.socialMedia = {};
    if (facebook) profileData.socialMedia.facebook = facebook;
    if (youtube) profileData.socialMedia.youtube = youtube;
    if (linkedin) profileData.socialMedia.linkedin = linkedin;
    if (instagram) profileData.socialMedia.instagram = instagram;
    if (twitter) profileData.socialMedia.twitter = twitter;

    try {
      // check that user is exist or not
      let profile = await Profile.findOne({ userId: req.user.id });
      //   if exists update the user and if not then create the profile
      if (profile) {
        profile = await Profile.findOneAndUpdate(
          { userId: req.user.id },
          { $set: profileData },
          { new: true }
        );
        return res.json(profile);
      }
      profile = new Profile(profileData);
      await profile.save();
      res.json(profile);
    } catch (err) {
      console.error(err);
      res.status(500).send("Server Error");
    }
  }
);
router.delete("/", auth, async (req, res) => {
  try {
    const products = await Products.find({ userId: req.user.id });
    products.forEach(async (product) => {
      await Products.findOneAndRemove({ _id: product._id });
    });
    await Profile.findOneAndRemove({ userId: req.user.id });
    await User.findOneAndRemove({ _id: req.user.id });
    res.json({ msg: "User successfully deleted" });
  } catch (e) {
    console.error(e);
    res.status(500).send("Server Error");
  }
});
module.exports = router;
