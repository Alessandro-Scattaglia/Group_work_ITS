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

  const goToDetailPage = (item) => {
    const type = item.media_type === "tv" ? "tv" : "movie"; // Determine type based on media_type
    navigate(`/${type}/${item.id}`);
  };

  return (
    <div className="favorites-page">
      <Link to="/" className="home">
        <ArrowLeftIcon weight="bold" size={16} /> Torna alla home
      </Link>
      <h1>I tuoi film preferiti</h1>
      {favorites.length > 0 ? (
        <div className="favorites-grid">
          {favorites.map((item) => {
            const isFav = true;

            return (
              <div
                key={item.id}
                className="movie-card"
                onClick={() => goToDetailPage(item)}
              >
                <img
                  className="movie-img"
                  src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                  alt={item.title || item.name}
                />
                <p>{item.title || item.name}</p>

                <button
                  className="fav-btn fav"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeFavorite(item.id);
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