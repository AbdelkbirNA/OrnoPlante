const {PrismaClient}=require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");

async function updatedUser(req,res) {
    const userId=req.user.userId;
    const { first_name, last_name, email, profile_picture } = req.body;

    let profilePicturePath = null;
  if (req.file) {
    profilePicturePath = `/uploads/users/${req.file.filename}`;
  }
    

if (!userId){
    return res.status(401).json({ error: "Non autorisé" });
}
try{
    const updatedUser = await prisma.user.update({
      where: { user_id: userId },
      data: {
        first_name,
        last_name,
        email,
        ...(profilePicturePath && { profile_picture: profilePicturePath }),
      },
      select: {
        user_id: true,
        first_name: true,
        last_name: true,
        email: true,
        user_type: true,
        registration_date: true,
        profile_picture: true,
      },
    });
    res.json(updatedUser);
}catch (error) {
    console.error("Erreur updateUser:", error);
    res.status(500).json({ error: "Erreur lors de la mise à jour" });
  }
}

async function changePassword(req, res) {
  const userId = req.user.userId;
  const { oldPassword, newPassword, confirmPassword } = req.body;

  if (!oldPassword || !newPassword || !confirmPassword) {
    return res.status(400).json({ error: "Tous les champs sont obligatoires." });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ error: "Le nouveau mot de passe et sa confirmation ne correspondent pas." });
  }

  try {
    const user = await prisma.user.findUnique({ where: { user_id: userId } });

    if (!user) {
      return res.status(404).json({ error: "Utilisateur non trouvé." });
    }

    const isPasswordValid = await bcrypt.compare(oldPassword, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "L'ancien mot de passe est incorrect." });
    }

    const hashedNewPassword = await bcrypt.hash(newPassword, 10);

    await prisma.user.update({
      where: { user_id: userId },
      data: { password: hashedNewPassword },
    });

    res.json({ message: "Mot de passe mis à jour avec succès." });
  } catch (error) {
    console.error("Erreur changePassword:", error);
    res.status(500).json({ error: "Erreur lors de la mise à jour du mot de passe." });
  }
}

module.exports={updatedUser, changePassword};
