const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes"); 
const profilRoute = require("./routes/profilRoute"); 
const updatroute = require("./routes/updateRoutes"); 
const path = require("path");



const app = express();
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

app.get("/", (req, res) => {
  res.send("hi");
});

app.use("/api", authRoutes); 
app.use("/api/",profilRoute);
app.use("/api/",updatroute);

module.exports = app;
