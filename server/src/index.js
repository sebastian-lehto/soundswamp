const express = require("express");
const cors = require("cors");
const multer = require("multer");
const authRoutes = require("./routes/authRoutes")
const trackRoutes = require("./routes/trackRoutes");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();
app.use(cors());
app.use(express.json({ limit: "500mb" }));
app.use(express.urlencoded({ limit: "500mb", extended: true, parameterLimit: 500000 }));
app.use(express.static("uploads"))


//  Middleware

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./src/uploads")
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
});

const upload = multer({ storage });



//  Routes

app.use('/auth', authRoutes)
app.use('/tracks', authMiddleware, trackRoutes)

app.post('/api/upload', upload.single('file'), (req, res) => {
    console.log("File uploaded")
    res.json(req.file);
});

app.listen(5000, () => {
    console.log("server started on port 5000");
});