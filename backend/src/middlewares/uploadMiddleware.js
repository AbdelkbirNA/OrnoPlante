const fs = require("fs");
const multer = require("multer");
const path = require("path");

const uploadPath = path.join(__dirname, "../uploads/users");

// Vérifie que le dossier existe, sinon le crée
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadPath); // Chemin déjà sécurisé
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `profile_${Date.now()}${ext}`);
  },
});

const upload = multer({ storage });

module.exports = upload;
