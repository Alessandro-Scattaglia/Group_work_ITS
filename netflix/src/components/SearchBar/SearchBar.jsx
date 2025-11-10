import { useState } from "react";
import { useNavigate } from "react-router";
import "./SearcBar.css";
import { MagnifyingGlassIcon } from "@phosphor-icons/react";

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            // Naviga alla pagina di ricerca con la query come parametro URL
            navigate(`/search?q=${encodeURIComponent(query)}`);
        }
    };

    return (

        <>
            <div className="lente">
                <MagnifyingGlassIcon size={32} weight="bold" />
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Titoli, persone, generi"
                />
                <button type="submit">Cerca</button>
            </form>
        </>
    );
}
