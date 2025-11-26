import { ArrowLeftIcon, StarIcon, PlayIcon } from "@phosphor-icons/react";
import { useEffect, useState } from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import { useFavorites } from "../../components/context/FavoritesContext";
import "./DetailPage.css";

// Recupera l'URL base e il token di accesso dall'ambiente
const BASE_URL = import.meta.env.VITE_BASE_URL;
const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

export default function DetailPage() {
    const { id } = useParams();
    const { pathname } = useLocation();
    const type = pathname.includes("/tv") ? "tv" : "movie"; // Determina il tipo corretto (film o serie TV) in base all'URL

    const [item, setItem] = useState(null);
    const [cast, setCast] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const { addFavorite, removeFavorite, favorites } = useFavorites();
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        async function fetchItemData() {
            setLoading(true);
            setError(null);

            // Effettua due chiamate API parallele per ottenere i dettagli del contenuto e il cast
            try {
                const [itemRes, castRes] = await Promise.all([
                    fetch(`${BASE_URL}/${type}/${id}?language=it-IT`, {
                        headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
                    }),
                    fetch(`${BASE_URL}/${type}/${id}/credits?language=it-IT`, {
                        headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
                    }),
                ]);

                if (!itemRes.ok || !castRes.ok) {
                    throw new Error("Errore nel recupero dei dati");
                }

                const [itemData, castData] = await Promise.all([itemRes.json(), castRes.json()]);

                setItem(itemData);
                setCast(castData.cast?.slice(0, 8) || []);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchItemData();
    }, [id, type]);

    // Gestione dei preferiti
    useEffect(() => {
        if (item) {
            setIsFavorite(favorites.some(fav => fav.id === item.id));
        }
    }, [item, favorites]);

    const toggleFavorite = () => {
        if (!item) return;
        const favoriteItem = { ...item, media_type: type };
        isFavorite ? removeFavorite(item.id) : addFavorite(favoriteItem);
        setIsFavorite(!isFavorite);
    };

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
            {loading && <p>Caricamento in corso...</p>}
            {error && <p className="error-message">{error}</p>}
            {!loading && !error && item && (
                <div className="movie-detail-container">
                    <Link to="/" className="back-home">
                        <ArrowLeftIcon size={16} /> Torna alla home
                    </Link>
                    <div className="movie-backdrop">
                        <img
                            src={`https://image.tmdb.org/t/p/original${item.backdrop_path}`}
                            alt={item.title || item.name}
                            className="backdrop-image"
                        />
                        <div className="backdrop-overlay"></div>
                    </div>

                    <div className="movie-content">
                        <div className="movie-poster-section">
                            <img
                                className="movie-poster"
                                src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
                                alt={item.title || item.name}
                            />
                        </div>

                        <div className="movie-info">
                            <h1 className="movie-title">{item.title || item.name}</h1>

                            <div className="movie-meta">
                                <span className="rating">{item.vote_average?.toFixed(1)}/10</span>
                                <span className="release-date">
                                    {new Date(item.release_date || item.first_air_date).getFullYear()}
                                </span>
                                <span className="genres">{item.genres?.map(g => g.name).join(", ")}</span>
                                <span className="runtime">{item.runtime || item.episode_run_time?.[0]} min</span>
                            </div>

                            <h3>Descrizione</h3>
                            <p className="movie-overview">{item.overview}</p>

                            <div className="button-container">
                                <button className="banner-button play">
                                    <PlayIcon size={32} weight="fill" /> Riproduci
                                </button>
                                <button
                                    className="favorite-btn"
                                    onClick={toggleFavorite}
                                    style={{ marginLeft: "10px" }}
                                >
                                    <StarIcon
                                        size={32}
                                        color="#ffd700"
                                        weight={isFavorite ? "fill" : "regular"}
                                    />
                                </button>
                            </div>
                        </div>

                        <div className="movie-cast">
                            <h3>Cast</h3>
                            {cast.length > 0 ? (
                                <div className="movie-cast-grid">
                                    {cast.map(member => (
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
