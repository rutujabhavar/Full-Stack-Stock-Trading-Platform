const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../model/User");

const router = express.Router();

router.post("/signup", async (req, res) => {

    try {

        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ email });

        if(existingUser){
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            success: true,
            user
        });

    } catch(err){
        res.status(500).json({
            message: err.message
        });
    }
});

module.exports = router;

//login api 

const jwt = require("jsonwebtoken");

router.post("/login", async (req, res) => {

    try {

        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if(!user){
            return res.status(400).json({
                message: "User not found"
            });
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if(!isMatch){
            return res.status(400).json({
                message: "Invalid credentials"
            });
        }

        const token = jwt.sign(
            { id: user._id },
            "SECRET_KEY",
            { expiresIn: "7d" }
        );

        res.status(200).json({
            success: true,
            token,
            user
        });

    } catch(err){
        res.status(500).json({
            message: err.message
        });
    }
});