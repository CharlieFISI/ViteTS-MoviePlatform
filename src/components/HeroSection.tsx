import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { Play, Plus } from 'lucide-react';
import { useEffect, useMemo } from 'react';
import { Media, Movie } from '../models/Media';
import { fetchMovieDetails, fetchTrendingMedia } from '../services/api';
import { setCurrentIndex, setIsImageLoaded } from '../store/heroSlice';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { HeroSectionSkeleton } from './skeletons/HeroSectionSkeleton';

export const HeroSection = () => {
  const dispatch = useAppDispatch();
  const currentIndex = useAppSelector((state) => state.hero.currentIndex);
  const isImageLoaded = useAppSelector((state) => state.hero.isImageLoaded);

  const {
    data: trendingMedia,
    isLoading: isLoadingTrending,
    error: errorTrending
  } = useQuery<Media[]>({
    queryKey: ['trendingMedia'],
    queryFn: fetchTrendingMedia
  });

  const trendingMovies = useMemo(
    () =>
      trendingMedia?.filter(
        (item): item is Movie => item.media_type === 'movie'
      ) || [],
    [trendingMedia]
  );

  const currentMovie = trendingMovies[currentIndex];

  const {
    data: movieDetails,
    isLoading: isLoadingDetails,
    error: errorDetails
  } = useQuery<Movie>({
    queryKey: ['movieDetails', currentMovie?.id],
    queryFn: () => fetchMovieDetails(currentMovie.id),
    enabled: !!currentMovie
  });

  useEffect(() => {
    if (trendingMovies.length > 0) {
      const timer = setInterval(() => {
        const newIndex =
          (currentIndex + 1) % Math.min(trendingMovies.length, 5);
        dispatch(setCurrentIndex(newIndex));
        dispatch(setIsImageLoaded(false));
      }, 7000);

      return () => clearInterval(timer);
    }
  }, [trendingMovies, currentIndex, dispatch]);

  if (isLoadingTrending || isLoadingDetails) return <HeroSectionSkeleton />;
  if (errorTrending || errorDetails) return <div>Error fetching movies</div>;
  if (!currentMovie || !movieDetails) return null;

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  return (
    <section className='relative h-[80vh]'>
      <div className='absolute inset-0 z-10 bg-gradient-to-b from-transparent via-transparent to-black' />
      <img
        src={`https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`}
        alt={currentMovie.title}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-500 ${
          isImageLoaded ? 'opacity-100' : 'opacity-0'
        }`}
        onLoad={() => dispatch(setIsImageLoaded(true))}
      />
      <div className='relative z-20 mx-auto flex h-full max-w-7xl flex-col justify-between px-4 py-12'>
        <div className='flex h-full flex-col items-center justify-center'>
          <div className='mb-8 flex space-x-4'>
            <Button
              size='lg'
              className='bg-red-600 text-white hover:bg-red-700'
            >
              <Play className='mr-2 h-5 w-5' /> Watch Now
            </Button>
            <Button
              size='lg'
              variant='outline'
              className='border-white bg-transparent text-white hover:border-red-600 hover:bg-red-600 hover:text-white'
            >
              <Plus className='mr-2 h-5 w-5' /> My List
            </Button>
          </div>
        </div>
        <div className='mb-8'>
          <h1 className='mb-4 text-4xl font-bold text-white md:text-6xl'>
            {currentMovie.title}
          </h1>
          <div className='mb-4 flex items-center space-x-4 text-white'>
            <span>{new Date(currentMovie.release_date).getFullYear()}</span>
            <span>•</span>
            <span>{formatDuration(movieDetails.runtime)}</span>
            <div className='flex space-x-2'>
              {movieDetails.genres.slice(0, 3).map((genre) => (
                <Badge
                  key={genre.id}
                  variant='outline'
                  className='border-white text-xs text-white'
                >
                  {genre.name}
                </Badge>
              ))}
            </div>
          </div>
          <p className='max-w-xl text-lg text-white'>{currentMovie.overview}</p>
        </div>
      </div>
    </section>
  );
};
