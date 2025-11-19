import MovieRow from "../components/MovieRow/MovieRow";
import { useFavorites } from "../components/context/FavoritesContext";
import { ArrowLeftIcon } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

export default function FavoritesPage() {
    const { favorites } = useFavorites();

    return (
        <div className="favorites-page">
           <Link to="/" className="home"><ArrowLeftIcon size={16}/> Torna alla home</Link>
            {favorites.length > 0 ? (
                <MovieRow title="I tuoi preferiti" movies={favorites} />
            ) : (
                <p>Non hai ancora aggiunto nessun preferito.</p>
            )}
        </div>
    );
}
