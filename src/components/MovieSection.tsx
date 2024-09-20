import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { ChevronRight } from 'lucide-react';
import type { Movie } from '../models/Movie';
import {
  fetchNewReleases,
  fetchRecommendedMovies,
  fetchTrendingMovies
} from '../services/api';
import MovieCard from './MovieCard';
import { MovieSectionSkeleton } from './skeletons/MovieSectionSkeleton';

const ERROR_MESSAGE = 'Hubo un error al cargar los datos.';

interface MovieSectionProps {
  title: string;
  type: 'trending' | 'newMovies' | 'newSeries' | 'recommended';
}

const MovieSection = ({ title, type }: MovieSectionProps) => {
  const {
    data: movies,
    isLoading,
    error
  } = useQuery<Movie[]>({
    queryKey: [type],
    queryFn: () => {
      switch (type) {
        case 'trending':
          return fetchTrendingMovies();
        case 'newMovies':
          return fetchNewReleases('movie');
        case 'newSeries':
          return fetchNewReleases('tv');
        case 'recommended':
          return fetchRecommendedMovies();
        default:
          throw new Error(`Invalid type: ${type}`);
      }
    }
  });

  if (isLoading) return <MovieSectionSkeleton />;
  if (error) return <div>{ERROR_MESSAGE}</div>;
  if (!movies || movies.length === 0) return null;

  return (
    <section className='mb-12'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-2xl font-semibold'>{title}</h2>
        <Button
          variant='link'
          className='text-gray-400 hover:text-white'
        >
          View All <ChevronRight size={20} />
        </Button>
      </div>
      <div className='grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
          />
        ))}
      </div>
    </section>
  );
};

export default MovieSection;
