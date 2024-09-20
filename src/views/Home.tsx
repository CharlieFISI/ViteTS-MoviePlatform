import { RecentlyUpdated } from '@/components/RecentlyUpdated';
import { useQuery } from '@tanstack/react-query';
import HeroSection from '../components/HeroSection';
import MovieSection from '../components/MovieSection';
import {
  fetchNewReleases,
  fetchRecommendedMovies,
  fetchTrendingMovies
} from '../services/api';

export const Home = () => {
  const { data: newReleaseMovies } = useQuery({
    queryKey: ['newReleaseMovies'],
    queryFn: fetchTrendingMovies,
    initialData: []
  });

  const { data: trendingMovies } = useQuery({
    queryKey: ['recently-updated'],
    queryFn: () => fetchNewReleases('movie'),
    initialData: []
  });

  const { data: newReleaseSeries } = useQuery({
    queryKey: ['newReleaseSeries'],
    queryFn: () => fetchNewReleases('tv'),
    initialData: []
  });

  const { data: recommendedMovies } = useQuery({
    queryKey: ['recommendedMovies'],
    queryFn: fetchRecommendedMovies,
    initialData: []
  });

  return (
    <>
      <HeroSection movies={trendingMovies} />
      <RecentlyUpdated />
      <MovieSection
        title='Trending'
        movies={trendingMovies}
      />
      <MovieSection
        title='New Release - Movies'
        movies={newReleaseMovies}
      />
      <MovieSection
        title='New Release - Series'
        movies={newReleaseSeries}
      />
      <MovieSection
        title='Recommended'
        movies={recommendedMovies}
      />
    </>
  );
};
