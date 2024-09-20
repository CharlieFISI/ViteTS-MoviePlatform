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
    { name: 'Genre', path: '#' },
    { name: 'Country', path: '#' },
    { name: 'Movies', path: '#' },
    { name: 'Series', path: '#' },
    { name: 'Animation', path: '#' }
  ];

  return (
    <header className='bg-black px-6 pb-9 pt-6'>
      <div className='container mx-auto flex items-center justify-center'>
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
                  <span className='absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 transform rounded-full bg-red-500' />
                )}
              </Link>
              {index === 2 && (
                <div className='relative h-12 w-96'>
                  <Input
                    type='search'
                    placeholder='Search movies......'
                    className='h-full w-full rounded-full border-0 bg-white bg-opacity-10 py-4 pl-6 pr-10 text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-20'
                  />
                  <Search
                    className='absolute right-3 top-1/2 -translate-y-1/2 transform text-gray-400'
                    size={20}
                  />
                </div>
              )}
            </React.Fragment>
          ))}
        </nav>
        <div className='flex items-center space-x-2 px-6'>
          <Button
            variant='ghost'
            className='text-lg font-semibold text-white hover:text-black'
          >
            Login/Signup
          </Button>
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
