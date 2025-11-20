# Netflix Clone

## Descrizione del Progetto
Questo progetto è una replica semplificata dell'interfaccia utente di Netflix, sviluppata per il progetto finale della materia di React. L'applicazione consente agli utenti di esplorare categorie di film, visualizzare dettagli sui film, cercare contenuti e gestire una lista di preferiti.

## Tecnologie Utilizzate
- **React**: 19.1.1
- **React DOM**: 19.1.1
- **React Router DOM**: 7.9.5
- **Vite**: 7.1.7
- **@phosphor-icons/react**: 2.1.10
- **ESLint**: 9.36.0

## Istruzioni per l'Installazione e l'Avvio
1. Clonare il repository:
   ```bash
   git clone <URL_DEL_REPOSITORY>
   ```
2. Spostarsi nella directory del progetto:
   ```bash
   cd netflix
   ```
3. Creare un file `.env` nella directory principale e aggiungere le informazioni dell'API :
   ```env
   VITE_BASE_URL=https://api.themoviedb.org/3
   VITE_ACCESS_TOKEN=il tuo token
   ```
4. Installare le dipendenze:
   ```bash
   npm install
   ```
5. Avviare l'applicazione in modalità sviluppo:
   ```bash
   npm run dev
   ```
6. vai su http://localhost:5173/

## API Utilizzate
- **The Movie Database (TMDB)**: Utilizzata per ottenere informazioni sui film e le categorie. [Documentazione TMDB](https://developer.themoviedb.org/docs)

## Scelte Progettuali
Abbiamo utilizzato la Context API per gestire lo stato globale, come la lista dei preferiti, perché è semplice da implementare e sufficiente per un'applicazione di questa scala. Per la navigazione tra le pagine, abbiamo scelto React Router DOM. Inoltre, abbiamo usato Vite per un ambiente di sviluppo veloce.

## Problemi Noti o Limitazioni
- **Funzionalità Limitate**: L'applicazione è una replica semplificata e non include funzionalità avanzate come lo streaming video. I bottoni "riproduci" sono puramente estetici.
- **Dipendenza da TMDB**: L'applicazione dipende dall'API di TMDB per i dati; eventuali problemi con l'API possono influire sul funzionamento.
- **Ottimizzazione**: Non sono state implementate ottimizzazioni avanzate per le performance su larga scala.

---
Questo progetto è stato sviluppato come esercizio pratico per migliorare le competenze in React e nello sviluppo di applicazioni web moderne.


## By Alessandro Scattaglia & Cosmin Grosu
