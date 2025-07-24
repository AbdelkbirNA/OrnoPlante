const {PrismaClient}=require("@prisma/client");
const prisma = new PrismaClient();



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


module.exports={updatedUser};
