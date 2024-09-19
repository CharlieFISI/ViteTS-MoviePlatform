import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import { Clock, Play, Plus } from 'lucide-react';
import React from 'react';
import { Link } from 'react-router-dom';
import type { Movie } from '../models/Movie';
import { navigateToMovieDetails } from '../routes/navigation';

interface HeroSectionProps {
  movies: Movie[];
}

const HeroSection: React.FC<HeroSectionProps> = ({ movies }) => {
  if (!movies || movies.length === 0) return null;

  return (
    <Carousel className='relative mb-8 h-[70vh]'>
      <CarouselContent>
        {movies.slice(0, 5).map((movie) => (
          <CarouselItem key={movie.id}>
            <div className='relative h-full w-full'>
              <img
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={movie.title}
                className='absolute h-full w-full object-cover'
              />
              <div className='absolute inset-0 bg-black bg-opacity-60'></div>
              <div className='relative z-10 flex h-full items-center justify-center'>
                <div className='max-w-screen-lg px-4 text-center'>
                  <h1 className='mb-4 text-4xl font-bold leading-none tracking-tight text-white md:text-5xl lg:text-6xl'>
                    {movie.title}
                  </h1>
                  <div className='mb-4 flex flex-wrap items-center justify-center space-x-4'>
                    {movie.genres &&
                      movie.genres.map((genre) => (
                        <span
                          key={genre.id}
                          className='rounded bg-white bg-opacity-20 px-2 py-1 text-sm text-white'
                        >
                          {genre.name}
                        </span>
                      ))}
                    <span className='flex items-center text-white'>
                      <Clock
                        size={16}
                        className='mr-1'
                      />
                      {movie.runtime
                        ? `${Math.floor(movie.runtime / 60)}h ${movie.runtime % 60}m`
                        : 'N/A'}
                    </span>
                    <span className='text-white'>
                      {movie.release_date?.split('-')[0]}
                    </span>
                    <span className='flex items-center text-white'>
                      <span className='mr-1 text-yellow-400'>★</span>
                      {movie.vote_average?.toFixed(1)}
                    </span>
                  </div>
                  <p className='mb-8 text-lg font-normal text-gray-300 sm:px-16 lg:px-48 lg:text-xl'>
                    {movie.overview}
                  </p>
                  <div className='flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-x-4 sm:space-y-0'>
                    <Link to={navigateToMovieDetails(movie.id.toString())}>
                      <Button className='bg-red-600 text-white hover:bg-red-700'>
                        <Play
                          size={20}
                          className='mr-2'
                        />
                        Watch Now
                      </Button>
                    </Link>
                    <Button
                      variant='outline'
                      className='border-white text-white hover:bg-white hover:text-black'
                    >
                      <Plus
                        size={20}
                        className='mr-2'
                      />
                      Watch Later
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className='absolute left-4 top-1/2 -translate-y-1/2 transform' />
      <CarouselNext className='absolute right-4 top-1/2 -translate-y-1/2 transform' />
    </Carousel>
  );
};

export default HeroSection;
