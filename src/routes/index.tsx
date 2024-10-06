import { Layout } from '@/components/Layout';
import { GenreFilterPage } from '@/views/GenreFilterPage';
import { Home } from '@/views/Home';
import { LoginPage } from '@/views/LoginPage';
import { MovieDetailPage } from '@/views/MovieDetailPage';
import { MoviesPage } from '@/views/MoviesPage';
import { NotFound } from '@/views/NotFound';
import { RegisterPage } from '@/views/RegisterPage';
import { SeriesDetailPage } from '@/views/SeriesDetailPage';
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
        path: '/movies/:id',
        element: <MovieDetailPage />
      },
      {
        path: '/series/:id',
        element: <SeriesDetailPage />
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
