import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import React from 'react';
import type { Movie } from '../models/Movie';
import MovieCard from './MovieCard';

interface MovieSectionProps {
  title: string;
  movies: Movie[];
}

const MovieSection: React.FC<MovieSectionProps> = ({ title, movies }) => {
  return (
    <section className='mb-12'>
      <div className='mb-4 flex items-center justify-between'>
        <h2 className='text-2xl font-semibold'>{title}</h2>
        <Button
          variant='link'
          className='text-gray-400 hover:text-white'
        >
          View All <ChevronRight size={20} />
        </Button>
      </div>
      <div className='grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
        {movies.map((movie) => (
          <MovieCard
            key={movie.id}
            movie={movie}
          />
        ))}
      </div>
    </section>
  );
};

export default MovieSection;
