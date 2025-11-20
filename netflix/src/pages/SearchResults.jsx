import { useSearchParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";


import MovieRow from "../components/MovieRow/MovieRow";
import { ArrowLeftIcon } from "@phosphor-icons/react";

import "./SearchResults.css";


const BASE_URL = import.meta.env.VITE_BASE_URL;
const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;


export default function SearchResults() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q");

    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!query) {
            setResults([]); // Resetta i risultati se la query è vuota
            return;
        }

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
    }, [query]); // Aggiunto il listener per la query

    useEffect(() => {
        // Forza l'aggiornamento quando cambia la query
        setResults([]);
    }, [query]);

    return (
        <div>
            <Link to="/" className="home"><ArrowLeftIcon weight="bold" size={16}/> Torna alla home</Link>
            <h1 className="risultati">Risultati di ricerca</h1>

            {query ? (
                <>
                    {/* gestione loading */}
                    {loading && <p>Caricamento...</p>}
                    {error && <p style={{ color: "red" }}>Errore: {error}</p>}

                    <div>
                        {results.length > 0 ? (
                            <MovieRow title={`Risultati per: ${query}`} movies={results} />
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
