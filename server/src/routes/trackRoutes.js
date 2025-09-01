const express = require('express');
const path = require('path');
const fs = require("fs");
const prisma = require('../prismaClient');

const router = express.Router();

router.get('/track', (req, res) => {
    const options = {
        root: path.join(__dirname, "../uploads")
    };
    const filename = req.query.track
    res.sendFile(filename, options, function (err) {
        if (err) {
            console.error('Error sending file:', err);
        } else {
            console.log('Sent:', filename);
        }
    });
});

router.get('/tracklist', (req, res) => {
    const directoryPath = path.join(__dirname, "../uploads")
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return console.log("Unable to scan directory: " + err)
        }
        res.send(JSON.stringify(files));
        res.end();
    });
})

router.post('/newTrack', async (req, res) => {
    try {
        const { name } = req.body;
        const userId = req.userId;
        console.log("USERID : " + userId)
        const fileLocation = '../uploads/' + name;

        const newTrack = await prisma.track.create({
            data: {
                name,
                creatorId: userId,
                fileLocation
            }
        });
        res.json({ newTrack })
    } catch (err) {
        console.error(err.message);
        res.sendStatus(503);
    }
});

router.get('/tracksFor/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const tracks = await prisma.track.findMany({
            where: {
                creatorId: id,
            },
        });
        res.json(tracks)
    } catch (err) {
        console.error(err.message);
        res.sendStatus(503);
    }
});

module.exports = router