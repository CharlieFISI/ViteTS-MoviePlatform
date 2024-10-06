import { Button } from '@/components/ui/button';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import {
  fetchAiringTodaySeriesData,
  fetchNowPlayingMoviesData,
  fetchOnTheAirSeriesData,
  fetchPopularMoviesData,
  fetchPopularSeriesData,
  fetchTopRatedMoviesData,
  fetchTopRatedSeriesData,
  fetchUpcomingMoviesData,
  setCurrentPage
} from '../../store/mediaSlice';
import { MediaCard } from '../MediaCard';
import { MediaContentPageSkeleton } from '../skeletons/MediaContentPageSkeleton';

interface MediaContentPageProps {
  mediaType: 'movie' | 'tv';
  selectedFilter: string;
}

export const MediaContentPage = ({
  mediaType,
  selectedFilter
}: MediaContentPageProps) => {
  const dispatch = useAppDispatch();
  const {
    nowPlayingMovies,
    popularMovies,
    topRatedMovies,
    upcomingMovies,
    airingTodaySeries,
    onTheAirSeries,
    topRatedSeries,
    popularSeries,
    isLoading,
    error,
    currentPage,
    totalPages
  } = useAppSelector((state) => state.media);

  const itemsPerPage = 20;

  useEffect(() => {
    if (mediaType === 'movie') {
      switch (selectedFilter) {
        case 'nowPlaying':
          dispatch(
            fetchNowPlayingMoviesData({
              count: itemsPerPage,
              page: currentPage
            })
          );
          break;
        case 'topRated':
          dispatch(
            fetchTopRatedMoviesData({ count: itemsPerPage, page: currentPage })
          );
          break;
        case 'upcoming':
          dispatch(
            fetchUpcomingMoviesData({ count: itemsPerPage, page: currentPage })
          );
          break;
        case 'popular':
        default:
          dispatch(
            fetchPopularMoviesData({ count: itemsPerPage, page: currentPage })
          );
          break;
      }
    } else {
      switch (selectedFilter) {
        case 'airingToday':
          dispatch(
            fetchAiringTodaySeriesData({
              count: itemsPerPage,
              page: currentPage
            })
          );
          break;
        case 'onTheAir':
          dispatch(
            fetchOnTheAirSeriesData({ count: itemsPerPage, page: currentPage })
          );
          break;
        case 'topRated':
          dispatch(
            fetchTopRatedSeriesData({ count: itemsPerPage, page: currentPage })
          );
          break;
        case 'popular':
        default:
          dispatch(
            fetchPopularSeriesData({ count: itemsPerPage, page: currentPage })
          );
          break;
      }
    }
  }, [dispatch, mediaType, selectedFilter, currentPage]);

  const getMediaToDisplay = () => {
    if (mediaType === 'movie') {
      switch (selectedFilter) {
        case 'nowPlaying':
          return nowPlayingMovies;
        case 'topRated':
          return topRatedMovies;
        case 'upcoming':
          return upcomingMovies;
        case 'popular':
        default:
          return popularMovies;
      }
    } else {
      switch (selectedFilter) {
        case 'airingToday':
          return airingTodaySeries;
        case 'onTheAir':
          return onTheAirSeries;
        case 'topRated':
          return topRatedSeries;
        case 'popular':
        default:
          return popularSeries;
      }
    }
  };

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

  const getTitle = () => {
    switch (selectedFilter) {
      case 'nowPlaying':
        return 'Now Playing';
      case 'upcoming':
        return 'Upcoming';
      case 'topRated':
        return 'Top Rated';
      case 'airingToday':
        return 'Airing Today';
      case 'onTheAir':
        return 'On The Air';
      case 'popular':
      default:
        return 'Popular';
    }
  };

  if (isLoading) return <MediaContentPageSkeleton />;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='w-3/4'>
      <h1 className='mb-8 text-4xl font-bold'>
        {mediaType === 'movie' ? 'Movies' : 'TV Series'} - {getTitle()}
      </h1>

      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        {getMediaToDisplay().map((item) => (
          <MediaCard
            key={item.id}
            item={item}
            cardType='popular'
          />
        ))}
      </div>

      <div className='flex items-center justify-center mt-8'>
        <Button
          variant='outline'
          className='px-6 py-2 mr-4 text-white bg-gray-800 hover:bg-gray-700'
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
          className='px-6 py-2 ml-4 text-white bg-gray-800 hover:bg-gray-700'
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
};
