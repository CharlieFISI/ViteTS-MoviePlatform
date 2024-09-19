import React from "react";
import { Play, Clock, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Movie } from "../models/Movie";
import { Link } from "react-router-dom";
import { navigateToMovieDetails } from "../routes/navigation";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface HeroSectionProps {
  movies: Movie[];
}

const HeroSection: React.FC<HeroSectionProps> = ({ movies }) => {
  if (!movies || movies.length === 0) return null;

  return (
    <Carousel className='relative h-[70vh] mb-8'>
      <CarouselContent>
        {movies.slice(0, 5).map((movie) => (
          <CarouselItem key={movie.id}>
            <div className='relative w-full h-full'>
              <img
                src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                alt={movie.title}
                className='absolute object-cover w-full h-full'
              />
              <div className='absolute inset-0 bg-black bg-opacity-60'></div>
              <div className='relative z-10 flex items-center justify-center h-full'>
                <div className='max-w-screen-lg px-4 text-center'>
                  <h1 className='mb-4 text-4xl font-bold leading-none tracking-tight text-white md:text-5xl lg:text-6xl'>
                    {movie.title}
                  </h1>
                  <div className='flex flex-wrap items-center justify-center mb-4 space-x-4'>
                    {movie.genres &&
                      movie.genres.map((genre) => (
                        <span
                          key={genre.id}
                          className='px-2 py-1 text-sm text-white bg-white rounded bg-opacity-20'
                        >
                          {genre.name}
                        </span>
                      ))}
                    <span className='flex items-center text-white'>
                      <Clock size={16} className='mr-1' />
                      {movie.runtime
                        ? `${Math.floor(movie.runtime / 60)}h ${
                            movie.runtime % 60
                          }m`
                        : "N/A"}
                    </span>
                    <span className='text-white'>
                      {movie.release_date?.split("-")[0]}
                    </span>
                    <span className='flex items-center text-white'>
                      <span className='mr-1 text-yellow-400'>★</span>
                      {movie.vote_average?.toFixed(1)}
                    </span>
                  </div>
                  <p className='mb-8 text-lg font-normal text-gray-300 lg:text-xl sm:px-16 lg:px-48'>
                    {movie.overview}
                  </p>
                  <div className='flex flex-col space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4'>
                    <Link to={navigateToMovieDetails(movie.id.toString())}>
                      <Button className='text-white bg-red-600 hover:bg-red-700'>
                        <Play size={20} className='mr-2' />
                        Watch Now
                      </Button>
                    </Link>
                    <Button
                      variant='outline'
                      className='text-white border-white hover:bg-white hover:text-black'
                    >
                      <Plus size={20} className='mr-2' />
                      Watch Later
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className='absolute transform -translate-y-1/2 left-4 top-1/2' />
      <CarouselNext className='absolute transform -translate-y-1/2 right-4 top-1/2' />
    </Carousel>
  );
};

export default HeroSection;
