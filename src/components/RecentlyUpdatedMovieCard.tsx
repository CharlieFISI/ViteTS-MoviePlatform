import { Movie } from '@/models/Movie';
import { navigateToMovieDetails } from '@/routes/navigation';
import { Link } from 'react-router-dom';

interface RecentlyUpdatedMovieCardProps {
  movie: Movie;
}

export const RecentlyUpdatedMovieCard: React.FC<
  RecentlyUpdatedMovieCardProps
> = ({ movie }) => {
  return (
    <Link
      to={navigateToMovieDetails(movie.id.toString())}
      className='flex'
    >
      <div className='flex overflow-hidden'>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className='object-cover w-16 rounded'
        />
        <div className='p-4'>
          <h3 className='font-semibold'>{movie.title}</h3>
          <p className='text-sm text-gray-400'>Series/S 2/EP 9</p>
          <span className='text-sm text-gray-400'>{2024}</span>
        </div>
      </div>
    </Link>
  );
};
