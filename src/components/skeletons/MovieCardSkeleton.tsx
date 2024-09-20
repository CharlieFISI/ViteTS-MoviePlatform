import { Skeleton } from '@/components/ui/skeleton';

export const MovieCardSkeleton = () => {
  return (
    <div className='overflow-hidden bg-gray-800 rounded-lg'>
      <Skeleton className='w-full h-64' />
      <div className='p-4'>
        <Skeleton className='w-3/4 h-6 mb-2' />
        <Skeleton className='w-1/2 h-4' />
      </div>
    </div>
  );
};
