import { fetchTrendingMovies } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { RecentlyUpdatedMovieCard } from './RecentlyUpdatedMovieCard';

const QUERY_KEY = 'recentlyUpdated';
const LOADING_MESSAGE = 'Cargando...';
const ERROR_MESSAGE = 'Hubo un error al cargar los datos.';

export const RecentlyUpdated = () => {
  const {
    data: movies,
    isLoading,
    error
  } = useQuery({
    queryKey: [QUERY_KEY],
    queryFn: fetchTrendingMovies
  });

  if (isLoading) return <div aria-live='polite'>{LOADING_MESSAGE}</div>;
  if (error) return <div aria-live='polite'>{ERROR_MESSAGE}</div>;
  if (!movies || movies.length === 0) return null;

  return (
    <section className='mb-12'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-2xl font-semibold'>Recently Updated</h2>
      </div>
      <div className='flex'>
        <div className='grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4'>
          {movies?.slice(0, 4).map((movie) => (
            <RecentlyUpdatedMovieCard
              key={movie.id}
              movie={movie}
            />
          ))}
        </div>
        <Link
          to={'#'}
          className='flex items-center justify-center w-20 h-20 ml-auto bg-white rounded-full'
          aria-label='Ver más películas actualizadas recientemente'
        >
          <ArrowRight className='text-black h-9 w-9' />
        </Link>
      </div>
    </section>
  );
};
