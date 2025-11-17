import { useState, useEffect, useRef } from "react";
import { CaretLeftIcon, CaretRightIcon, StarIcon, } from "@phosphor-icons/react";
import "./MovieRow.css";
import { useFavorites } from "../context/FavoritesContext";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

export default function MovieRow({ title, endpoint }) {
    const [movies, setMovies] = useState([]);
    const scrollRef = useRef(null);
    const { favorites, addFavorite, removeFavorite } = useFavorites();

    useEffect(() => {
        fetch(`${BASE_URL}${endpoint}`, {
            headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
        })
            .then(res => res.json())
            .then(data => setMovies(data.results || []))
            .catch(err => console.error(`Errore nel fetch di ${title}:`, err));
    }, [endpoint, title]);

    const scroll = (dir) => {
        scrollRef.current?.scrollBy({
            left: dir === "left" ? -400 : 400,
            behavior: "smooth",
        });
    };

    return (
        <div className="movie-row">
            <h2>{title}</h2>
            <div className="carousel">
                <button className="arrow left" onClick={() => scroll("left")}>
                    <CaretLeftIcon />
                </button>

                <div className="movies-scroll" ref={scrollRef}>
                    {movies.map((movie) => {
                        const isFav = favorites.some(f => f.id === movie.id);

                        return (
                            <div key={movie.id} className="movie-card">
                                <img
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
                                    {isFav ? <StarIcon  weight="fill" size={24} color="#ffd700" /> : <StarIcon size={24} />}
                                </button>
                            </div>
                        );
                    })}
                </div>

                <button className="arrow right" onClick={() => scroll("right")}>
                    <CaretRightIcon />
                </button>
            </div>
        </div>
    );
}
