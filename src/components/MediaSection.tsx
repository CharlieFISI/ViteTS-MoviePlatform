import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Movie, SerieTV } from '../models/Media';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  fetchAiringTodaySeriesData,
  fetchNowPlayingMoviesData,
  fetchPopularMoviesData,
  fetchPopularSeriesData,
  fetchTrendingMediaData,
  initializeTab,
  setActiveTab
} from '../store/mediaSlice';
import { MediaCard } from './MediaCard';
import { MediaCardSkeleton } from './skeletons/MediaCardSkeleton';

type MediaSectionProps = {
  type: 'trending' | 'latestMovies' | 'latestSeries' | 'popular';
  title: string;
};

export function MediaSection({ type, title }: MediaSectionProps) {
  const dispatch = useAppDispatch();
  const activeTab = useAppSelector((state) => state.media.activeTab);
  const nowPlayingMovies = useAppSelector(
    (state) => state.media.nowPlayingMovies
  );
  const airingTodaySeries = useAppSelector(
    (state) => state.media.airingTodaySeries
  );
  const trendingMedia = useAppSelector((state) => state.media.trending);
  const popularMovies = useAppSelector((state) => state.media.popularMovies);
  const popularSeries = useAppSelector((state) => state.media.popularSeries);
  const isLoading = useAppSelector((state) => state.media.isLoading);

  const [currentTab, setCurrentTab] = useState<'movies' | 'series'>(activeTab);

  useEffect(() => {
    dispatch(initializeTab(type === 'latestMovies' ? 'movies' : 'series'));

    if (type === 'popular' && currentTab === 'movies') {
      dispatch(fetchPopularMoviesData({ count: 8, page: 1 }));
    } else if (type === 'popular' && currentTab === 'series') {
      dispatch(fetchPopularSeriesData({ count: 8, page: 1 }));
    } else {
      switch (type) {
        case 'latestMovies':
          dispatch(fetchNowPlayingMoviesData({ count: 4, page: 1 }));
          break;
        case 'latestSeries':
          dispatch(fetchAiringTodaySeriesData({ count: 4, page: 1 }));
          break;
        case 'trending':
          dispatch(fetchTrendingMediaData(6));
          break;
        default:
          break;
      }
    }
  }, [type, currentTab, dispatch]);

  const handleTabChange = (value: string) => {
    const tab = value as 'movies' | 'series';
    setCurrentTab(tab);
    dispatch(setActiveTab(tab));
  };

  let mediaItems: (Movie | SerieTV)[] = [];
  switch (type) {
    case 'latestMovies':
      mediaItems = nowPlayingMovies;
      break;
    case 'latestSeries':
      mediaItems = airingTodaySeries;
      break;
    case 'trending':
      mediaItems = trendingMedia;
      break;
    case 'popular':
      mediaItems = currentTab === 'movies' ? popularMovies : popularSeries;
      break;
  }

  return (
    <section className='mb-12'>
      <div className='mb-6 flex items-center justify-between'>
        <h2 className='text-2xl font-semibold text-white'>{title}</h2>
        {type === 'popular' && (
          <Tabs
            value={currentTab}
            onValueChange={handleTabChange}
          >
            <TabsList>
              <TabsTrigger value='movies'>Movies</TabsTrigger>
              <TabsTrigger value='series'>Series</TabsTrigger>
            </TabsList>
          </Tabs>
        )}
        <Button
          variant='link'
          className='text-white'
        >
          View all <ChevronRight className='ml-2 h-4 w-4' />
        </Button>
      </div>
      <div
        className={`grid gap-4 ${
          type === 'trending' ? 'grid-cols-3' : 'grid-cols-4'
        }`}
      >
        {isLoading
          ? Array.from({ length: type === 'trending' ? 3 : 4 }).map(
              (_, idx) => <MediaCardSkeleton key={idx} />
            )
          : mediaItems.map((item) => (
              <MediaCard
                key={item.id}
                item={item}
                cardType={type}
              />
            ))}
      </div>
    </section>
  );
}
