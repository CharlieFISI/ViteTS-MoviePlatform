import { Skeleton } from '@/components/ui/skeleton';

export const MediaCardSkeleton = () => {
  return (
    <div className='overflow-hidden rounded-lg border-0 bg-transparent'>
      <Skeleton className='h-64 w-full object-cover' />
      <div className='p-4'>
        <Skeleton className='mb-2 h-6 w-3/4' />
        <Skeleton className='h-4 w-1/2' />
      </div>
    </div>
  );
};
