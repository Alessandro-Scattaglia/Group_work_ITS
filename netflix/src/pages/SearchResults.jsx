import { useSearchParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import SearchBar from "../components/SearchBar/SearchBar";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;
const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;

export default function SearchResults() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q");

    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Esegue la ricerca ogni volta che cambia la query
    useEffect(() => {
        //se non c'è nessuna query esce
        if (!query) return;

        async function fetchSearchResults() {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(

                    `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&language=it-IT`,
                    {
                        headers: {
                            Authorization: `Bearer ${ACCESS_TOKEN}`,
                            "Content-Type": "application/json",
                        },
                    }
                );
                //gestione errori
                if (!response.ok) throw new Error("Errore nella chiamata API");

                const data = await response.json();
                setResults(data.results);
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchSearchResults();
    }, [query]);

    return (
        <div>
            <Link to="/">← Torna alla home</Link>
            <h1>Risultati di ricerca</h1>

            <SearchBar />

            {query ? (
                <>
                    <p>Hai cercato: <strong>{query}</strong></p>
                    {/* gestione loading */}
                    {loading && <p>Caricamento...</p>}
                    {error && <p style={{ color: "red" }}>Errore: {error}</p>}

                    <div>
                        {results.length > 0 ? (
                            <ul>
                                {results.map((movie) => (
                                    <li key={movie.id}>
                                        {movie.title} ({movie.release_date?.slice(0, 4)})
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            !loading && <p>Nessun risultato trovato.</p>
                        )}
                    </div>
                </>
            ) : (
                <p>Nessuna query di ricerca.</p>
            )}
        </div>
    );
}
