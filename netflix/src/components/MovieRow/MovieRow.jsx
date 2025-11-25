import { useState, useEffect, useRef } from "react";
import { CaretLeftIcon, CaretRightIcon, StarIcon } from "@phosphor-icons/react";
import "./MovieRow.css";
import { useFavorites } from "../context/FavoritesContext";
import { Link } from "react-router-dom";

const BASE_URL = import.meta.env.VITE_BASE_URL;
const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

export default function MovieRow({ title, endpoint, movies: propMovies, type = "movie", top10 = false }) {
  const [movies, setMovies] = useState(propMovies || []);
  const scrollRef = useRef(null);
  const { favorites, addFavorite, removeFavorite } = useFavorites();

  useEffect(() => {
    if (propMovies) return;

    fetch(`${BASE_URL}${endpoint}`, {
      headers: { Authorization: `Bearer ${ACCESS_TOKEN}` },
    })
      .then((res) => res.json())
      .then((data) => {
        let results = data.results || [];
        if (top10) results = results.slice(0, 10);
        setMovies(results);
      })
      .catch((err) => console.error(`Error fetching ${title}:`, err));
  }, [endpoint, propMovies, title, top10]);

  const scroll = (dir) => {
    const scrollAmount = (scrollRef.current?.offsetWidth || 0) * 0.8;
    scrollRef.current?.scrollBy({
      left: dir === "left" ? -scrollAmount : scrollAmount,
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

            // Usa sempre movie.type se esiste, altrimenti fallback al prop type
            const movieType = movie.type || type;

            return (
              <div key={movie.id} className="movie-card">
                <Link to={`/${movieType}/${movie.id}`}>
                  <img
                    className="movie-img"
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt={movie.title || movie.name}
                  />
                </Link>
                <p>{movie.title || movie.name}</p>

                <button
                  className={`fav-btn ${isFav ? "fav" : ""}`}
                  onClick={() =>
                    isFav
                      ? removeFavorite(movie.id)
                      : addFavorite({
                          id: movie.id,
                          title: movie.title || movie.name,
                          poster_path: movie.poster_path,
                          type: movieType, // Salva il tipo nei preferiti
                        })
                  }
                >
                  <StarIcon
                    size={24}
                    weight={isFav ? "fill" : "regular"}
                    color={isFav ? "#ffd700" : undefined}
                  />
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
