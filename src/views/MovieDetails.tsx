import { Button } from '@/components/ui/button';
import { getMovieBackdropURL } from '@/lib/utils';
import { fetchMovieDetails } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import {
  CalendarDays,
  ChevronDown,
  ChevronRight,
  Clock,
  Plus,
  Star,
  ThumbsDown,
  ThumbsUp
} from 'lucide-react';
import { useParams } from 'react-router-dom';

export const MovieDetails = () => {
  const { id } = useParams<{ id: string }>();
  console.log(id);

  const {
    data: movie,
    isPending,
    error
  } = useQuery({
    queryKey: [`movie-details-${id}`],
    queryFn: () => fetchMovieDetails(id || '')
  });
  console.log(movie);
  return (
    <div>
      {movie?.backdrop_path && (
        <img src={getMovieBackdropURL(movie.backdrop_path)} />
      )}
      <div className='grid grid-cols-3'>
        {movie?.poster_path && (
          <img
            src={getMovieBackdropURL(movie?.poster_path)}
            alt=''
          />
        )}
        <div className='col-span-2'>
          <div className='flex justify-between'>
            <h2>{movie?.title}</h2>
            <Button className='bg-red-600'>
              <Plus className='inline' />
              Add to Favourite
            </Button>
          </div>
          <div>
            {movie?.genres?.map((e) => <Button key={e.id}>{e.name}</Button>)}
            <span>
              <CalendarDays className='inline' /> {movie?.release_date}
            </span>
            <span>
              <Clock className='inline' />
              50:38
            </span>
            <span>
              <Star className='inline' />
              {movie?.vote_average}
            </span>
          </div>
          <p>{movie?.overview}</p>
          <table>
            {movie &&
              [
                ['Country', 'United States'],
                ['Genre', movie.genres?.map((e) => e.name).join(', ')],
                ['Date Release', 'may 05 2023'],
                ['Production', 'AMC Studios'],
                ['Cast', 'Rashida Jones, David Oyewolo, Tim Robbins']
              ].map((e) => (
                <tr>
                  <td className='text-right'>{e[0]}</td>
                  <td>: {e[1]}</td>
                </tr>
              ))}
          </table>
        </div>
      </div>
      <div>
        Season 1<ChevronDown className='inline' />
      </div>
      <div className='grid grid-cols-2 gap-2'>
        {[
          ,
          'Episodio 1: Freedom Day',
          'Episodio 1: Freedom Day',
          'Episodio 1: Freedom Day',
          'Episodio 1: Freedom Day',
          'Episodio 1: Freedom Day',
          'Episodio 1: Freedom Day'
        ].map((e) => (
          <div className='bg-white text-black'>
            <ChevronRight className='inline' />
            Episodio 1: Freedom Day
          </div>
        ))}
      </div>
      <div>You may also like</div>
      <div>Comments</div>
      <div className='flex items-center'>
        <img
          className='rounded-full'
          width={150}
          src='https://www.themarketingnutz.com/wp-content/uploads/2018/01/opulent-profile-square-07.jpg'
        />
        <div className='w-full'>
          <p>James</p>
          <textarea
            className='w-full'
            placeholder='Write your comments here.....'
          ></textarea>
        </div>
      </div>
      {[...Array(3).keys()].map((e) => (
        <div className='flex items-center'>
          <img
            className='rounded-full'
            width={150}
            src='https://www.themarketingnutz.com/wp-content/uploads/2018/01/opulent-profile-square-07.jpg'
          />

          <div>
            <p>Arlene</p>
            <p>12/06/2020</p>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Deleniti
              voluptas atque commodi officiis quaerat nisi, consequatur neque
              earum assumenda! Quasi iusto quos quae, expedita similique ad
              consequuntur sint quidem facilis!
            </p>
            <div className='flex'>
              <div>
                <ThumbsUp className='inline' /> 10
              </div>
              <div>
                <ThumbsDown className='inline' />
                10
              </div>
              <div>Reply</div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};
