const express = require('express');
const multer = require("multer");
const prisma = require('../prismaClient');

const router = express.Router();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./src/uploads")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage });

router.post('/upload', upload.single('file'), async (req, res) => {
    try {
        const userId = req.userId;
        const {name, genres, tags} = req.body;
        const fileLocation = `./src/uploads/${name}`
        const creatorId = parseInt(userId)

        const newTrack = await prisma.track.create({
            data: {
                name,
                genres,
                tags,
                fileLocation,
                creatorId
            }
        })
        if (newTrack) console.log("Track created")
        console.log("File uploaded")
        res.json(req.file);    
    } catch (err) {
        console.log(err.message)
        res.sendStatus(503);
    }
    
});



module.exports = router;