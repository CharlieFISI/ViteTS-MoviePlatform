import { Button } from '@/components/ui/button';
import { useQuery } from '@tanstack/react-query';
import { ChevronRight } from 'lucide-react';
import { Media } from '../models/Media';
import {
  fetchNewReleases,
  fetchRecommendedMedia,
  fetchTrendingMedia
} from '../services/api';
import MovieCard from './MovieCard';
import { MovieSectionSkeleton } from './skeletons/MovieSectionSkeleton';

interface MovieSectionProps {
  title: string;
  type: 'trending' | 'newMovies' | 'newSeries' | 'recommended';
}

const MovieSection = ({ title, type }: MovieSectionProps) => {
  const {
    data: mediaItems,
    isLoading,
    error
  } = useQuery<Media[]>({
    queryKey: [type],
    queryFn: () => {
      switch (type) {
        case 'trending':
          return fetchTrendingMedia();
        case 'newMovies':
          return fetchNewReleases('movie');
        case 'newSeries':
          return fetchNewReleases('tv');
        case 'recommended':
          return fetchRecommendedMedia(1, 'movie');
        default:
          throw new Error(`Invalid type: ${type}`);
      }
    }
  });

  if (isLoading) return <MovieSectionSkeleton />;
  if (error) return <div>Error fetching media</div>;
  if (!mediaItems || mediaItems.length === 0) return null;

  return (
    <section className='mb-12 px-6'>
      <div className='mb-4 flex items-center justify-between'>
        <h2 className='text-2xl font-bold text-white'>{title}</h2>
        <Button
          variant='link'
          className='text-gray-400 hover:text-white'
        >
          View all <ChevronRight size={20} />
        </Button>
      </div>
      <div className='grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-5'>
        {mediaItems.slice(0, 5).map((item) => (
          <MovieCard
            key={item.id}
            item={item}
          />
        ))}
      </div>
    </section>
  );
};

export default MovieSection;
