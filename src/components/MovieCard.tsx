import { Link } from 'react-router-dom';
import type { Movie } from '../models/Movie';
import { navigateToMovieDetails } from '../routes/navigation';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  return (
    <Link
      to={navigateToMovieDetails(movie.id.toString())}
      className='block'
    >
      <div className='overflow-hidden bg-gray-800 rounded-lg'>
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className='object-cover w-full h-64'
        />
        <div className='p-4'>
          <h3 className='mb-2 font-semibold'>{movie.title}</h3>
          <span className='text-sm text-gray-400'>
            {movie.release_date?.split('-')[0]}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default MovieCard;
