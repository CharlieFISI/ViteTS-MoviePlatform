import { useQuery } from '@tanstack/react-query';
import { Clock, Tv } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Media, Movie, SerieTV } from '../models/Media';
import { navigateToMovieDetails } from '../routes/navigation';
import { fetchMovieDetails, fetchTVDetails } from '../services/api';

interface MovieCardProps {
  item: Media;
}

const MovieCard = ({ item }: MovieCardProps) => {
  const { data: details } = useQuery<Movie | SerieTV>({
    queryKey: ['details', item.id, item.media_type],
    queryFn: () =>
      item.media_type === 'movie'
        ? fetchMovieDetails(item.id)
        : fetchTVDetails(item.id)
  });

  const title =
    item.media_type === 'movie'
      ? (item as Movie).title
      : (item as SerieTV).name;

  const getDurationOrSeasons = () => {
    if (!details) return 'N/A';

    if (item.media_type === 'movie' && 'runtime' in details) {
      const hours = Math.floor(details.runtime / 60);
      const minutes = details.runtime % 60;
      return `${hours}h ${minutes}m`;
    } else if (item.media_type === 'tv' && 'number_of_seasons' in details) {
      return `${details.number_of_seasons} season${details.number_of_seasons > 1 ? 's' : ''}`;
    }

    return 'N/A';
  };

  return (
    <Link
      to={navigateToMovieDetails(item.id.toString())}
      className='block'
    >
      <div className='relative overflow-hidden rounded-lg'>
        <img
          src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
          alt={title}
          className='aspect-[2/3] h-auto w-full object-cover'
        />
        <div className='absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4'>
          <h3 className='truncate text-lg font-semibold text-white'>{title}</h3>
          <div className='mt-1 flex items-center space-x-2'>
            <span className='rounded bg-red-600 px-1 py-0.5 text-xs font-bold text-white'>
              HD
            </span>
            <span className='flex items-center text-sm text-gray-300'>
              {item.media_type === 'movie' ? (
                <Clock
                  size={12}
                  className='mr-1'
                />
              ) : (
                <Tv
                  size={12}
                  className='mr-1'
                />
              )}
              {getDurationOrSeasons()}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
