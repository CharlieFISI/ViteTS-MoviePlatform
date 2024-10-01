import { HeroSection } from '../components/HeroSection';
import { MovieSection } from '../components/MovieSection';
import { RecentlyUpdated } from '../components/RecentlyUpdated';

export const Home = () => {
  return (
    <div className='min-h-screen bg-black text-white'>
      <HeroSection />
      <div className='mx-auto max-w-7xl space-y-12 px-4 py-12'>
        <RecentlyUpdated />
        <MovieSection
          type='trending'
          title='Trending'
        />
        <MovieSection
          type='newMovies'
          title='New Release - Movies'
        />
        <MovieSection
          type='newSeries'
          title='New Release - Series'
        />
        <MovieSection
          type='recommended'
          title='Recommended'
        />
      </div>
    </div>
  );
};
