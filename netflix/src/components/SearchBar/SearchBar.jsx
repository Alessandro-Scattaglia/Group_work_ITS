import { useState } from "react";
import { useNavigate } from "react-router";
import "./Searchbar.css";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";

export default function SearchBar() {
  const [open, setOpen] = useState(false); // tracks if the search bar is open
  const [query, setQuery] = useState(""); // stores the search query
  const navigate = useNavigate();

  //handles search submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`); //navigate to search results
      setQuery("");
      setOpen(false); //close the search bar after submission
    }
  };

  return (
    <div className="search-container">
      {!open ? (
        //show search icon when the bar is closed
        <div className="search-icon-only" onClick={() => setOpen(true)}>
          <MagnifyingGlassIcon size={28} weight="bold" />
        </div>
      ) : (
        //show input field when the bar is open
        <form className="search-form" onSubmit={handleSubmit}>
          <button
            type="button"
            className="search-icon-inside"
            onClick={() => setOpen(false)}
          >
            <MagnifyingGlassIcon size={28} weight="bold" />
          </button>
          <input
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
