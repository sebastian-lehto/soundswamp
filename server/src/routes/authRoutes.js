const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require("../db");

const router = express.Router();

router.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = bcrypt.hashSync(password, 8);
        const newUser = await pool.query(
            "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
            [username, email, hashedPassword]
        );

        const user_id = newUser.rows[0].user_id;
        const token = jwt.sign({ id: user_id }, process.env.JWT_SECRET, { expiresIn: '24h' });

        res.json({ token })
    } catch (err) {
        console.error(err.message);
        res.sendStatus(503);
    }

});

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const userFound = await pool.query(
            "SELECT * FROM users WHERE username=$1",
            [username]
        );
        if (!userFound.rows[0]) return res.status(404).send({ message: "User not found" })

        const user = userFound.rows[0];
        const passwordIsValid = bcrypt.compareSync(password, user.password)
        if (!passwordIsValid) return res.status(404).send({ message: "Password incorrect" });

        const token = jwt.sign({ id: user.user_id }, process.env.JWT_SECRET, {expiresIn: '24h'});
        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.sendStatus(503);
    }

});

module.exports = router