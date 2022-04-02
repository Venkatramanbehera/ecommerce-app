const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const jwt = require('jsonwebtoken');
const { check, validationResult } = require('express-validator');
// we need to use User model to create user or find the user
const User = require('../models/User');
const { jwtSecret } = require('../config/keys');

router.get('/', (req, res) => {
    res.send("Users Routes")
})

// router.post('/url', [ check(validator)], callback)

router.post(
    '/',
    [
        check("name", "Name is required").not().isEmpty(),
        check("email", "Please enter a valid email").isEmail(),
        check("password", "Password should have atleast 5 char").isLength({ min: 5 })
    ],
    async (req, res) => {
        const errors = validationResult(req)
        // we will get all the error in validationResult(req) after checking with check() 
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() })
        }
        try {
            const { name, email, password, role } = req.body;
            let user = await User.findOne({ email: email });
            // if we dont use async await we will be getting errors because User.findOne({}) return an
            //  promise so if that return an promise then we use await infront of that oterwise we getting 
            //  User is alredy exsist every time   
            if (user) {
                return res
                    .status(400)
                    .json({ errors: [{ "msg": "User already exists" }] })
            }
            user = new User({ name, email, password, role })
            // first we have to create a salt value as for the company standards using bcrypt.genSalt()
            // then we can hash our password using bcrypt.hash(password, salt )
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(password, salt);
            user.save();
            const payload = {
                user: {
                    id: user.id
                }
            }
            jwt.sign(
                payload,
                jwtSecret,
                { expiresIn: 3600 * 24 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token })
                }
            )
            // res.status(200).json({ "msg": "User created sucessfully" })
        } catch (error) {
            console.error(error);
            res.status(500).json({ errors: [{ "msg": "Server Error" }] })
        }
    })

module.exports = router