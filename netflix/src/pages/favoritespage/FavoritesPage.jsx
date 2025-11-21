import { useEffect } from "react";
import { useFavorites } from "../../components/context/FavoritesContext";
import { ArrowLeftIcon, StarIcon } from "@phosphor-icons/react";
import { Link, useNavigate } from "react-router-dom";
import "./FavoritesPage.css";

export default function FavoritesPage() {
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const navigate = useNavigate();

  //scroll to top when the page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const goToDetailPage = (movieId) => {
    navigate(`/detail/${movieId}`);
  };

  return (
    <div className="favorites-page">
      <Link to="/" className="home">
        <ArrowLeftIcon weight="bold" size={16} /> Torna alla home
      </Link>
      <h1>I tuoi film preferiti</h1>
      {favorites.length > 0 ? (
        <div className="favorites-grid">
          {favorites.map((movie) => {
            const isFav = favorites.some((f) => f.id === movie.id);

            return (
              <div
                key={movie.id}
                className="movie-card"
                onClick={() => goToDetailPage(movie.id)}
              >
                <img
                  className="movie-img"
                  src={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
                  alt={movie.title}
                />
                <p>{movie.title}</p>

                <button
                  className={`fav-btn ${isFav ? "fav" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation(); // Prevent triggering the card click
                    isFav
                      ? removeFavorite(movie.id)
                      : addFavorite({
                          id: movie.id,
                          title: movie.title,
                          poster_path: movie.poster_path,
                        });
                  }}
                >
                  <StarIcon
                    weight={isFav ? "fill" : "regular"}
                    size={24}
                    color={isFav ? "#ffd700" : undefined}
                  />
                </button>
              </div>
            );
          })}
        </div>
      ) : (
        <p>Non hai ancora aggiunto nessun film preferito.</p>
      )}
    </div>
  );
}
