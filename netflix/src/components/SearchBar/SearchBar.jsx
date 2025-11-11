import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import "./Searchbar.css";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";

export default function SearchBar() {
    const [open, setOpen] = useState(false); //se la barra è aperta o no
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    //submit della ricerca
    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            navigate(`/search?q=${encodeURIComponent(query)}`);
            setQuery("");
            setOpen(false); //chiude barra dopo submit
        }
    };

    return (
        <div className="search-container">
            {!open && (
                //lente iniziale
                <div className="search-icon-only" onClick={() => setOpen(true)}>
                    <MagnifyingGlassIcon size={24} weight="bold" />
                </div>
            )}

            {open && (

                <form className="search-form" onSubmit={handleSubmit}>
                    <button type="button" className="search-icon-inside" onClick={() => setOpen(false)}>
                        <MagnifyingGlassIcon size={24} weight="bold" />
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
