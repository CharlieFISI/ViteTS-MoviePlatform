import { Outlet } from 'react-router-dom';
import Header from './Header';

export const Layout = () => {
  return (
    <div className='min-h-screen bg-black text-white'>
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};
