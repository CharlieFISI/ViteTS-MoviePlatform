import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

interface FilterSidebarProps {
  mediaType: 'movie' | 'tv';
  selectedFilter: string;
  onSelectFilter: (filter: string) => void;
}

export const FilterSidebar = ({
  mediaType,
  selectedFilter,
  onSelectFilter
}: FilterSidebarProps) => {
  return (
    <div className='w-1/4 pr-8'>
      <h2 className='mb-4 text-2xl font-bold'>Filters</h2>
      <ul className='space-y-2'>
        {mediaType === 'movie' ? (
          <>
            <li>
              <Button
                className={`w-full text-left ${
                  selectedFilter === 'popular'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-700'
                }`}
                onClick={() => onSelectFilter('popular')}
              >
                Popular
              </Button>
            </li>
            <li>
              <Button
                className={`w-full text-left ${
                  selectedFilter === 'nowPlaying'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-700'
                }`}
                onClick={() => onSelectFilter('nowPlaying')}
              >
                Now Playing
              </Button>
            </li>
            <li>
              <Button
                className={`w-full text-left ${
                  selectedFilter === 'topRated'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-700'
                }`}
                onClick={() => onSelectFilter('topRated')}
              >
                Top Rated
              </Button>
            </li>
            <li>
              <Button
                className={`w-full text-left ${
                  selectedFilter === 'upcoming'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-700'
                }`}
                onClick={() => onSelectFilter('upcoming')}
              >
                Upcoming
              </Button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Button
                className={`w-full text-left ${
                  selectedFilter === 'popular'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-700'
                }`}
                onClick={() => onSelectFilter('popular')}
              >
                Popular
              </Button>
            </li>
            <li>
              <Button
                className={`w-full text-left ${
                  selectedFilter === 'airingToday'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-700'
                }`}
                onClick={() => onSelectFilter('airingToday')}
              >
                Airing Today
              </Button>
            </li>
            <li>
              <Button
                className={`w-full text-left ${
                  selectedFilter === 'topRated'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-700'
                }`}
                onClick={() => onSelectFilter('topRated')}
              >
                Top Rated
              </Button>
            </li>
            <li>
              <Button
                className={`w-full text-left ${
                  selectedFilter === 'onTheAir'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-700'
                }`}
                onClick={() => onSelectFilter('onTheAir')}
              >
                On The Air
              </Button>
            </li>
          </>
        )}
      </ul>
      <Separator className='my-4' />
    </div>
  );
};
