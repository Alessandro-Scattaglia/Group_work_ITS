import { useEffect } from "react";
import { useFavorites } from "../../components/context/FavoritesContext";
import { ArrowLeftIcon, StarIcon } from "@phosphor-icons/react";
import { Link, useNavigate } from "react-router-dom";
import "./FavoritesPage.css";

export default function FavoritesPage() {
  const { favorites, removeFavorite } = useFavorites();
  const navigate = useNavigate();

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
            const isFav = true;

            return (
              <div
                key={movie.id}
                className="movie-card"
                onClick={() => goToDetailPage(movie.id)}
              >
                <img
                  className="movie-img"
                  src={`https://image.tmdb.org/t/p/original${movie.poster_path}`}
                  alt={movie.title}
                />
                <p>{movie.title}</p>

                <button
                  className="fav-btn fav"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFavorite(movie.id);
                  }}
                >
                  <StarIcon
                    weight="fill"
                    size={24}
                    color="#ffd700"
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