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

router.delete('/track', (req, res) => {
    console.log(req.body);
    const { trackname } = req.body;
    const filePath = path.join( "./src/uploads/" + trackname);

    prisma.track.deleteMany({
        where: { name: trackname }
    }).then(() => {
        console.log("Track deleted from db")
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error('Error deleting file:', err);
                res.sendStatus(500);
            } else {
                console.log('File deleted:', trackname);
                res.sendStatus(200);
            }
        });
    });
});

router.get('/tracklist', async (req, res) => {
    const allTracks = await prisma.track.findMany();
    const tracknames = allTracks.map(track => track.name);
    res.json(tracknames);
    res.end();
});

router.get('/tracklist/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const tracks = await prisma.track.findMany({
            where: {
                creatorId: id,
            },
        });
        const tracknames = tracks.map(track => track.name);
        res.json(tracknames)
    } catch (err) {
        console.error(err.message);
        res.sendStatus(503);
    }
});

module.exports = router