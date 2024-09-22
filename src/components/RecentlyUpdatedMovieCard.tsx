import { Media, Movie, SerieTV } from '@/models/Media';
import { navigateToMovieDetails } from '@/routes/navigation';
import { Link } from 'react-router-dom';

interface RecentlyUpdatedMovieCardProps {
  item: Media;
}

export const RecentlyUpdatedMovieCard = ({
  item
}: RecentlyUpdatedMovieCardProps) => {
  const isMovie = (item: Media): item is Movie => item.media_type === 'movie';
  const isSeries = (item: Media): item is SerieTV => item.media_type === 'tv';

  const getTitle = () => {
    if (isMovie(item)) return item.title;
    if (isSeries(item)) return item.name;
    return 'Unknown Title';
  };

  const getYear = () => {
    if (isMovie(item)) {
      return new Date(item.release_date).getFullYear();
    }
    if (isSeries(item)) {
      return new Date(item.first_air_date).getFullYear();
    }
    return 'Unknown Year';
  };

  const title = getTitle();
  const year = getYear();

  return (
    <Link
      to={navigateToMovieDetails(item.id.toString())}
      className='flex'
    >
      <div className='flex overflow-hidden'>
        <img
          src={`https://image.tmdb.org/t/p/w500${item.poster_path}`}
          alt={title}
          className='w-16 rounded object-cover'
        />
        <div className='p-4'>
          <h3 className='font-semibold'>{title}</h3>
          {isSeries(item) && (
            <p className='text-sm text-gray-400'>
              Series/S {item.number_of_seasons}{' '}
              {item.number_of_seasons > 1 ? 'Seasons' : 'Season'}
            </p>
          )}
          <span className='text-sm text-gray-400'>{year}</span>
        </div>
      </div>
    </Link>
  );
};
