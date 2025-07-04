const express = require("express");
const path = require('path');
const cors = require("cors");
const fs = require("fs");
const multer = require("multer");
const pool = require("./db")

const app = express();
app.use(cors());
app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ limit: "500mb", extended: true, parameterLimit: 500000 }));


//MIDDLEWARE

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage });



//ROUTES

app.post("/users", async(req, res) => {
    try {
        const {username, email, password} = req.body;
        console.log(username)
        const newUser = await pool.query(
            "INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *",
            [username, email, password]
        );
        res.json(newUser.rows[0])
    } catch (err) {
        console.error(err.message)
    }
    
});

app.post("/user", async(req, res) => {
    try {
        const {username, password} = req.body;
        const userFound = await pool.query(
            "SELECT * FROM users WHERE username=$1 AND password=$2",
            [username, password]
        );

        userFound.rows[0].username ? res.json(userFound.rows[0]) : res.status(404).json({error: "Not found"});
    } catch (err) {
        console.error("ERROR FINDING USER" + err.message)
    }
    
});

app.get("/users", async(req, res) => {
    try {
        const {username, password} = req.body;
        const userFound = await pool.query(
            "SELECT FROM users WHERE username=$1 AND password=$2",
            [username, password]
        );
        res.json(userFound);
    } catch (err) {
        console.error(err.message)
    }
    
});

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