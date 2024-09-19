import { ROUTES } from './constants';

export const navigateToHome = () => ROUTES.HOME;
export const navigateToMovieDetails = (id: string) =>
  ROUTES.MOVIE_DETAILS.replace(':id', id);
