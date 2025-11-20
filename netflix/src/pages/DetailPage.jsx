import { ArrowLeftIcon, StarIcon, PlayIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useFavorites } from "../components/context/FavoritesContext";
import "./DetailPage.css";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

export default function DetailPage() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [error, setError] = useState(null);
    const { addFavorite, removeFavorite, favorites } = useFavorites();
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        async function fetchMovieDetails() {
            try {
                const response = await fetch(`${BASE_URL}/movie/${id}?language=it-IT`, {
                    headers: {
                        Authorization: `Bearer ${ACCESS_TOKEN}`,
                        "Content-Type": "application/json",
                    },
                });

                if (!response.ok) throw new Error("Errore nel recupero dei dettagli del film");

                const data = await response.json();
                setMovie(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchMovieDetails();
    }, [id]);

    useEffect(() => {
        if (movie) {
            const isFav = favorites.some((fav) => fav.id === movie.id);
            setIsFavorite(isFav);
        }
    }, [movie, favorites]);

    const toggleFavorite = () => {
        if (isFavorite) {
            removeFavorite(movie.id);
        } else {
            addFavorite(movie);
        }
        setIsFavorite(!isFavorite);
    };

    return (
        <div className="detail-page">
            {movie && (
                <div className="movie-detail-container">
                    <Link to="/" className="back-home">
                        <ArrowLeftIcon size={16} /> Torna alla home
                    </Link>
                    <div className="movie-backdrop">
                        <img
                            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                            alt={movie.title}
                            className="backdrop-image"
                        />
                        <div className="backdrop-overlay"></div>
                    </div>

                    <div className="movie-content">
                        <div className="movie-poster-section">
                            <img
                                className="movie-poster"
                                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                                alt={movie.title}
                            />
                        </div>

                        <div className="movie-info">
                            <h1 className="movie-title">{movie.title}</h1>

                            <div className="movie-meta">
                                <span className="rating">
                                    {movie.vote_average.toFixed(1)}/10
                                </span>
                                <span className="release-date">
                                    {new Date(movie.release_date).getFullYear()}
                                </span>
                                <span className="genres">
                                    {movie.genres.map((genre) => genre.name).join(", ")}
                                </span>
                                <span className="runtime">
                                    {movie.runtime} min
                                </span>
                            </div>

                            <p className="movie-overview">
                                <h3>Descrizione</h3>
                                {movie.overview}
                            </p>

                            <div className="button-container">
                                <button className="banner-button play">
                                    <PlayIcon size={32} weight="fill" />
                                    Riproduci
                                </button>

                                <button
                                    className="favorite-btn"
                                    onClick={toggleFavorite}
                                    style={{ marginLeft: "10px" }}
                                >
                                    <StarIcon size={32} color="#ffd700" weight={isFavorite ? "fill" : "regular"} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}