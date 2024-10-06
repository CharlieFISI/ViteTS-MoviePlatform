import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Bell, Search } from 'lucide-react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../routes/constants';

const Header = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Home', path: ROUTES.HOME },
    { name: 'Genre', path: ROUTES.GENRES },
    { name: 'Country', path: '#' },
    { name: 'Movies', path: ROUTES.MOVIES },
    { name: 'Series', path: ROUTES.SERIES }
  ];

  return (
    <header className='pt-6 bg-black pb-9'>
      <div className='flex items-center justify-center'>
        <nav className='flex items-center space-x-6'>
          {navItems.map((item, index) => (
            <React.Fragment key={item.name}>
              <Link
                to={item.path}
                className={`relative text-lg font-semibold text-white ${
                  location.pathname === item.path ? 'font-semibold' : ''
                }`}
              >
                {item.name}
                {location.pathname === item.path && (
                  <span className='absolute w-1 h-1 transform -translate-x-1/2 bg-red-500 rounded-full -bottom-1 left-1/2' />
                )}
              </Link>
              {index === 2 && (
                <div className='relative h-12 w-96'>
                  <Input
                    type='search'
                    placeholder='Search movies......'
                    className='w-full h-full py-4 pl-6 pr-10 text-white bg-white border-0 rounded-full bg-opacity-10 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-20'
                  />
                  <Search
                    className='absolute text-gray-400 transform -translate-y-1/2 right-3 top-1/2'
                    size={20}
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </nav>
        <div className='flex items-center px-6 space-x-2'>
          <Link to={ROUTES.LOGIN}>
            <Button
              variant='ghost'
              className='text-lg font-semibold text-white hover:text-black'
            >
              Login/Signup
            </Button>
          </Link>
          <Button
            variant='ghost'
            size='icon'
            className='font-semibold text-white hover:text-black'
          >
            <Bell size={20} />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
