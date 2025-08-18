"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Heart, Leaf } from "lucide-react"
import { toast } from "sonner"

function PlantCard({ plant, onFavoriteChange, token }) {
    const handleRemoveFavorite = async () => {
        if (!token) {
            toast.error("Veuillez vous connecter pour gérer vos favoris.")
            return
        }

        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/favorites/remove`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ plantId: plant.plant_id }),
            });

            if (res.ok) {
                toast.success("Plante retirée des favoris");
                onFavoriteChange();
            } else {
                toast.error("Une erreur est survenue lors du retrait du favori.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Erreur de connexion.");
        }
    };

    return (
        <Card className="group overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
            <div className="relative">
                <img
                    src={`${process.env.NEXT_PUBLIC_API}${plant.photo_url}`}
                    alt={plant.plant_name}
                    width={250}
                    height={100}
                    className="w-full h-[250px] object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 right-3">
                    <button onClick={handleRemoveFavorite} className="p-2 bg-white/70 hover:bg-white rounded-full">
                        <Heart className="h-5 w-5 fill-red-500 text-red-500" />
                    </button>
                </div>
            </div>
            <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{plant.plant_name}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{plant.description}</p>
            </div>
        </Card>
    );
}

export default function FavoritePlantsList() {
    const [favorites, setFavorites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [token, setToken] = useState(null);

    useEffect(() => {
        const storedToken = localStorage.getItem("token");
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const fetchFavorites = async () => {
        if (!token) return;

        setLoading(true);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API}/api/favorites`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            if (!res.ok) throw new Error("Erreur lors de la récupération des favoris");
            const data = await res.json();
            setFavorites(data);
        } catch (error) {
            console.error(error);
            toast.error("Impossible de charger les favoris.");
            setFavorites([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFavorites();
    }, [token]);

    if (loading) {
        return <div>Chargement des favoris...</div>;
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-4">Mes Plantes Favorites</h2>
            {favorites.length === 0 ? (
                <div className="text-center py-12">
                    <Leaf className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900 mb-2">Aucun favori pour le moment</h3>
                    <p className="text-gray-500">Parcourez notre catalogue et ajoutez des plantes à vos favoris !</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {favorites.map(plant => (
                        <PlantCard key={plant.plant_id} plant={plant} onFavoriteChange={fetchFavorites} token={token} />
                    ))}
                </div>
            )}
        </div>
    );
}
