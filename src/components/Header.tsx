import { Button } from '@/components/ui/button';
import { Bell } from 'lucide-react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ROUTES } from '../routes/constants';
import SearchBar from './SearchBar';

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
    <header className='bg-black pb-9 pt-6'>
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
                  <span className='absolute -bottom-1 left-1/2 h-1 w-1 -translate-x-1/2 transform rounded-full bg-red-500' />
                )}
              </Link>
              {index === 2 && <SearchBar />}
            </React.Fragment>
          ))}
        </nav>
        <div className='flex items-center space-x-2 px-6'>
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
