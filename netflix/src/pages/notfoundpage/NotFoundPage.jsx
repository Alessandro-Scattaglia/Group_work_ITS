import { Link } from "react-router-dom";
import "./NotFoundPage.css";

export default function NotFoundPage() {
    return (
        <div className="not-found-page">
            <div className="not-found-content">
                <h1 className="not-found-title">404</h1>
                <h2 className="not-found-subtitle">Pagina non trovata</h2>
                <p className="not-found-text">
                    Ops! La pagina che stai cercando non esiste.
                </p>
                <Link to="/" className="not-found-button">
                    Torna alla Home
                </Link>
            </div>
        </div>
    );
}
