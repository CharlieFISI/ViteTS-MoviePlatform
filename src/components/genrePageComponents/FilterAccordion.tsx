import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchGenresData } from '../../store/mediaSlice';

interface FilterAccordionProps {
  onGenreSelect: (
    genreId: number,
    genreName: string,
    mediaType: 'movie' | 'tv'
  ) => void;
}

export const FilterAccordion = ({ onGenreSelect }: FilterAccordionProps) => {
  const dispatch = useAppDispatch();
  const movieGenres = useAppSelector((state) => state.media.movieGenres);
  const tvGenres = useAppSelector((state) => state.media.tvGenres);

  useEffect(() => {
    dispatch(fetchGenresData('movie'));
    dispatch(fetchGenresData('tv'));
  }, [dispatch]);

  return (
    <Accordion
      type='multiple'
      className='w-1/4 pr-8'
    >
      {/* Sección de Películas */}
      <AccordionItem value='movies'>
        <AccordionTrigger className='text-2xl font-bold'>
          Movies
        </AccordionTrigger>
        <AccordionContent>
          <ul className='mb-8'>
            {movieGenres.map((genre) => (
              <li key={genre.id}>
                <button
                  className='w-full p-2 text-left hover:bg-gray-800'
                  onClick={() => onGenreSelect(genre.id, genre.name, 'movie')}
                >
                  {genre.name}
                </button>
              </li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>

      {/* Sección de Series */}
      <AccordionItem value='tv-series'>
        <AccordionTrigger className='text-2xl font-bold'>
          TV Series
        </AccordionTrigger>
        <AccordionContent>
          <ul>
            {tvGenres.map((genre) => (
              <li key={genre.id}>
                <button
                  className='w-full p-2 text-left hover:bg-gray-800'
                  onClick={() => onGenreSelect(genre.id, genre.name, 'tv')}
                >
                  {genre.name}
                </button>
              </li>
            ))}
          </ul>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
