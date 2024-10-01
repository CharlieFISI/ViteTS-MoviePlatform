import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '@/components/ui/carousel';
import {
  fetchMovieDetails,
  fetchTrendingMedia,
  fetchTVDetails
} from '@/services/api';
import { useQueries, useQuery } from '@tanstack/react-query';
import { Media, Movie, SerieTV } from '../models/Media';
import { RecentlyUpdatedMovieCard } from './RecentlyUpdatedMovieCard';

const QUERY_KEY = 'recentlyUpdated';
const LOADING_MESSAGE = 'Cargando...';
const ERROR_MESSAGE = 'Hubo un error al cargar los datos.';
const TOTAL_ITEMS = 16;
const ITEMS_PER_PAGE = 4;

export const RecentlyUpdated = () => {
  const {
    data: trendingMedia,
    isLoading: isLoadingTrending,
    error: errorTrending
  } = useQuery<Media[]>({
    queryKey: [QUERY_KEY],
    queryFn: fetchTrendingMedia
  });

  const detailQueries = useQueries({
    queries: (trendingMedia || []).slice(0, TOTAL_ITEMS).map((item) => ({
      queryKey: ['mediaDetail', item.id, item.media_type],
      queryFn: () =>
        item.media_type === 'movie'
          ? fetchMovieDetails(item.id)
          : fetchTVDetails(item.id),
      enabled: !!trendingMedia
    }))
  });

  const isLoadingDetails = detailQueries.some((query) => query.isLoading);
  const errorDetails = detailQueries.find((query) => query.error);

  if (isLoadingTrending || isLoadingDetails)
    return <div aria-live='polite'>{LOADING_MESSAGE}</div>;
  if (errorTrending || errorDetails)
    return <div aria-live='polite'>{ERROR_MESSAGE}</div>;
  if (!trendingMedia || trendingMedia.length === 0) return null;

  const mediaWithDetails = trendingMedia
    .slice(0, TOTAL_ITEMS)
    .map((item, index) => ({
      ...item,
      ...(detailQueries[index].data as Movie | SerieTV)
    }));

  const groupedMedia = [];
  for (let i = 0; i < mediaWithDetails.length; i += ITEMS_PER_PAGE) {
    groupedMedia.push(mediaWithDetails.slice(i, i + ITEMS_PER_PAGE));
  }

  return (
    <section className='px-8 mb-12'>
      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-2xl font-semibold'>Recently Updated</h2>
      </div>
      <Carousel
        opts={{
          align: 'start'
        }}
        className='w-full'
      >
        <CarouselContent>
          {groupedMedia.map((group, groupIndex) => (
            <CarouselItem
              key={groupIndex}
              className='md:basis-full lg:basis-full'
            >
              <div className='grid grid-cols-4 gap-4'>
                {group.map((item) => (
                  <RecentlyUpdatedMovieCard
                    key={item.id}
                    item={item}
                  />
                ))}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className='text-black bg-white border border-gray-200 hover:bg-gray-100' />
        <CarouselNext className='text-black bg-white border border-gray-200 hover:bg-gray-100' />
      </Carousel>
    </section>
  );
};
