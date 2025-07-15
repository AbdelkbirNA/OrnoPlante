const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

function checkIfLoggedIn(req, res, next) {
  const header = req.headers.authorization;

  if (header && header.startsWith("Bearer ")) {
    const token = header.split(" ")[1];
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      req.user = decoded;

      // Utilisateur déjà connecté, bloquer la route login
      return res.status(400).json({ message: "Vous êtes déjà connecté." });
    } catch (err) {
      req.user = null; // token invalide → laisser passer
    }
  }

  next(); // pas de token → laisser passer
}

module.exports = checkIfLoggedIn;
