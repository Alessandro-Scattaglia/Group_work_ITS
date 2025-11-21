import { ArrowLeftIcon, StarIcon, PlayIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useFavorites } from "../../components/context/FavoritesContext";
import "./DetailPage.css";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

export default function DetailPage() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);
    const [cast, setCast] = useState([]);
    const [error, setError] = useState(null);
    const { addFavorite, removeFavorite, favorites } = useFavorites();
    const [isFavorite, setIsFavorite] = useState(false);

    // Recupero film e cast
    useEffect(() => {
        async function fetchMovieData() {
            try {
                // Esegue entrambe le chiamate in parallelo
                const [movieResponse, castResponse] = await Promise.all([
                    fetch(`${BASE_URL}/movie/${id}?language=it-IT`, {
                        headers: {
                            Authorization: `Bearer ${ACCESS_TOKEN}`,
                            "Content-Type": "application/json",
                        },
                    }),
                    fetch(`${BASE_URL}/movie/${id}/credits?language=it-IT`, {
                        headers: {
                            Authorization: `Bearer ${ACCESS_TOKEN}`,
                            "Content-Type": "application/json",
                        },
                    }),
                ]);

                if (!movieResponse.ok || !castResponse.ok) {
                    throw new Error("Errore nel recupero dei dati del film");
                }

                const [movieData, castData] = await Promise.all([
                    movieResponse.json(),
                    castResponse.json(),
                ]);

                setMovie(movieData);
                setCast(castData.cast.slice(0, 8)); // Primi 8 membri del cast
            } catch (err) {
                setError(err.message);
            }
        }

        fetchMovieData();
    }, [id]);

    //gestione preferiti
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

    // Gestione errore
    if (error) {
        return (
            <div className="detail-page">
                <div style={{ textAlign: 'center', padding: '2rem', color: 'white' }}>
                    <p>Errore: {error}</p>
                    <Link to="/" className="back-home">
                        <ArrowLeftIcon size={16} /> Torna alla home
                    </Link>
                </div>
            </div>
        );
    }

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

                        {/* MOVIE INFO */}
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
                            <h3>Descrizione</h3>
                            <p className="movie-overview">
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

                        {/* CAST */}
                        <div className="movie-cast">
                            <h3>Cast</h3>
                            {cast.length > 0 ? (
                                <div className="movie-cast-grid">
                                    {cast.map((member) => (
                                        <div key={member.id} className="cast-member">
                                            <img
                                                src={
                                                    member.profile_path
                                                        ? `https://image.tmdb.org/t/p/w200${member.profile_path}`
                                                        : "https://via.placeholder.com/100x150?text=No+Image"
                                                }
                                                alt={member.name}
                                            />
                                            <p>{member.name}</p>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <p>Caricamento cast...</p>
                            )}
                        </div>
                    </div>


                </div>
            )}
        </div>
    );
}