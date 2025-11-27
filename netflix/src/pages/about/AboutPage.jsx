import React from "react";
import "./AboutPage.css";

const AboutPage = () => {
    return (
        <div className="about-page">
            <div className="about-container">
                <div className="about-header">
                    <h1>About Netflix Clone</h1>
                    <p className="about-subtitle">
                        La tua esperienza cinematografica reinventata
                    </p>
                </div>

                <div className="about-section">
                    <h2 className="section-title">Benvenuti</h2>
                    <p className="about-text">
                        Benvenuti nella nostra applicazione Netflix Clone! Qui puoi esplorare una vasta gamma
                        di film e serie TV, salvare i tuoi preferiti e scoprire nuovi contenuti in un'esperienza
                        utente moderna e coinvolgente.
                    </p>
                </div>

                <div className="about-section">
                    <h2 className="section-title">Il Progetto</h2>
                    <p className="about-text">
                        Questo progetto è una Single Page Application (SPA) sviluppata utilizzando React e React Router.
                        L'obiettivo è creare un clone di Netflix che consenta agli utenti di esplorare film e serie TV,
                        visualizzare i dettagli di ciascun contenuto, cercare contenuti specifici e gestire una lista
                        personale di preferiti.
                    </p>

                    <div className="features-list">
                        <div className="feature-item">
                            <span className="feature-icon">🎬</span>
                            <div>
                                <strong>Catalogo Vastissimo</strong>
                                <p>Migliaia di film e serie TV sempre aggiornati</p>
                            </div>
                        </div>
                        <div className="feature-item">
                            <span className="feature-icon">⭐</span>
                            <div>
                                <strong>Lista Preferiti</strong>
                                <p>Salva i tuoi contenuti preferiti per guardarli dopo</p>
                            </div>
                        </div>
                        <div className="feature-item">
                            <span className="feature-icon">🔍</span>
                            <div>
                                <strong>Ricerca Avanzata</strong>
                                <p>Trova esattamente quello che stai cercando</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="about-section">
                    <h2 className="section-title">Tecnologie</h2>
                    <p className="about-text">
                        Le principali tecnologie utilizzate includono:
                    </p>
                    <div className="tech-stack">
                        <span className="tech-badge">React</span>
                        <span className="tech-badge">React Router</span>
                        <span className="tech-badge">TMDB API</span>
                        <span className="tech-badge">CSS3</span>
                        <span className="tech-badge">JavaScript</span>
                    </div>
                </div>

                <div className="about-section">
                    <h2 className="section-title">Scopo Didattico</h2>
                    <p className="about-text">
                        Questo progetto è stato realizzato come esercizio didattico per mettere in pratica le competenze
                        acquisite durante il corso, tra cui l'uso di hook, gestione dello stato globale, consumo di API
                        esterne e sviluppo di interfacce utente moderne.
                    </p>
                </div>

                <div className="credits-section">
                    <h3 className="credits-title">Team di Sviluppo</h3>
                    <div className="team-members">
                        <div className="team-member">
                            <div className="member-name">Alessandro Scattaglia</div>
                        </div>
                        <div className="team-member">
                            <div className="member-name">Cosmin Grosu</div>
                        </div>
                    </div>
                    <p className="final-message">
                        Grazie per aver visitato il nostro sito!
                    </p>
                    <p className="final-message">
                        Puoi trovare il codice sorgente del progetto su <a href="https://github.com/Alessandro-Scattaglia/Group_work_ITS" target="_blank" rel="noopener noreferrer">GitHub</a>.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;