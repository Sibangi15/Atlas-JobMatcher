import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { validationResult } from "express-validator";

export const registerUser = async (req, res) => {
    const JWT_SECRET = process.env.JWT_SECRET;
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    //check if the email already exists
    try {
        let user = await User.findOne({ email: req.body.email });
        if (user) { return res.status(400).json({ error: "Sorry an user with this email already exists" }) }

        const salt = await bcrypt.genSalt(10);
        let secPass = await bcrypt.hash(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass,
        })

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({ success, authtoken })

    } catch (error) {
        console.error(error.message);
        console.log(error);
        res.status(500).send("Internal server error");
    }
}

export const loginUser = async (req, res) => {
    const JWT_SECRET = process.env.JWT_SECRET;
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        let user = await User.findOne({ email });
        if (!user) { return res.status(400).json({ error: "Please login with correct credentials" }); }

        const comparePassword = await bcrypt.compare(password, user.password);
        if (!comparePassword) { return res.status(400).json({ success, error: "Please login with correct credentials" }); }

        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.cookie('token', authtoken, {
            httpOnly: true,         // JS cannot access the cookie
            secure: process.env.NODE_ENV === 'production', // cookie only sent over HTTPS in production
            sameSite: 'strict',     // prevents CSRF
            maxAge: 24 * 60 * 60 * 1000 // 1 day in milliseconds
        });
        res.json({ success, authtoken, message: "Login successful" });


    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
}

export const getUser = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findById(userId).select('-password');
        res.json(user);
    } catch (error) {
        console.error("GET USER ERROR:", error);
        res.status(500).send("Internal server error");
    }
}
