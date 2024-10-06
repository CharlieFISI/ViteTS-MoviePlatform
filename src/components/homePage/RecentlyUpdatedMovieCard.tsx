import { Media, Movie, SerieTV } from '@/models/Media';
import { navigateToMovieDetails } from '@/routes/navigation';
import { Calendar, Clock, Tv } from 'lucide-react';
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

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: '2-digit'
    });
  };

  const getReleaseDate = () => {
    if (isMovie(item)) {
      return formatDate(item.release_date);
    }
    if (isSeries(item)) {
      return formatDate(item.first_air_date);
    }
    return 'Unknown Date';
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  const getSeriesInfo = (series: SerieTV) => {
    if (series.last_episode_to_air) {
      const latestSeason = series.last_episode_to_air.season_number;
      const latestEpisode = series.last_episode_to_air.episode_number;
      return `S${latestSeason} E${latestEpisode}`;
    }
    return `${series.number_of_seasons} Season${series.number_of_seasons !== 1 ? 's' : ''}`;
  };

  const title = getTitle();
  const releaseDate = getReleaseDate();

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
              <Tv
                size={12}
                className='mr-1 inline'
              />
              {getSeriesInfo(item)}
            </p>
          )}
          {isMovie(item) && (
            <p className='text-sm text-gray-400'>
              <Clock
                size={12}
                className='mr-1 inline'
              />
              {formatDuration(item.runtime)}
            </p>
          )}
          <p className='text-sm text-gray-400'>
            <Calendar
              size={12}
              className='mr-1 inline'
            />
            {releaseDate}
          </p>
        </div>
      </div>
    </Link>
  );
};
