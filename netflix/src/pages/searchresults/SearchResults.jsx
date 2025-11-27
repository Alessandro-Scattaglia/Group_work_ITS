import { useSearchParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";


import MovieRow from "../../components/MovieRow/MovieRow";
import { ArrowLeftIcon } from "@phosphor-icons/react";

import "./SearchResults.css";


// Recupera l'URL base e il token di accesso dall'ambiente
const BASE_URL = import.meta.env.VITE_BASE_URL;
const ACCESS_TOKEN = import.meta.env.VITE_ACCESS_TOKEN;


export default function SearchResults() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q"); // prende il parametro di ricerca "q"

    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!query) {
            setResults([]); // pulisce i risultati se non c'è query
            return;
        }

        async function fetchSearchResults() {
            setLoading(true);
            setError(null);

            // Effettua due chiamate API in parallelo per film e serie TV
            try {
                const [movieResponse, tvResponse] = await Promise.all([
                    fetch(
                        `${BASE_URL}/search/movie?query=${encodeURIComponent(query)}&language=it-IT`,
                        {
                            headers: {
                                Authorization: `Bearer ${ACCESS_TOKEN}`,
                                "Content-Type": "application/json",
                            },
                        }
                    ),
                    fetch(
                        `${BASE_URL}/search/tv?query=${encodeURIComponent(query)}&language=it-IT`,
                        {
                            headers: {
                                Authorization: `Bearer ${ACCESS_TOKEN}`,
                                "Content-Type": "application/json",
                            },
                        }
                    ),
                ]);

                if (!movieResponse.ok || !tvResponse.ok) {
                    throw new Error("Errore nella chiamata API");
                }

                const movieData = await movieResponse.json();
                const tvData = await tvResponse.json();

                // Combina i risultati di film e serie TV, aggiungendo un campo media_type per distinguerli
                const moviesWithType = movieData.results.map((movie) => ({ ...movie, media_type: "movie" }));
                const tvWithType = tvData.results.map((tv) => ({ ...tv, media_type: "tv" }));

                setResults([...moviesWithType, ...tvWithType]);
            } catch (err) {
                console.error(err);
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }

        fetchSearchResults();
    }, [query]); // aggiorna i risultati quando cambia la query

    return (
        <div>
            {loading && <p>Caricamento in corso...</p>}
            {error && <p className="error-message">{error}</p>}
            {!loading && !error && (
                <>
                    <Link to="/" className="home">
                        <ArrowLeftIcon weight="bold" size={16} /> Torna alla home
                    </Link>
                    <h1 className="risultati">Risultati di ricerca</h1>

                    {query ? (
                        <>
                            {loading && <p>Caricamento...</p>}
                            {/* Mostra lo stato di caricamento */}
                            {error && <p style={{ color: "red" }}>Errore: {error}</p>} {/* Mostra il messaggio di errore */}

                            <div>
                                {results.length > 0 ? (
                                    <MovieRow
                                        title={`Risultati per: ${query}`}
                                        movies={results.map((item) => ({
                                            ...item,
                                            type: item.media_type, // Aggiunge il tipo di media per ogni elemento
                                        }))}
                                    />

                                ) : (
                                    !loading && <p>Nessun risultato trovato.</p>
                                )}
                            </div>
                        </>
                    ) : (
                        <p>Nessuna query di ricerca.</p>
                    )}
                </>
            )}
        </div>
    );
}
