import { Button } from '@/components/ui/button';
import { Calendar, Clock, Plus, Star } from 'lucide-react';
import { MovieDetails, SerieTVDetails } from '../../models/Media';

interface MediaInfoProps {
  media: MovieDetails | SerieTVDetails;
}

export const MediaInfo = ({ media }: MediaInfoProps) => {
  const title = 'title' in media ? media.title : media.name;
  const releaseDate =
    'release_date' in media ? media.release_date : media.first_air_date;
  const duration = 'runtime' in media ? media.runtime : media.number_of_seasons;

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours.toString().padStart(2, '0')}:${remainingMinutes.toString().padStart(2, '0')}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className='relative mt-8 flex flex-col md:flex-row'>
      <img
        src={`https://image.tmdb.org/t/p/w500${media.poster_path}`}
        alt={title}
        className='mb-4 h-auto w-full object-cover md:mb-0 md:mr-8 md:w-96'
      />
      <div className='flex-grow'>
        <div className='mb-4 flex items-start justify-between'>
          <h1 className='text-4xl font-bold'>{title}</h1>
          <Button
            variant='outline'
            className='bg-red-600 text-white hover:bg-red-700 hover:text-white'
          >
            <Plus className='mr-2 h-4 w-4' />
            Add to favorites
          </Button>
        </div>
        <div className='mb-4 flex flex-wrap gap-2'>
          {media.genres.map((genre) => (
            <span
              key={genre.id}
              className='rounded bg-gray-700 px-2 py-1 text-sm'
            >
              {genre.name}
            </span>
          ))}
        </div>
        <div className='mb-4 flex items-center space-x-4 text-sm'>
          <div className='flex items-center'>
            <Calendar className='mr-1 h-4 w-4' />
            <span>{new Date(releaseDate).getFullYear()}</span>
          </div>
          <div className='flex items-center'>
            <Clock className='mr-1 h-4 w-4' />
            <span>
              {'runtime' in media
                ? formatDuration(duration)
                : `${duration} seasons`}
            </span>
          </div>
          <div className='flex items-center'>
            <Star className='mr-1 h-4 w-4' />
            <span>{media.vote_average.toFixed(1)}</span>
          </div>
        </div>
        <p className='mb-4'>{media.overview}</p>
        <div className='grid grid-cols-1 gap-4 text-sm md:grid-cols-2'>
          <div>
            <strong>Release Date:</strong> {formatDate(releaseDate)}
          </div>
          <div>
            <strong>Country:</strong>{' '}
            {media.production_countries[0]?.name || 'N/A'}
          </div>
          <div>
            <strong>Production:</strong>{' '}
            {media.production_companies
              .map((company) => company.name)
              .join(', ')}
          </div>
          <div>
            <strong>Cast:</strong>{' '}
            {media.credits.cast
              .slice(0, 5)
              .map((actor) => actor.name)
              .join(', ')}
          </div>
        </div>
      </div>
    </div>
  );
};
