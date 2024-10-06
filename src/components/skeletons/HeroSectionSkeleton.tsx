import { Skeleton } from '@/components/ui/skeleton';

export const HeroSectionSkeleton = () => {
  return (
    <section className='relative h-[80vh]'>
      <div className='absolute inset-0 z-10 bg-gradient-to-b from-transparent via-transparent to-black' />
      <Skeleton className='absolute inset-0 h-full w-full' />
      <div className='relative z-20 mx-auto flex h-full max-w-7xl flex-col justify-between px-4 py-12'>
        <div className='flex h-full flex-col items-center justify-center'>
          <div className='mb-8 flex space-x-4'>
            <Skeleton className='h-12 w-32 rounded-lg' />
            <Skeleton className='h-12 w-32 rounded-lg' />
          </div>
        </div>
        <div className='mb-8'>
          <Skeleton className='mb-4 h-10 w-1/2' />
          <div className='mb-4 flex items-center space-x-4'>
            <Skeleton className='h-6 w-12' />
            <Skeleton className='h-6 w-4' />
            <Skeleton className='h-6 w-24' />
            <div className='flex space-x-2'>
              <Skeleton className='h-6 w-16' />
              <Skeleton className='h-6 w-16' />
              <Skeleton className='h-6 w-16' />
            </div>
          </div>
          <Skeleton className='h-24 w-2/3' />
        </div>
      </div>
    </section>
  );
};
