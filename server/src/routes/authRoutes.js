const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const prisma = require('../prismaClient');

const router = express.Router();

router.post("/signup", async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = bcrypt.hashSync(password, 8);
        const newUser = await prisma.user.create({
            data: {
                username,
                email, 
                password: hashedPassword
            }
        });

        const user_id = newUser.id;
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
        const userFound = await prisma.user.findUnique({
            where: {
                username
            }
        })
        
        if (!userFound) return res.status(404).send({ message: "User not found" })

        const passwordIsValid = bcrypt.compareSync(password, userFound.password)
        if (!passwordIsValid) return res.status(404).send({ message: "Password incorrect" });

        const token = jwt.sign({ id: userFound.id }, process.env.JWT_SECRET, {expiresIn: '24h'});
        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.sendStatus(503);
    }

});

module.exports = router