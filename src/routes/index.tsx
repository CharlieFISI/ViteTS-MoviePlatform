import Home from "../views/Home";
import MovieDetails from "../views/MovieDetails";
import NotFound from "../views/NotFound";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/movie/:id",
    element: <MovieDetails />,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

const App = () => <RouterProvider router={router} />;

export default App;
