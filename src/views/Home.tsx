import { HeroSection } from '../components/HeroSection';
import { MediaSection } from '../components/MediaSection';
import { RecentlyUpdated } from '../components/RecentlyUpdated';

export const Home = () => {
  return (
    <div className='min-h-screen bg-black text-white'>
      <HeroSection />
      <div className='mx-auto max-w-7xl space-y-12 px-4 py-12'>
        <RecentlyUpdated />
        <MediaSection
          type='trending'
          title='Trending'
        />
        <MediaSection
          type='latestMovies'
          title='New Release - Movies'
        />
        <MediaSection
          type='latestSeries'
          title='New Release - Series'
        />
        <MediaSection
          type='popular'
          title='Popular'
        />
      </div>
    </div>
  );
};
