import { useState, useEffect, useMemo } from "react";
import MovieRow from "../../components/MovieRow/MovieRow";
import { ArrowLeftIcon, StarIcon } from "@phosphor-icons/react";
import { Link, useNavigate } from "react-router-dom";
import { useFavorites } from "../../components/context/FavoritesContext";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

export default function SerieTvPage() {
    const [category, setCategory] = useState("all");
    const [categorySeries, setCategorySeries] = useState([]);

    const { favorites, addFavorite, removeFavorite } = useFavorites();
    const navigate = useNavigate();

    const favoriteIds = useMemo(() => favorites.map(fav => fav.id), [favorites]);

    const categories = [
        { id: "all", label: "Tutti", endpoint: "/tv/popular" },
        { id: "crime", label: "Crime", endpoint: "/discover/tv?with_genres=80" },
        { id: "scifi", label: "Sci-Fi & Fantasy", endpoint: "/discover/tv?with_genres=10765" },
        { id: "animation", label: "Animazione", endpoint: "/discover/tv?with_genres=16" },
        { id: "comedy", label: "Commedia", endpoint: "/discover/tv?with_genres=35" },
        { id: "drama", label: "Drammatico", endpoint: "/discover/tv?with_genres=18" },
    ];

    const selectedCat = categories.find(c => c.id === category);

    useEffect(() => {
        if (category === "all") {
            setCategorySeries([]);
            return;
        }

        fetch(`${BASE_URL}${selectedCat.endpoint}`, {
            headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
        })
        .then(res => res.json())
        .then(data => {
            setCategorySeries(data.results || []);
        })
        .catch(err => console.error("Errore fetch categoria:", err));
    }, [category]);

    return (
        <div className="movies-page">
            <Link to="/" className="home">
                <ArrowLeftIcon weight="bold" size={16} /> Torna alla home
            </Link>

            <h1 className="page-title">Serie TV</h1>

            <div className="filter-container">
                <label>Categorie:</label>
                <select
                    className="select-filter"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.label}</option>
                    ))}
                </select>
            </div>

            {category !== "all" && categorySeries.length > 0 && (
                <div className="category-grid">
                    {categorySeries.map(series => {
                        const isFav = favoriteIds.includes(series.id);
                        return (
                            <div
                                key={series.id}
                                className="movie-card-grid"
                                onClick={() => navigate(`/tv/${series.id}`)}
                            >
                                <button
                                    className={`fav-btn ${isFav ? "fav" : ""}`}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        isFav
                                            ? removeFavorite(series.id)
                                            : addFavorite({
                                                id: series.id,
                                                title: series.name || series.title,
                                                poster_path: series.poster_path,
                                                type: "tv",
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
                                    src={`https://image.tmdb.org/t/p/w300${series.poster_path}`}
                                    alt={series.name}
                                />
                                <p>{series.name || series.title}</p>
                            </div>
                        );
                    })}
                </div>
            )}

            {category === "all" && (
                <>
                    <MovieRow
                        title="Serie TV Popolari"
                        endpoint="/tv/popular?language=it-IT"
                        type="tv"
                    />
                    <MovieRow
                        title="Serie TV Più Votate"
                        endpoint="/tv/top_rated?language=it-IT"
                        type="tv"
                        top10
                    />
                </>
            )}
        </div>
    );
}
