import { useRef } from "react";
import { useFavorites } from "../components/context/FavoritesContext";
import { CaretLeftIcon, CaretRightIcon, Heart } from "@phosphor-icons/react";
import "./FavoritesPage.css";

export default function FavoritesPage() {
    const { favorites, removeFavorite } = useFavorites();
    const scrollRef = useRef(null);

    const scroll = (dir) => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: dir === "left" ? -400 : 400,
                behavior: "smooth",
            });
        }
    };

    if (favorites.length === 0) {
        return (
            <div className="favorites-page">
                <h2>I tuoi film preferiti</h2>
                <p>Nessun film salvato al momento.</p>
            </div>
        );
    }

    return (
        <div className="favorites-page">
            <h2>I tuoi film preferiti</h2>
            <div className="carousel-container">
                <button className="arrow left" onClick={() => scroll("left")}>
                    <CaretLeftIcon size={32} />
                </button>

                <div className="favorites-carousel" ref={scrollRef}>
                    {favorites.map((movie) => (
                        <div key={movie.id} className="movie-card">
                            <img
                                src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                                alt={movie.title}
                            />
                            <div className="overlay">
                                <button
                                    className="fav-btn"
                                    onClick={() => removeFavorite(movie.id)}
                                >
                                    <Heart weight="fill" size={24} color="#E50914" />
                                </button>
                            </div>
                            <p>{movie.title}</p>
                        </div>
                    ))}
                </div>

                <button className="arrow right" onClick={() => scroll("right")}>
                    <CaretRightIcon size={32} />
                </button>
            </div>
        </div>
    );
}
