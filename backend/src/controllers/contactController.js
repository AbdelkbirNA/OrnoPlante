const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

exports.createContactMessage = async (req, res) => {
  try {
    const {
      contactType,
      name,
      email,
      phone,
      company,
      subject,
      message,
      newsletter
    } = req.body

    if (!contactType || !name || !email || !subject || !message) {
      return res.status(400).json({ error: 'Champs obligatoires manquants' })
    }

    const contactMessage = await prisma.contactMessage.create({
      data: {
        contact_type: contactType,
        name,
        email,
        phone: phone || null,
        company: company || null,
        subject,
        message,
        newsletter: newsletter || false,
      },
    })

    res.status(201).json({ message: 'Message enregistré', data: contactMessage })
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Erreur serveur' })
  }
}
exports.getAllContactMessages = async (req, res) => {
  try {
    const messages = await prisma.contactMessage.findMany({
      orderBy: {
        created_at: 'desc', // pour afficher les plus récents en premier
      },
    });

res.status(200).json(messages); // ✅ tu renvoies un tableau directement
  } catch (error) {
    console.error('Erreur lors de la récupération des messages:', error);
    res.status(500).json({ error: 'Erreur serveur lors de la récupération des messages' });
  }
};

