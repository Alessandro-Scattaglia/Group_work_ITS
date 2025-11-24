import "./styles.css";
import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";


import HomePage from "./pages/homepage/HomePage";
import SearchResults from "./pages/searchresults/SearchResults";
import Navbar from "./components/Navbar/Navbar";
import FavoritesPage from "./pages/favoritespage/FavoritesPage";
import DetailPage from "./pages/detailpage/DetailPage";
import NotFoundPage from "./pages/notfoundpage/NotFoundPage";
import { FavoritesProvider } from "./components/context/FavoritesContext";
import MoviesPage from "./pages/moviespage/MoviesPage";
import SerieTvPage from "./pages/serietv/SerieTv";


function RootLayout() {
  return (
    <FavoritesProvider>
      <div>
        <header>
          <Navbar />
        </header>
        <main>
          <Outlet />
        </main>
      </div>
    </FavoritesProvider>
  );
}

const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/search", element: <SearchResults /> },
      { path: "/favorites", element: <FavoritesPage /> },

      { path: "/movies", element: <MoviesPage /> },
      { path: "/movie/:id", element: <DetailPage mediaType="movie" /> },

      { path: "/series", element: <SerieTvPage /> },
      { path: "/serie-tv/:id", element: <DetailPage mediaType="tv" /> },

      { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={routes} />;
}