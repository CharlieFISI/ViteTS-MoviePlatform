import { MediaCardSkeleton } from './MediaCardSkeleton';

export const MediaGenreFilteredSkeleton = () => {
  return (
    <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
      {Array.from({ length: 20 }).map((_, idx) => (
        <MediaCardSkeleton key={idx} />
      ))}
    </div>
  );
};
