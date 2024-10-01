import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useQueries, useQuery } from '@tanstack/react-query';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Media, Movie, SerieTV } from '../models/Media';
import {
  fetchMovieDetails,
  fetchNewReleases,
  fetchTrendingMedia,
  fetchTVDetails
} from '../services/api';
import { MovieCard } from './MovieCard';

type MovieSectionProps = {
  type: 'trending' | 'newMovies' | 'newSeries' | 'recommended';
  title: string;
};

export const MovieSection = ({ type, title }: MovieSectionProps) => {
  const [activeTab, setActiveTab] = useState<'all' | 'movies' | 'series'>(
    type === 'newMovies' ? 'movies' : type === 'newSeries' ? 'series' : 'all'
  );

  const {
    data: mediaItems,
    isLoading,
    error
  } = useQuery<Media[]>({
    queryKey: [type, activeTab],
    queryFn: async () => {
      switch (type) {
        case 'trending':
          return (await fetchTrendingMedia()).slice(0, 3);
        case 'newMovies':
        case 'newSeries':
          return (
            await fetchNewReleases(type === 'newMovies' ? 'movie' : 'tv')
          ).slice(0, 4);
        case 'recommended': {
          const trendingMedia = await fetchTrendingMedia();
          return trendingMedia
            .filter((item) =>
              activeTab === 'movies'
                ? item.media_type === 'movie'
                : item.media_type === 'tv'
            )
            .sort((a, b) => {
              const dateA = new Date(
                a.media_type === 'movie' ? a.release_date : a.first_air_date
              );
              const dateB = new Date(
                b.media_type === 'movie' ? b.release_date : b.first_air_date
              );
              return dateB.getTime() - dateA.getTime();
            })
            .slice(0, 8);
        }
        default:
          throw new Error(`Invalid type: ${type}`);
      }
    }
  });

  const detailQueries = useQueries({
    queries: (mediaItems || []).map((item) => ({
      queryKey: ['mediaDetail', item.id, item.media_type],
      queryFn: () =>
        item.media_type === 'movie'
          ? fetchMovieDetails(item.id)
          : fetchTVDetails(item.id),
      enabled: !!mediaItems
    }))
  });

  const isLoadingDetails = detailQueries.some((query) => query.isLoading);
  const errorDetails = detailQueries.find((query) => query.error);

  if (isLoading || isLoadingDetails) return <div>Loading...</div>;
  if (error || errorDetails) return <div>Error fetching media</div>;
  if (!mediaItems || mediaItems.length === 0) return null;

  const mediaWithDetails = mediaItems.map((item, index) => ({
    ...item,
    ...(detailQueries[index].data as Movie | SerieTV)
  }));

  return (
    <section className='mb-12'>
      <div className='mb-6 flex items-center justify-between'>
        <h2 className='text-2xl font-semibold text-white'>{title}</h2>
        {type === 'recommended' && (
          <Tabs
            value={activeTab}
            onValueChange={(value) =>
              setActiveTab(value as 'all' | 'movies' | 'series')
            }
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
        className={`grid gap-4 ${type === 'trending' ? 'grid-cols-3' : 'grid-cols-4'}`}
      >
        {mediaWithDetails.map((item) => (
          <MovieCard
            key={item.id}
            item={item}
            cardType={type}
          />
        ))}
      </div>
    </section>
  );
};
