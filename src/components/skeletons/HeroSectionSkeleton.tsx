import { Skeleton } from '@/components/ui/skeleton';

export const HeroSectionSkeleton = () => {
  return (
    <div className='relative mb-8 h-[calc(70vh-108px)] overflow-hidden bg-gray-900'>
      <Skeleton className='w-full h-full' />
      <div className='absolute bottom-0 left-0 max-w-2xl p-8'>
        <Skeleton className='w-3/4 h-12 mb-4' />
        <Skeleton className='w-full h-4 mb-2' />
        <Skeleton className='w-full h-4 mb-2' />
        <Skeleton className='w-3/4 h-4 mb-6' />
        <div className='flex space-x-4'>
          <Skeleton className='w-40 h-14' />
          <Skeleton className='w-40 h-14' />
        </div>
      </div>
      <div className='absolute flex space-x-4 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2'>
        <Skeleton className='w-48 h-16' />
        <Skeleton className='w-48 h-16' />
      </div>
      <div className='absolute flex space-x-2 transform -translate-x-1/2 bottom-4 left-1/2'>
        {[...Array(5)].map((_, index) => (
          <Skeleton
            key={index}
            className='w-3 h-3 rounded-full'
          />
        ))}
      </div>
    </div>
  );
};
