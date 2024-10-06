import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Play, Plus } from 'lucide-react';
import { useEffect } from 'react';
import { Media, Movie } from '../models/Media';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  fetchTrendingMediaData,
  setCurrentIndex,
  setIsImageLoaded
} from '../store/mediaSlice';
import { HeroSectionSkeleton } from './skeletons/HeroSectionSkeleton';

export const HeroSection = () => {
  const dispatch = useAppDispatch();
  const currentIndex = useAppSelector((state) => state.media.currentIndex);
  const isImageLoaded = useAppSelector((state) => state.media.isImageLoaded);
  const trendingMedia = useAppSelector((state) => state.media.trending);
  const isLoading = useAppSelector((state) => state.media.isLoading);
  const error = useAppSelector((state) => state.media.error);

  const currentMedia = trendingMedia[currentIndex];

  useEffect(() => {
    dispatch(fetchTrendingMediaData(7));
  }, [dispatch]);

  useEffect(() => {
    if (trendingMedia.length > 0) {
      const timer = setInterval(() => {
        const newIndex = (currentIndex + 1) % Math.min(trendingMedia.length, 5);
        dispatch(setCurrentIndex(newIndex));
        dispatch(setIsImageLoaded(false));
      }, 7000);

      return () => clearInterval(timer);
    }
  }, [trendingMedia, currentIndex, dispatch]);

  if (isLoading) return <HeroSectionSkeleton />;
  if (error) return <div>Error fetching media: {error}</div>;
  if (!currentMedia) return null;

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  const isMovie = (media: Media): media is Movie =>
    media.media_type === 'movie';

  return (
    <section className='relative h-[80vh]'>
      <div className='absolute inset-0 z-10 bg-gradient-to-b from-transparent via-transparent to-black' />
      <img
        src={`https://image.tmdb.org/t/p/original${currentMedia.backdrop_path}`}
        alt={isMovie(currentMedia) ? currentMedia.title : currentMedia.name}
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
            {isMovie(currentMedia) ? currentMedia.title : currentMedia.name}
          </h1>
          <div className='mb-4 flex items-center space-x-4 text-white'>
            <span>
              {new Date(
                isMovie(currentMedia)
                  ? currentMedia.release_date
                  : currentMedia.first_air_date
              ).getFullYear()}
            </span>
            <span>•</span>
            <span>
              {isMovie(currentMedia)
                ? formatDuration(currentMedia.runtime)
                : `${currentMedia.number_of_seasons} ${
                    currentMedia.number_of_seasons > 1 ? 'seasons' : 'season'
                  }`}
            </span>
            <div className='flex space-x-2'>
              {currentMedia.genres.slice(0, 3).map((genre) => (
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
          <p className='max-w-xl text-lg text-white'>{currentMedia.overview}</p>
        </div>
      </div>
    </section>
  );
};
