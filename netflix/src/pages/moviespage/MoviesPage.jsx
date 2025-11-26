import { useState, useEffect, useMemo } from "react";
import "./MoviesPage.css";
import MovieRow from "../../components/MovieRow/MovieRow";
import { ArrowLeftIcon, StarIcon } from "@phosphor-icons/react";
import { Link, useNavigate } from "react-router-dom";
import { useFavorites } from "../../components/context/FavoritesContext";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

export default function MoviesPage() {

    // Stato per la categoria selezionata
    const [category, setCategory] = useState("all");
    const [categoryMovies, setCategoryMovies] = useState([]);

    const { favorites, addFavorite, removeFavorite } = useFavorites();

    // Hook per la navigazione
    const navigate = useNavigate();

    const favoriteIds = useMemo(() => {
        return favorites.map(fav => fav.id);
    }, [favorites]);

    // Funzione per navigare alla pagina di dettaglio
    const goToDetailPage = (id) => {
        navigate(`/movie/${id}`);
    };

    const categories = [
        { id: "all", label: "Tutti", endpoint: "/movie/popular" },
        { id: "horror", label: "Horror", endpoint: "/discover/movie?with_genres=27" },
        { id: "action", label: "Azione", endpoint: "/discover/movie?with_genres=28" },
        { id: "anime", label: "Anime", endpoint: "/discover/movie?with_genres=16" },
        { id: "comedy", label: "Commedia", endpoint: "/discover/movie?with_genres=35" },
        { id: "drama", label: "Drammatico", endpoint: "/discover/movie?with_genres=18" },
    ];

    // Trova la categoria selezionata
    const selectedCat = categories.find((c) => c.id === category);

    // Effettua il fetch dei film quando la categoria cambia
    useEffect(() => {
        if (category === "all") {
            setCategoryMovies([]);
            return;
        }

        fetch(`${BASE_URL}${selectedCat.endpoint}`, {
            headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
        })
            .then((res) => res.json())
            .then((data) => setCategoryMovies(data.results || []))
            .catch((err) => console.error("Errore fetch categoria:", err));
    }, [category]);

    return (
        <div className="movies-page">
            <Link to="/" className="home">
                <ArrowLeftIcon weight="bold" size={16} /> Torna alla home
            </Link>
            <h1 className="page-title"> Film</h1>

            <div className="filter-container">
                <label htmlFor="category-select">Categorie:</label>
                <select
                    id="category-select"
                    name="category"
                    className="select-filter"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    {categories.map((cat) => (
                        <option key={cat.id} value={cat.id}>
                            {cat.label}
                        </option>
                    ))}
                </select>
            </div>

            {/*Mostra i film della categoria selezionata */}
            {category !== "all" && categoryMovies.length > 0 && (
                <div className="category-grid">
                    {categoryMovies.map((movie) => {
                        const isFav = favoriteIds.includes(movie.id);

                        return (
                            <div
                                key={movie.id}
                                className="movie-card-grid"
                                onClick={() => goToDetailPage(movie.id)}
                            >
                                <button
                                    className={`fav-btn ${isFav ? "fav" : ""}`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        isFav
                                            ? removeFavorite(movie.id)
                                            : addFavorite({
                                                id: movie.id,
                                                title: movie.title,
                                                poster_path: movie.poster_path,
                                                type: "movie",
                                            });
                                    }}
                                >
                                    <StarIcon
                                        weight={isFav ? "fill" : "regular"}
                                        size={24}
                                        color={isFav ? "#ffd700" : undefined}
                                    />
                                </button>

                                <img
                                    className="movie-img"
                                    src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                                    alt={movie.title}
                                />

                                <p>{movie.title}</p>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* Mostra le righe di film popolari e top 10 se la categoria è "all" */}
            {category === "all" && (
                <>
                    <MovieRow
                        title="Popolari"
                        endpoint="/movie/popular?language=it-IT"
                    />

                    <MovieRow
                        title="Top 10 Italia"
                        endpoint="/movie/top_rated?language=it-IT"
                        /* mostra il carosello top 10 */
                        top10={true}
                    />
                </>
            )}
        </div>
    );
}