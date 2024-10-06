import { Skeleton } from '@/components/ui/skeleton';
import { MediaCardSkeleton } from './MediaCardSkeleton';

export const MediaSectionSkeleton = () => {
  return (
    <section className='mb-12'>
      <div className='flex items-center justify-between mb-4'>
        <Skeleton className='w-48 h-8' />
        <Skeleton className='w-24 h-8' />
      </div>
      <div className='grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'>
        {[...Array(5)].map((_, index) => (
          <MediaCardSkeleton key={index} />
        ))}
      </div>
    </section>
  );
};
