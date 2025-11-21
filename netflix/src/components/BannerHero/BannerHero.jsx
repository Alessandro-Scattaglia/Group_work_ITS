import { useEffect, useState } from "react";
import "./BannerHero.css";
import { StarIcon, PlayIcon, InfoIcon } from "@phosphor-icons/react";
import { useFavorites } from "../context/FavoritesContext";
import { useNavigate } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

export default function BannerHero() {
    const [movie, setMovie] = useState(null);
    const [isFavorite, setIsFavorite] = useState(false);
    const { addFavorite, removeFavorite, favorites } = useFavorites();
    const navigate = useNavigate();

    //fetch a specific movie for the banner
    useEffect(() => {
        fetch(`${BASE_URL}/movie/157336?language=it-IT`, {
            headers: {
                Authorization: `Bearer ${ACCESS_TOKEN}`,
                "Content-Type": "application/json",
            },
        })
            .then((res) => res.json())
            .then((data) => setMovie(data))
            .catch((err) => console.error(err));
    }, []);

    // check if the movie is in favorites
    useEffect(() => {
        if (movie) {
            setIsFavorite(favorites.some((fav) => fav.id === movie.id));
        }
    }, [movie, favorites]);

    //add or remove the movie from favorites
    const toggleFavorite = () => {
        if (isFavorite) {
            removeFavorite(movie.id);
        } else {
            addFavorite(movie);
        }
        setIsFavorite(!isFavorite);
    };

    //navigate to the movie detail page
    const goToDetailPage = () => {
        if (movie) navigate(`/detail/${movie.id}`);
    };

    if (!movie) return <p>Loading...</p>;

    return (
        <header
            className="banner-hero"
            style={{
                backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
            }}
        >
            <div className="banner-content">
                <h1 className="banner-title">{movie.title}</h1>
                <p className="banner-description">{movie.overview}</p>
                <div className="banner-buttons">
                    <button className="banner-button play">
                        <PlayIcon size={32} weight="fill" />
                        Riproduci
                    </button>
                    <button className="banner-button info" onClick={goToDetailPage}>
                        <InfoIcon size={32} /> Altre info
                    </button>
                    <button
                        className={`favorite ${isFavorite ? "active" : ""}`}
                        onClick={toggleFavorite}
                    >
                        <StarIcon size={32} color="#ffd700" weight={isFavorite ? "fill" : "regular"} />
                    </button>
                    <button className="rating">
                        {movie.vote_average.toFixed(1)}/10
                    </button>
                </div>
            </div>
        </header>
    );
}
