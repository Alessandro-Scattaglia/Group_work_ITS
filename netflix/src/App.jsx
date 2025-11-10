import "./styles.css";
import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import HomePage from "./pages/HomePage";
import SearchResults from "./pages/SearchResults";
import Navbar from "./components/Navbar/Navbar";

function RootLayout() {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
}

const routes = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/search", element: <SearchResults /> },
    ],
  },
]);

export default function App() {
  return <RouterProvider router={routes} />;
}
