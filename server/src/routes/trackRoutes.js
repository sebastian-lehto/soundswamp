const express = require('express');
const pool = require("../db");
const path = require('path');
const fs = require("fs");

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

module.exports = router