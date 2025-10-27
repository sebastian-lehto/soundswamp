const express = require('express');
const path = require('path');
const fs = require("fs");
const prisma = require('../prismaClient');

const router = express.Router();

// 🎵 Get a specific track by name
router.get('/track', (req, res) => {
    const options = { root: path.join(__dirname, "../uploads") };
    const filename = req.query.track;
    res.sendFile(filename, options, (err) => {
        if (err) console.error('Error sending file:', err);
        else console.log('Sent:', filename);
    });
});

// 🗑️ Delete a track
router.delete('/track', (req, res) => {
    const { trackname } = req.body;
    const filePath = path.join("./src/uploads/", trackname);

    prisma.track.deleteMany({
        where: { name: trackname }
    }).then(() => {
        console.log("Track deleted from db");
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

// 📜 Get all tracks
router.get('/tracklist', async (req, res) => {
    const allTracks = await prisma.track.findMany();
    const tracknames = allTracks.map(track => track.name);
    res.json(tracknames);
});

// 📜 Get tracks by creator ID
router.get('/tracklist/:id', async (req, res) => {
    const id = parseInt(req.params.id);
    try {
        const tracks = await prisma.track.findMany({
            where: { creatorId: id },
        });
        const tracknames = tracks.map(track => track.name);
        res.json(tracknames);
    } catch (err) {
        console.error(err.message);
        res.sendStatus(503);
    }
});

// 🎲 NEW: Get a random track
router.get('/random', async (req, res) => {
    try {
        const tracks = await prisma.track.findMany();
        if (!tracks || tracks.length === 0) {
            return res.status(404).json({ error: "No tracks found." });
        }

        const randomIndex = Math.floor(Math.random() * tracks.length);
        const randomTrack = tracks[randomIndex];

        const filePath = path.join(__dirname, "../uploads", randomTrack.name);

        // Check if the file exists before sending
        if (!fs.existsSync(filePath)) {
            console.error("File not found:", randomTrack.name);
            return res.status(404).json({ error: "Track file not found." });
        }

        console.log("Sending random track:", randomTrack.name);
        res.sendFile(filePath);
    } catch (err) {
        console.error("Error fetching random track:", err);
        res.status(500).json({ error: "Failed to get random track." });
    }
});

module.exports = router;