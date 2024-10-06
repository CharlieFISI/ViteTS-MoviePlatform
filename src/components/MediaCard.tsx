import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { useQueries } from '@tanstack/react-query';
import { Clock } from 'lucide-react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Media, Movie, SerieTV } from '../models/Media';
import { fetchMovieVideos, fetchSeriesVideos } from '../services/api';

interface MediaCardProps {
  item: Media;
  cardType:
    | 'trending'
    | 'latestMovies'
    | 'latestSeries'
    | 'popular'
    | 'recommended';
}

const formatDuration = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
};

export const MediaCard = ({ item, cardType }: MediaCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const isMovie = item.media_type === 'movie';
  const title = isMovie ? (item as Movie).title : (item as SerieTV).name;

  const videoQueries = useQueries({
    queries: [
      {
        queryKey: ['movieVideos', item.id],
        queryFn: () => fetchMovieVideos(item.id),
        enabled: isMovie
      },
      {
        queryKey: ['seriesVideos', item.id],
        queryFn: () => fetchSeriesVideos(item.id),
        enabled: !isMovie
      }
    ]
  });

  const movieVideos = videoQueries[0].data || [];
  const seriesVideos = videoQueries[1].data || [];
  const videoKey = isMovie ? movieVideos[0]?.key : seriesVideos[0]?.key;

  const videoUrl = videoKey
    ? `https://www.youtube.com/embed/${videoKey}`
    : null;

  const renderPreview = () => (
    <div className='absolute inset-0 z-10 bg-black/75 p-4 text-white'>
      <h3 className='text-lg font-bold'>{title}</h3>
      <div className='flex items-center space-x-2'>
        <span>
          {new Date(
            isMovie
              ? (item as Movie).release_date
              : (item as SerieTV).first_air_date
          ).getFullYear()}
        </span>
        <span>•</span>
        {isMovie ? (
          <span>
            <Clock className='mr-1 inline-block h-4 w-4' />{' '}
            {formatDuration((item as Movie).runtime) || 'N/A'}
          </span>
        ) : (
          <span>{(item as SerieTV).number_of_seasons} seasons</span>
        )}
      </div>
      <div className='mt-2 flex flex-wrap gap-2'>
        {item.genres.slice(0, 3).map((genre) => (
          <Badge
            key={genre.id}
            variant='secondary'
            className='text-xs'
          >
            {genre.name}
          </Badge>
        ))}
      </div>
      <p className='mt-4 text-sm'>{item.overview.slice(0, 100)}...</p>
    </div>
  );

  const renderTrendingCard = () => (
    <div className='p-2'>
      <Card
        className='relative overflow-hidden rounded-lg border-0 bg-transparent'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className='relative h-0 w-full pb-[56.25%]'>
          {!isHovered ? (
            <img
              src={`https://image.tmdb.org/t/p/w780${item.backdrop_path}`}
              alt={title}
              className='absolute left-0 top-0 h-full w-full rounded-lg object-cover'
            />
          ) : (
            videoUrl && (
              <iframe
                src={videoUrl}
                className='absolute left-0 top-0 h-full w-full rounded-lg'
                allow='fullscreen'
                title='Video preview'
              />
            )
          )}
        </div>
      </Card>

      <div className='mt-2 px-2'>
        <Link to={isMovie ? `/movies/${item.id}` : `/series/${item.id}`}>
          <h3 className='truncate font-bold text-white'>{title}</h3>
        </Link>
        <div className='mt-2 flex flex-wrap gap-2'>
          {item.genres.slice(0, 3).map((genre) => (
            <Badge
              key={genre.id}
              variant='secondary'
              className='text-xs'
            >
              {genre.name}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );

  const renderPreviewCard = () => (
    <Link to={isMovie ? `/movies/${item.id}` : `/series/${item.id}`}>
      <Card
        className='relative h-auto overflow-hidden border-0 bg-transparent'
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className='relative'>
          <img
            src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
            alt={title}
            className='h-auto w-full object-cover'
          />
          {isHovered && renderPreview()}
        </div>
      </Card>
    </Link>
  );

  const renderRecommendedCard = () =>
    isMovie ? renderPreviewCard() : renderPreviewCard();

  switch (cardType) {
    case 'trending':
      return renderTrendingCard();
    case 'latestMovies':
    case 'latestSeries':
    case 'popular':
      return renderRecommendedCard();
    default:
      return null;
  }
};
