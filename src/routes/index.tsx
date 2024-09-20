import { Layout } from '@/components/Layout';
import { Home } from '@/views/Home';
import { MovieDetails } from '@/views/MovieDetails';
import { NotFound } from '@/views/NotFound';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

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

export const AppRoutes = () => <RouterProvider router={router} />;
