const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET;

async function register(req, res) {
  const { first_name, last_name, email, password, confirm_password } = req.body;

  // Validation basique
  if (!first_name || !last_name || !email || !password || !confirm_password) {
    return res.status(400).json({ error: "Tous les champs sont obligatoires" });
  }

  if (password !== confirm_password) {
    return res.status(400).json({ error: "Les mots de passe ne correspondent pas" });
  }

  try {
    // Vérifier si l'utilisateur existe déjà
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email déjà utilisé" });
    }

    // Hasher le mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Créer un nouvel utilisateur
    const newUser = await prisma.user.create({
      data: {
        first_name,
        last_name,
        email,
        password: hashedPassword,
        user_type: "user", // valeur par défaut
      },
    });

    res.status(201).json({
      message: "Utilisateur créé avec succès",
      userId: newUser.user_id,
    });
  } catch (error) {
    console.error("Erreur register:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
}

async function login(req, res) {
  const { email, password } = req.body;

  try {
    // Trouver l'utilisateur par email
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Email incorrect" });
    }

    // Vérifier le mot de passe
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(401).json({ error: "Mot de passe incorrect" });
    }

    // Générer un token JWT
    const token = jwt.sign(
      { userId: user.user_id, userType: user.user_type },
      JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({
      message: "Connexion réussie",
      token,
    });
  } catch (error) {
    console.error("Erreur login:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
}


async function getMe(req, res) {
  try {
    const user = await prisma.user.findUnique({
      where: { user_id: req.user.userId }, // <-- correction ici
      select: { user_id: true, email: true, registration_date: true },
    });

    if (!user) {
      return res.status(404).json({ error: "Utilisateur introuvable" });
    }
console.log(req.user)
    res.json(user);
  } catch (error) {
    console.error("Erreur getMe:", error);
    res.status(500).json({ error: "Erreur serveur" });
  }
}

function logout(req, res) {
  res.json({ message: "Déconnexion réussie" });
}

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteduser = await prisma.user.delete({
      where: {
        user_id: parseInt(id),
      },
    });

    res.status(200).json({
      message: 'Utilisateur supprimé avec succès.',
      user: deleteduser,
    });
  } catch (error) {
    console.error('Erreur lors de la suppression :', error);
    res.status(500).json({ error: "Erreur lors de la suppression de l'utilisateur." });
  }
};


module.exports = {
  register,
  login,
  getMe,
  logout,deleteUser
};
