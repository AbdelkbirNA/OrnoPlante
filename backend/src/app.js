const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes"); 
const profilRoute = require("./routes/profilRoute"); 
const updatroute = require("./routes/updateRoutes"); 
const path = require("path");
const multer = require("multer");
const app = express();







const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../uploads/users"); // dossier où seront stockées les images
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    // Par exemple, nommer le fichier avec userId + timestamp
    cb(null, `profile_${Date.now()}${ext}`);
  },
});

const upload = multer({ storage: storage });

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "./uploads")));

app.get("/", (req, res) => {
  res.send("hi");
});

app.use("/api", authRoutes); 
app.use("/api/",profilRoute);
app.use("/api/",updatroute);

module.exports = app;
