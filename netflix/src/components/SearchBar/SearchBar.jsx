import { useState } from "react";
import { useNavigate } from "react-router";
import "./Searchbar.css";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";

export default function SearchBar() {
  const [open, setOpen] = useState(false); //traccia se la barra di ricerca è aperta o chiusa
  const [query, setQuery] = useState(""); // stato per memorizzare la query di ricerca
  const navigate = useNavigate();

  //gestisce l'invio della ricerca
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`); //naviga alla pagina di ricerca con la query
      setQuery("");
      setOpen(false); //chiude la barra di ricerca dopo l'invio
    }
  };

  return (
    <div className="search-container">
      {!open ? (
        //mostra solo l'icona di ricerca quando la barra è chiusa
        <div className="search-icon-only" onClick={() => setOpen(true)}>
          <MagnifyingGlassIcon size={28} weight="bold" />
        </div>
      ) : (
        //mostra il modulo di ricerca quando è aperta
        <form className="search-form" onSubmit={handleSubmit}>
          <label htmlFor="search-input" className="visually-hidden">
            Cerca:
          </label>
          <button
            type="button"
            className="search-icon-inside"
            onClick={() => setOpen(false)}
          >
            <MagnifyingGlassIcon size={28} weight="bold" />
          </button>
          <input
            id="search-input"
            name="search"
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Titoli, persone, generi"
          />
        </form>
      )}
    </div>
  );
}
