const express = require("express");
const cors = require("cors");
const multer = require("multer");
const authRoutes = require("./routes/authRoutes")
const trackRoutes = require("./routes/trackRoutes");
const apiRoutes = require("./routes/apiRoutes");
const userRoutes = require("./routes/userRoutes");
const authMiddleware = require("./middleware/authMiddleware");

const app = express();
app.use(cors());
app.use(express.json({ limit: "500mb" }));

//  Routes

app.use('/auth', authRoutes)
app.use('/tracks', authMiddleware, trackRoutes)
app.use('/api', authMiddleware, apiRoutes)
app.use('/users',  authMiddleware, userRoutes)

app.listen(5000, () => {
    console.log("server started on port 5000");
});