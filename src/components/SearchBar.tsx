import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  clearSearchResults,
  fetchSearchResultsData
} from '../store/mediaSlice';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const dispatch = useAppDispatch();
  const { searchResults, isLoadingSearch } = useAppSelector(
    (state) => state.media
  );

  useEffect(() => {
    if (query.trim()) {
      const delayDebounceFn = setTimeout(() => {
        dispatch(fetchSearchResultsData(query));
      }, 300);
      return () => clearTimeout(delayDebounceFn);
    } else {
      dispatch(clearSearchResults());
    }
  }, [query, dispatch]);

  return (
    <div className='relative h-12 w-96'>
      <Input
        type='search'
        placeholder='Search movies or TV series...'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className='h-full w-full rounded-full border-0 bg-white bg-opacity-10 py-4 pl-6 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-20'
      />
      <Search
        className='absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400'
        size={20}
      />

      {query.length > 0 && searchResults.length > 0 && (
        <div className='absolute z-50 mt-2 w-full rounded-lg bg-black shadow-lg'>
          <ul className=''>
            {searchResults.slice(0, 4).map((item, index) => (
              <li
                key={item.id}
                className={`flex items-center px-4 py-2 ${
                  index % 2 === 0 ? 'bg-gray-800' : 'bg-black'
                }`}
              >
                <img
                  src={
                    item.poster_path
                      ? `https://image.tmdb.org/t/p/w92${item.poster_path}`
                      : 'https://via.placeholder.com/92x138?text=No+Image'
                  }
                  alt={item.media_type === 'movie' ? item.title : item.name}
                  className='mr-3 h-12 w-8 rounded-md object-cover'
                />
                <Link
                  to={
                    item.media_type === 'movie'
                      ? `/movies/${item.id}`
                      : `/series/${item.id}`
                  }
                  className='flex-1 text-white hover:text-gray-300'
                  onClick={() => setQuery('')}
                >
                  {item.media_type === 'movie' ? item.title : item.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                to={`/search?query=${query}`}
                className='block px-4 py-2 text-center text-white hover:bg-gray-800'
                onClick={() => setQuery('')}
              >
                View all
              </Link>
            </li>
          </ul>
        </div>
      )}
      {isLoadingSearch && query.length > 0 && (
        <div className='absolute z-50 mt-2 w-full rounded-lg bg-black shadow-lg'>
          <ul>
            <li className='block px-4 py-2 text-white'>Loading...</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
