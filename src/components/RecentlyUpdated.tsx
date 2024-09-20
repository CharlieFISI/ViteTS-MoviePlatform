import { Movie } from '@/models/Movie';
import { fetchTrendingMovies } from '@/services/api';
import { ArrowRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { RecentlyUpdatedMovieCard } from './RecentlyUpdatedMovieCard';

export const RecentlyUpdated = ({}) => {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const trending = await fetchTrendingMovies();
        setTrendingMovies(trending);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <section className='mb-12'>
      <div className='mb-4 flex items-center justify-between'>
        <h2 className='text-2xl font-semibold'>Recently Updated</h2>
      </div>
      <div className='flex'>
        <div className='grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4'>
          {trendingMovies.slice(0, 4).map((movie, index) => (
            <RecentlyUpdatedMovieCard
              key={movie.id}
              movie={movie}
            />
          ))}
        </div>
        <Link
          to={'#'}
          className='ml-auto flex h-20 w-20 items-center justify-center rounded-full bg-white'
        >
          <ArrowRight className='h-9 w-9 text-black' />
        </Link>
      </div>
    </section>
  );
};
