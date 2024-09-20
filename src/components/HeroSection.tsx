import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { Clock, Play, Plus } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import type { Movie } from '../models/Movie';
import { navigateToMovieDetails } from '../routes/navigation';
import { fetchMovieDetails, fetchTrendingMovies } from '../services/api';

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const {
    data: trendingMovies,
    isLoading: isLoadingTrending,
    error: errorTrending
  } = useQuery<Movie[]>({
    queryKey: ['trendingMovies'],
    queryFn: fetchTrendingMovies
  });

  const {
    data: movieDetails,
    isLoading: isLoadingDetails,
    error: errorDetails
  } = useQuery<Movie>({
    queryKey: ['movieDetails', trendingMovies?.[currentIndex]?.id],
    queryFn: () => fetchMovieDetails(trendingMovies![currentIndex]!.id),
    enabled: !!trendingMovies && !!trendingMovies[currentIndex]?.id
  });

  useEffect(() => {
    if (trendingMovies && trendingMovies.length > 0) {
      const timer = setInterval(() => {
        setCurrentIndex(
          (prevIndex) => (prevIndex + 1) % Math.min(trendingMovies.length, 5)
        );
        setIsImageLoaded(false);
      }, 7000);

      return () => clearInterval(timer);
    }
  }, [trendingMovies]);

  if (isLoadingTrending || isLoadingDetails) return <div>Loading...</div>;
  if (errorTrending || errorDetails) return <div>Error fetching movies</div>;
  if (!trendingMovies || trendingMovies.length === 0 || !movieDetails)
    return null;

  const movie = { ...trendingMovies[currentIndex], ...movieDetails };

  return (
    <div className='relative mb-8 h-[calc(70vh-108px)] overflow-hidden'>
      <div className='absolute inset-0 transition-opacity duration-1000'>
        <img
          src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          alt={movie.title}
          className={`h-full w-full object-cover object-center transition-opacity duration-1000 ${isImageLoaded ? 'opacity-100' : 'opacity-0'}`}
          onLoad={() => setIsImageLoaded(true)}
        />
        <div className='absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent'></div>
      </div>
      <div className='absolute bottom-0 left-0 max-w-2xl p-8 text-left'>
        <h1 className='mb-2 text-5xl font-bold leading-none tracking-tight text-white'>
          {movie.title}
        </h1>
        <div className='flex flex-wrap items-center mb-2 space-x-4'>
          {movie.genres &&
            movie.genres.slice(0, 3).map((genre) => (
              <span
                key={genre.id}
                className='px-2 py-1 text-sm text-white bg-white rounded bg-opacity-20'
              >
                {genre.name}
              </span>
            ))}
          <span className='flex items-center text-white'>
            <Clock
              size={16}
              className='mr-1'
            />
            {movie.runtime
              ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
              : 'N/A'}
          </span>
          <span className='text-white'>
            {movie.release_date?.split('-')[0]}
          </span>
          <span className='flex items-center text-white'>
            <span className='mr-1 text-yellow-400'>★</span>
            {movie.vote_average?.toFixed(1)}
          </span>
        </div>
        <p className='mb-6 text-lg font-normal text-gray-300'>
          {movie.overview}
        </p>
      </div>
      <div className='absolute flex space-x-4 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2'>
        <Link to={navigateToMovieDetails(movie.id.toString())}>
          <Button className='px-8 py-6 text-lg text-white bg-red-600 hover:bg-red-700'>
            <Play
              size={24}
              className='mr-2'
            />
            Watch Now
          </Button>
        </Link>
        <Button
          variant='outline'
          className='px-8 py-6 text-lg text-white bg-transparent border-white hover:bg-white hover:text-black'
        >
          <Plus
            size={24}
            className='mr-2'
          />
          Watch Later
        </Button>
      </div>
      <div className='absolute flex space-x-2 transform -translate-x-1/2 bottom-4 left-1/2'>
        {trendingMovies.slice(0, 5).map((_, index) => (
          <button
            key={index}
            className={`h-3 w-3 rounded-full ${index === currentIndex ? 'bg-red-600' : 'bg-white bg-opacity-50'}`}
            onClick={() => setCurrentIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSection;
