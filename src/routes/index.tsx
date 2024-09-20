import { Layout } from '@/components/Layout';
import Home from '@/views/Home';
import { MovieDetails } from '@/views/MovieDetails';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import NotFound from '../views/NotFound';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: '/movie/:id',
        element: <MovieDetails />
      }
    ]
  },

  {
    path: '*',
    element: <NotFound />
  }
]);

const App = () => <RouterProvider router={router} />;

export default App;
