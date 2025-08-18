const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const addFavorite = async (req, res) => {
    const { plantId } = req.body;
    const userId = req.user.userId;

    try {
        const existingFavorite = await prisma.favorite.findUnique({
            where: {
                user_id_plant_id: {
                    user_id: userId,
                    plant_id: parseInt(plantId, 10),
                },
            },
        });

        if (existingFavorite) {
            return res.status(409).json({ message: 'Cette plante est déjà dans vos favoris.' });
        }

        const favorite = await prisma.favorite.create({
            data: {
                user_id: userId,
                plant_id: parseInt(plantId, 10),
            },
        });
        res.status(201).json({ message: 'Plante ajoutée aux favoris avec succès.', favorite });
    } catch (error) {
        console.error('Erreur lors de l\'ajout aux favoris:', error);
        res.status(500).json({ message: 'Erreur serveur lors de l\'ajout aux favoris.' });
    }
};

const removeFavorite = async (req, res) => {
    const { plantId } = req.body;
    const userId = req.user.userId;

    try {
        await prisma.favorite.delete({
            where: {
                user_id_plant_id: {
                    user_id: userId,
                    plant_id: parseInt(plantId, 10),
                },
            },
        });
        res.status(200).json({ message: 'Plante retirée des favoris avec succès.' });
    } catch (error) {
        console.error('Erreur lors de la suppression du favori:', error);
        res.status(500).json({ message: 'Erreur serveur lors de la suppression du favori.' });
    }
};

const getFavorites = async (req, res) => {
    const userId = req.user.userId;

    try {
        const favorites = await prisma.favorite.findMany({
            where: {
                user_id: userId,
            },
            include: {
                plant: true,
            },
        });
        res.status(200).json(favorites.map(fav => fav.plant));
    } catch (error) {
        console.error('Erreur lors de la récupération des favoris:', error);
        res.status(500).json({ message: 'Erreur serveur lors de la récupération des favoris.' });
    }
};

module.exports = {
    addFavorite,
    removeFavorite,
    getFavorites,
};
