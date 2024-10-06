import { Layout } from '@/components/Layout';
import { GenreFilterPage } from '@/views/GenreFilterPage';
import { Home } from '@/views/Home';
import { LoginPage } from '@/views/LoginPage';
import { MovieDetailsPage } from '@/views/MovieDetailsPage';
import { MoviesPage } from '@/views/MoviesPage';
import { NotFound } from '@/views/NotFound';
import { RegisterPage } from '@/views/RegisterPage';
import { SeriesDetailsPage } from '@/views/SeriesDetailsPage';
import { SeriesPage } from '@/views/SeriesPage';
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
        element: <MovieDetailsPage />
      },
      {
        path: '/series/:id',
        element: <SeriesDetailsPage />
      },
      {
        path: '/login',
        element: <LoginPage />
      },
      {
        path: '/register',
        element: <RegisterPage />
      },
      {
        path: '/genres',
        element: <GenreFilterPage />
      },
      {
        path: '/movies',
        element: <MoviesPage />
      },
      {
        path: '/series',
        element: <SeriesPage />
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
]);

export const AppRoutes = () => <RouterProvider router={router} />;
