const express = require("express");
const path = require('path');
const cors = require("cors");
const fs = require("fs");
const multer = require("multer");

const app = express();
app.use(cors());
app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ limit: "500mb", extended: true, parameterLimit: 500000 }));



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage });

app.get('/track', (req, res) => {
    const options = {
        root: path.join(__dirname, "/uploads")
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

app.get('/tracklist', (req, res) => {
    const directoryPath = path.join(__dirname, "/uploads")
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            return console.log("Unable to scan directory: " + err)
        }
        res.send(JSON.stringify(files));
        res.end();
    });
})

app.post('/api/upload', upload.single('file'), (req, res) => {
    console.log("File uploaded")
    res.json(req.file);
});

app.listen(5000, () => {
    console.log("server started on port 5000");
});