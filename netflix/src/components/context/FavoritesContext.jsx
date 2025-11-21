import { createContext, useContext } from "react";
import useLocalStorage from "../../hooks/useLocalStorage";

const FavoritesContext = createContext();

export function FavoritesProvider ({ children }) {
    // using the custom hook to manage favorites in localStorage
    const [favorites, setFavorites] = useLocalStorage("favorites", []);

    // add a new favorite if it doesn't already exist
    const addFavorite = (item) => {
        if (!favorites.find((f) => f.id === item.id)) {
            setFavorites([...favorites, item]);
        }
    };

    // remove a favorite by its ID
    const removeFavorite = (id) => {
        setFavorites(favorites.filter((f) => f.id !== id ));
    };

    return (
        // providing favorites and actions to the entire app
        <FavoritesContext.Provider
        value={{favorites, addFavorite, removeFavorite}}
        >
            {children}
        </FavoritesContext.Provider>
    );
}

//hook to access the FavoritesContext
export const useFavorites = () => useContext(FavoritesContext);