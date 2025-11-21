import { useState, useEffect } from "react";
import "./MoviesPage.css";
import MovieRow from "../../components/MovieRow/MovieRow";
import { ArrowLeftIcon } from "@phosphor-icons/react";
import { Link } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

export default function MoviesPage() {
    const [category, setCategory] = useState("all");
    const [categoryMovies, setCategoryMovies] = useState([]);

    const categories = [
        { id: "all", label: "Tutti", endpoint: "/movie/popular" },
        { id: "horror", label: "Horror", endpoint: "/discover/movie?with_genres=27" },
        { id: "action", label: "Azione", endpoint: "/discover/movie?with_genres=28" },
        { id: "anime", label: "Anime", endpoint: "/discover/movie?with_genres=16" },
        { id: "comedy", label: "Commedia", endpoint: "/discover/movie?with_genres=35" },
        { id: "drama", label: "Drammatico", endpoint: "/discover/movie?with_genres=18" },
    ];

    const selectedCat = categories.find((c) => c.id === category);

    // Fetch dei film della categoria selezionata
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

            {/* Menu a tendina */}
            <div className="filter-container">
                <label>Categorie:</label>
                <select
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

            {/* Film della categoria selezionata */}
            {category !== "all" && categoryMovies.length > 0 && (
                <div className="category-grid">
                    {categoryMovies.map((movie) => (
                        <div key={movie.id} className="movie-card-grid">
                            <img
                                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                alt={movie.title}
                            />
                            <p>{movie.title}</p>
                        </div>
                    ))}
                </div>
            )}

            {/* Caroselli fissi solo se nessuna categoria selezionata */}
            {category === "all" && (
                <>
                    <MovieRow
                        title="Popolari"
                        endpoint="/movie/popular?language=it-IT"
                    />

                    <MovieRow
                        title="Top 10 Italia"
                        endpoint="/movie/top_rated?language=it-IT"
                        top10={true}
                    />
                </>
            )}
        </div>
    );
}
