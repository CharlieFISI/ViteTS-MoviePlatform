import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import MovieSection from "../components/MovieSection";
import {
  fetchTrendingMovies,
  fetchNewReleases,
  fetchRecommendedMovies,
} from "../services/api";
import type { Movie } from "../models/Movie";

const Home: React.FC = () => {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [newReleaseMovies, setNewReleaseMovies] = useState<Movie[]>([]);
  const [newReleaseSeries, setNewReleaseSeries] = useState<Movie[]>([]);
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const trending = await fetchTrendingMovies();
        setTrendingMovies(trending);

        const newMovies = await fetchNewReleases("movie");
        setNewReleaseMovies(newMovies);

        const newSeries = await fetchNewReleases("tv");
        setNewReleaseSeries(newSeries);

        const recommended = await fetchRecommendedMovies();
        setRecommendedMovies(recommended);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  return (
    <div className='min-h-screen text-white bg-black'>
      <Header />
      <main>
        <HeroSection movies={trendingMovies} />
        <MovieSection
          title='Recently Updated'
          movies={trendingMovies.slice(0, 5)}
        />
        <MovieSection title='Trending' movies={trendingMovies} />
        <MovieSection title='New Release - Movies' movies={newReleaseMovies} />
        <MovieSection title='New Release - Series' movies={newReleaseSeries} />
        <MovieSection title='Recommended' movies={recommendedMovies} />
      </main>
    </div>
  );
};

export default Home;
