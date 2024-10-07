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
import ProtectedRoute from './ProtectedRoute';

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
        element: <ProtectedRoute />,
        children: [
          {
            path: '/movies/:id',
            element: <MovieDetailPage />
          },
          {
            path: '/series/:id',
            element: <SeriesDetailPage />
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
      }
    ]
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
    path: '*',
    element: <NotFound />
  }
]);

export const AppRoutes = () => <RouterProvider router={router} />;
