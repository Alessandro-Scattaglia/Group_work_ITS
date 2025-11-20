import "./styles.css";
import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";


import HomePage from "./pages/HomePage";
import SearchResults from "./pages/SearchResults";
import Navbar from "./components/Navbar/Navbar";
import FavoritesPage from "./pages/FavoritesPage";
import DetailPage from "./pages/DetailPage";
import { FavoritesProvider } from "./components/context/FavoritesContext";

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
      { path: "/favorites", element: <FavoritesPage/>},
      { path: "/detail/:id", element: <DetailPage /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={routes} />;
}
