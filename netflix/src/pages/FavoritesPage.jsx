import { useFavorites } from "../components/context/FavoritesContext";
import { ArrowLeftIcon, StarIcon } from "@phosphor-icons/react";
import { Link } from "react-router-dom";
import "./FavoritesPage.css";

export default function FavoritesPage() {
    const { favorites, addFavorite, removeFavorite } = useFavorites();

    return (
        <div className="favorites-page">
            <Link to="/" className="home"><ArrowLeftIcon weight="bold" size={16}/> Torna alla home</Link>
            <h1>I tuoi film preferiti</h1>
            {favorites.length > 0 ? (
                <div className="favorites-grid">
                    {favorites.map((movie) => {
                        const isFav = favorites.some(f => f.id === movie.id);

                        return (
                            <div key={movie.id} className="movie-card">
                                <img className="movie-img"
                                    src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                    alt={movie.title}
                                />
                                <p>{movie.title}</p>

                                <button
                                    className={`fav-btn ${isFav ? "fav" : ""}`}
                                    onClick={() =>
                                        isFav
                                            ? removeFavorite(movie.id)
                                            : addFavorite({
                                                id: movie.id,
                                                title: movie.title,
                                                poster_path: movie.poster_path,
                                            })
                                    }
                                >
                                    {isFav ? <StarIcon weight="fill" size={24} color="#ffd700" /> : <StarIcon size={24} />}
                                </button>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <p>Non hai ancora aggiunto nessun film preferito.</p>
            )}
        </div>
    );
}
