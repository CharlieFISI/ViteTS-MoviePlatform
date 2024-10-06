import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { fetchMediaByGenreData, setCurrentPage } from '../../store/mediaSlice';
import { MediaCard } from '../MediaCard';
import { MediaGenreFilteredSkeleton } from '../skeletons/MediaGenreFilteredSkeleton';

interface MediaGenreFilteredProps {
  selectedGenre: { id: number; name: string; mediaType: 'movie' | 'tv' } | null;
  mediaType: 'movie' | 'tv';
}

export const MediaGenreFiltered = ({
  selectedGenre,
  mediaType
}: MediaGenreFilteredProps) => {
  const dispatch = useAppDispatch();
  const { filteredMedia, isLoading, currentPage, totalPages } = useAppSelector(
    (state) => state.media
  );

  useEffect(() => {
    if (selectedGenre) {
      dispatch(
        fetchMediaByGenreData({
          genreId: selectedGenre.id,
          mediaType: selectedGenre.mediaType,
          page: currentPage
        })
      );
    } else {
      dispatch(
        fetchMediaByGenreData({ genreId: null, mediaType, page: currentPage })
      );
    }
  }, [selectedGenre, mediaType, currentPage, dispatch]);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      dispatch(setCurrentPage(currentPage - 1));
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      dispatch(setCurrentPage(currentPage + 1));
    }
  };

  if (isLoading) {
    return <MediaGenreFilteredSkeleton />;
  }

  return (
    <div className='w-3/4'>
      <h1 className='mb-8 text-3xl font-bold'>
        {selectedGenre
          ? `${selectedGenre.mediaType === 'movie' ? 'Movies' : 'TV Series'} - ${selectedGenre.name}`
          : 'Popular Movies and TV Series'}
      </h1>
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        {filteredMedia.map((item) => (
          <MediaCard
            key={item.id}
            item={item}
            cardType='popular'
          />
        ))}
      </div>

      <div className='mt-8 flex items-center justify-center'>
        <Button
          variant='outline'
          className='mr-4 bg-gray-800 px-6 py-2 text-white hover:bg-gray-700'
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span className='text-lg'>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          variant='outline'
          className='ml-4 bg-gray-800 px-6 py-2 text-white hover:bg-gray-700'
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
