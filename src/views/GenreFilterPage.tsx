import { FilterAccordion } from '@/components/genrePage/FilterAccordion';
import { MediaGenreFiltered } from '@/components/genrePage/MediaGenreFiltered';
import { useState } from 'react';
import { useAppDispatch } from '../store/hooks';
import { setCurrentPage } from '../store/mediaSlice';

export const GenreFilterPage = () => {
  const dispatch = useAppDispatch();
  const [selectedGenre, setSelectedGenre] = useState<{
    id: number;
    name: string;
    mediaType: 'movie' | 'tv';
  } | null>(null);

  const handleGenreSelect = (
    genreId: number,
    genreName: string,
    mediaType: 'movie' | 'tv'
  ) => {
    setSelectedGenre({
      id: genreId,
      name: genreName,
      mediaType
    });
    dispatch(setCurrentPage(1));
  };

  return (
    <div className='flex min-h-screen bg-black p-8 text-white'>
      <FilterAccordion onGenreSelect={handleGenreSelect} />
      <MediaGenreFiltered
        selectedGenre={selectedGenre}
        mediaType={selectedGenre ? selectedGenre.mediaType : 'movie'}
      />
    </div>
  );
};
