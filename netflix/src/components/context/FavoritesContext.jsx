import { createContext, useContext } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";

const FavoritesContext = createContext();

export function FavoritesProvider ({ children }) {
    // utilizzo di un hook personalizzato per gestire lo stato dei preferiti con localStorage
    const [favorites, setFavorites] = useLocalStorage("favorites", []);

    // aggiunta un nuovo preferito se non esiste già
    const addFavorite = (item) => {
        if (!favorites.find((f) => f.id === item.id)) {
            setFavorites([...favorites, { ...item, media_type: item.media_type }]);
        }
    };

    // rimuove un preferito per id
    const removeFavorite = (id) => {
        setFavorites(favorites.filter((f) => f.id !== id ));
    };

    return (
        // rendere i preferiti e le azioni disponibili in tutta l’app
        <FavoritesContext.Provider
        value={{favorites, addFavorite, removeFavorite}}
        >
            {children}
        </FavoritesContext.Provider>
    );
}

// hook personalizzato per accedere al contesto dei preferiti
export const useFavorites = () => useContext(FavoritesContext);