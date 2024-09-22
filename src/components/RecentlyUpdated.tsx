import { fetchTrendingMedia } from '@/services/api';
import { useQuery } from '@tanstack/react-query';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Media } from '../models/Media';
import { RecentlyUpdatedMovieCard } from './RecentlyUpdatedMovieCard';

const QUERY_KEY = 'recentlyUpdated';
const LOADING_MESSAGE = 'Cargando...';
const ERROR_MESSAGE = 'Hubo un error al cargar los datos.';

export const RecentlyUpdated = () => {
  const {
    data: mediaItems,
    isLoading,
    error
  } = useQuery<Media[]>({
    queryKey: [QUERY_KEY],
    queryFn: fetchTrendingMedia
  });

  if (isLoading) return <div aria-live='polite'>{LOADING_MESSAGE}</div>;
  if (error) return <div aria-live='polite'>{ERROR_MESSAGE}</div>;
  if (!mediaItems || mediaItems.length === 0) return null;

  return (
    <section className='mb-12'>
      <div className='mb-4 flex items-center justify-between'>
        <h2 className='text-2xl font-semibold'>Recently Updated</h2>
      </div>
      <div className='flex'>
        <div className='grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4'>
          {mediaItems.slice(0, 4).map((item) => (
            <RecentlyUpdatedMovieCard
              key={item.id}
              item={item}
            />
          ))}
        </div>
        <Link
          to={'#'}
          className='ml-auto flex h-20 w-20 items-center justify-center rounded-full bg-white'
          aria-label='Ver más películas actualizadas recientemente'
        >
          <ArrowRight className='h-9 w-9 text-black' />
        </Link>
      </div>
    </section>
  );
};
