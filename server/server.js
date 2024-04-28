const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const User = require("./models/user");
const Restaurant = require("./models/restaurant");

const SECRET_KEY = "super-secret-key";

// connect to express app
const app = express();

const dbURI = process.env.MONGO_URI;
// const dbURI = "mongodb://localhost:3002/UserDB";

mongoose
.connect(dbURI)
.then(() => {
    app.listen(3002, () => {
    console.log("Server connected to port 3002 and MongoDB");
    });
})
.catch((error) => {
    console.log("Unable to connect to Server and/or MongoDB", error);
});

// middleware
app.use(bodyParser.json());
app.use(cors());

//Routes

// REGISTER
//POST REGISTER
app.post("/register", async (req, res) => {
try {
    const { username, location, birthday, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
    username,
    location,
    birthday,
    email,
    password: hashedPassword,
    });
    await newUser.save();
    res.status(201).json({ message: "User created successfully" });
} catch (error) {
    res.status(500).json({ error: "Error signing up" });
}
});

//GET Registered Users
app.get("/register", async (req, res) => {
try {
    const users = await User.find();
    res.status(201).json(users);
} catch (error) {
    res.status(500).json({ error: "Unable to get users" });
}
});

//LOGIN
app.post("/login", async (req, res) => {
try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
    return res.status(401).json({ error: "Invalid credentials" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
    return res.status(401).json({ error: "Wrong Password" });
    }
    const token = jwt.sign({ userId: user._id }, SECRET_KEY, {
    expiresIn: "1hr",
    });
    res.json({ message: "Login successful" });
} catch (error) {
    res.status(500).json({ error: "Error logging in" });
}
});

// GET restaurants
app.get("/restaurants", async (req, res) => {
    try {
        const restaurants = await Restaurant.find();
        res.status(201).json(restaurants);
    } catch (error) {
        res.status(500).json({ error: "Unable to get restaurants" });
    }
});

