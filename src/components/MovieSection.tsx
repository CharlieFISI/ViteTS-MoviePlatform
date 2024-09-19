import React from "react";
import MovieCard from "./MovieCard";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Movie } from "../models/Movie";

interface MovieSectionProps {
  title: string;
  movies: Movie[];
}

const MovieSection: React.FC<MovieSectionProps> = ({ title, movies }) => {
  return (
    <section className='mb-12'>
      <div className='flex items-center justify-between mb-4'>
        <h2 className='text-2xl font-semibold'>{title}</h2>
        <Button variant='link' className='text-gray-400 hover:text-white'>
          View All <ChevronRight size={20} />
        </Button>
      </div>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6'>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
};

export default MovieSection;
