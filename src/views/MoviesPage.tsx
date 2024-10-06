import { FilterSidebar } from '@/components/mediaPageComponents/FilterSidebar';
import { MediaContentPage } from '@/components/mediaPageComponents/MediaContentPage';
import { useState } from 'react';
import { useAppDispatch } from '../store/hooks';
import { setCurrentPage } from '../store/mediaSlice';

export const MoviesPage = () => {
  const [selectedFilter, setSelectedFilter] = useState<
    'popular' | 'nowPlaying' | 'topRated' | 'upcoming'
  >('popular');
  const dispatch = useAppDispatch();

  const handleSelectFilter = (filter: string) => {
    setSelectedFilter(filter as any);
    dispatch(setCurrentPage(1));
  };

  return (
    <div className='flex p-8'>
      <FilterSidebar
        mediaType='movie'
        selectedFilter={selectedFilter}
        onSelectFilter={handleSelectFilter}
      />
      <MediaContentPage
        mediaType='movie'
        selectedFilter={selectedFilter}
      />
    </div>
  );
};
