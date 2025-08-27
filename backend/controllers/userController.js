const User = require("../models/User");

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
};

exports.createUser = async (req, res) => {
    try{
        const {name, email} = req.body;
        const newUser = await User.create({name, email});
        res.json(newUser);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
}