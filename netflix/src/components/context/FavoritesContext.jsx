import { createContext, useContext, useState, useEffect } from "react";

const FavoritesContext = createContext();

export function FavoritesProvider ({ children }) {
    const [favorites, setFavorites] = useState(() => {
        const saved = localStorage.getItem("favorites");
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem("favorites", JSON.stringify(favorites));
    }, [favorites]);

    const addFavorite = (item) => {
        if (!favorites.find((f) => f.id === item.id)) {
            setFavorites([...favorites, item]);
        }
    };

    const removeFavorite = (id) => {
        setFavorites(favorites.filter((f) => f.id !== id ));
    };

    return (
        <FavoritesContext.Provider
        value={{favorites, addFavorite, removeFavorite}}
        >
            {children}
        </FavoritesContext.Provider>
    );
}

export const useFavorites = () => useContext(FavoritesContext);