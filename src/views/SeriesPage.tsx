import { FilterSidebar } from '@/components/mediaPage/FilterSidebar';
import { MediaContentPage } from '@/components/mediaPage/MediaContentPage';
import { useState } from 'react';
import { useAppDispatch } from '../store/hooks';
import { setCurrentPage } from '../store/mediaSlice';

export const SeriesPage = () => {
  const [selectedFilter, setSelectedFilter] = useState<
    'popular' | 'airingToday' | 'topRated' | 'onTheAir'
  >('popular');
  const dispatch = useAppDispatch();

  const handleSelectFilter = (filter: string) => {
    setSelectedFilter(filter as any);
    dispatch(setCurrentPage(1));
  };

  return (
    <div className='flex p-8'>
      <FilterSidebar
        mediaType='tv'
        selectedFilter={selectedFilter}
        onSelectFilter={handleSelectFilter}
      />
      <MediaContentPage
        mediaType='tv'
        selectedFilter={selectedFilter}
      />
    </div>
  );
};
