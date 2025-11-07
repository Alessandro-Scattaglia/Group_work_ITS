import { useSearchParams, Link } from "react-router";
import SearchBar from "../components/SearchBar/SearchBar";

export default function SearchResults() {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q");

    // Qui potresti fare una chiamata API con la query
    // const { data, loading } = useFetch(`/api/search?q=${query}`);

    return (
        <div>
            <Link to="/">← Torna alla home</Link>

            <h1>Risultati di ricerca</h1>

            <SearchBar />

            {query ? (
                <div>
                    <p>
                        Hai cercato: <strong>{query}</strong>
                    </p>
                    {/* Mostra qui i risultati */}
                </div>
            ) : (
                <p>Nessuna query di ricerca.</p>
            )}
        </div>
    );
}
