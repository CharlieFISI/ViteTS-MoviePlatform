import { ROUTES } from './constants';

export const navigateToHome = () => ROUTES.HOME;

export const navigateToMovieDetails = (id: string) =>
  ROUTES.MOVIE_DETAILS.replace(':id', id);

export const navigateToSeriesDetails = (id: string) =>
  ROUTES.SERIES_DETAILS.replace(':id', id);

export const navigateToLogin = () => ROUTES.LOGIN;

export const navigateToRegister = () => ROUTES.REGISTER;

export const navigateToGenres = () => ROUTES.GENRES;

export const navigateToMovies = () => ROUTES.MOVIES;

export const navigateToSeries = () => ROUTES.SERIES;

export const navigateToNotFound = () => ROUTES.NOT_FOUND;
