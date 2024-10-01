import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Star } from 'lucide-react';
import { Media, Movie, SerieTV } from '../models/Media';

interface MovieCardProps {
  item: Media;
  cardType: 'trending' | 'newMovies' | 'newSeries' | 'recommended';
}

const formatDuration = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  return `${hours}h ${remainingMinutes}m`;
};

export const MovieCard = ({ item, cardType }: MovieCardProps) => {
  const isMovie = item.media_type === 'movie';
  const title = isMovie ? (item as Movie).title : (item as SerieTV).name;

  const renderTrendingCard = () => (
    <Card className='overflow-hidden border-0 bg-transparent'>
      <div className='relative'>
        <img
          src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
          alt={title}
          className='h-auto w-full object-cover'
        />
        <div className='absolute left-2 top-2 flex items-center rounded bg-black/50 px-2 py-1'>
          <Clock className='mr-1 h-4 w-4 text-white' />
          <span className='text-xs text-white'>
            {isMovie
              ? `${formatDuration((item as Movie).runtime) || 'N/A'}`
              : `${(item as SerieTV).number_of_seasons || 'N/A'} seasons`}
          </span>
        </div>
        <div className='absolute right-2 top-2 flex items-center rounded bg-black/50 px-2 py-1'>
          <Star className='mr-1 h-4 w-4 text-yellow-400' />
          <span className='text-xs text-white'>
            {item.vote_average.toFixed(1)}
          </span>
        </div>
      </div>
      <CardContent className='p-4'>
        <h3 className='truncate font-bold text-white'>{title}</h3>
        {item.genres && (
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
        )}
      </CardContent>
    </Card>
  );

  const renderNewMovieCard = () => (
    <Card className='overflow-hidden border-0 bg-transparent'>
      <div className='relative'>
        <img
          src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
          alt={title}
          className='h-auto w-full object-cover'
        />
      </div>
      <CardContent className='p-4'>
        <h3 className='truncate font-bold text-white'>{title}</h3>
        <p className='mt-1 text-sm text-gray-300'>
          {formatDuration((item as Movie).runtime) || 'N/A'}
        </p>
      </CardContent>
    </Card>
  );

  const renderNewSeriesCard = () => (
    <Card className='overflow-hidden border-0 bg-transparent'>
      <div className='relative'>
        <img
          src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
          alt={title}
          className='h-auto w-full object-cover'
        />
        {(item as SerieTV).last_episode_to_air && (
          <div className='absolute left-2 top-2 rounded bg-black/50 px-2 py-1'>
            <span className='text-xs text-white'>
              EP {(item as SerieTV).last_episode_to_air.episode_number}
            </span>
          </div>
        )}
      </div>
      <CardContent className='p-4'>
        <h3 className='truncate font-bold text-white'>{title}</h3>
        <p className='mt-1 text-sm text-gray-300'>
          {(item as SerieTV).number_of_seasons || 'N/A'} seasons
        </p>
      </CardContent>
    </Card>
  );

  const renderRecommendedCard = () =>
    isMovie ? renderNewMovieCard() : renderNewSeriesCard();

  switch (cardType) {
    case 'trending':
      return renderTrendingCard();
    case 'newMovies':
      return renderNewMovieCard();
    case 'newSeries':
      return renderNewSeriesCard();
    case 'recommended':
      return renderRecommendedCard();
    default:
      return null;
  }
};
