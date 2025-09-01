const express = require('express');
const prisma = require('../prismaClient');


const router = express.Router();

router.get('/userlist', async (req, res) => {
    try {
        const userlist = await prisma.user.findMany();
        res.json(userlist)
    } catch (err) {
        console.error(err.message);
        res.sendStatus(503);
    }     
})

router.get('/user/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const user = await prisma.user.findUnique({
            where: {
                id:id
            },
        });
        res.json(user)
    } catch (err) {
        console.error(err.message);
        res.sendStatus(503);
    }     
})

module.exports = router