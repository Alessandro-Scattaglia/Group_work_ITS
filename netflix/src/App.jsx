import "./styles.css";

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";


import HomePage from "./pages/HomePage";
import SearchResults from "./pages/SearchResults";

const routes = createBrowserRouter([
  {
    path: "/",
    Component: HomePage,
  },
  {
    path: "/search",
    Component: SearchResults,
  },
]);

export default function App() {
  return <RouterProvider router={routes} />;
}
