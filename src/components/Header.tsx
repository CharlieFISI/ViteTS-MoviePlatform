import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Search, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ROUTES } from "../routes/constants";

const Header: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: ROUTES.HOME },
    { name: "Genre", path: "#" },
    { name: "Country", path: "#" },
    { name: "Movies", path: "#" },
    { name: "Series", path: "#" },
    { name: "Animation", path: "#" },
  ];

  return (
    <header className='px-6 pt-6 bg-black pb-9'>
      <div className='container flex items-center justify-center mx-auto'>
        <nav className='flex items-center space-x-6'>
          {navItems.map((item, index) => (
            <React.Fragment key={item.name}>
              <Link
                to={item.path}
                className={`text-white font-semibold text-lg relative ${
                  location.pathname === item.path ? "font-semibold" : ""
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
