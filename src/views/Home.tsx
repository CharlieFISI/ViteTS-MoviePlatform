import { RecentlyUpdated } from '@/components/RecentlyUpdated';
import HeroSection from '../components/HeroSection';
import MovieSection from '../components/MovieSection';

export const Home = () => {
  return (
    <>
      <HeroSection />
      <RecentlyUpdated />
      <MovieSection
        title='Trending'
        type='trending'
      />
      <MovieSection
        title='New Release - Movies'
        type='newMovies'
      />
      <MovieSection
        title='New Release - Series'
        type='newSeries'
      />
      <MovieSection
        title='Recommended'
        type='recommended'
      />
    </>
  );
};
