import axios from 'axios';
import {
  Credits,
  Episode,
  Media,
  Movie,
  Season,
  SerieTV,
  VideoDetails
} from '../models/Media';

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
});

async function fetchFromAPI(endpoint: string): Promise<any> {
  try {
    const response = await apiClient.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export const fetchTrendingMedia = async (): Promise<Media[]> => {
  const data = await fetchFromAPI('/trending/all/week');
  return data.results;
};

export const fetchLatestMovie = async (): Promise<Movie> => {
  const data = await fetchFromAPI('/movie/latest');
  return { ...data, media_type: 'movie' };
};

export const fetchLatestSeries = async (): Promise<SerieTV> => {
  const data = await fetchFromAPI('/tv/latest');
  return { ...data, media_type: 'tv' };
};

export const fetchRecommendedMedia = async (
  id: number,
  mediaType: 'movie' | 'tv'
): Promise<Media[]> => {
  const endpoint = `/${mediaType}/${id}/recommendations`;
  const data = await fetchFromAPI(endpoint);
  return data.results.map((item: any) => ({
    ...item,
    media_type: item.media_type || mediaType
  }));
};

export const fetchMovieDetails = async (id: number): Promise<Movie> => {
  const data = await fetchFromAPI(`/movie/${id}`);
  return { ...data, media_type: 'movie' };
};

export const fetchTVDetails = async (id: number): Promise<SerieTV> => {
  const data = await fetchFromAPI(`/tv/${id}`);
  return { ...data, media_type: 'tv' };
};

export const fetchMovieCredits = async (id: number): Promise<Credits> => {
  const data = await fetchFromAPI(`/movie/${id}/credits`);
  return data;
};

export const fetchTVCredits = async (id: number): Promise<Credits> => {
  const data = await fetchFromAPI(`/tv/${id}/credits`);
  return data;
};

export const fetchNowPlayingMovies = async (
  page: number
): Promise<{ results: Movie[]; totalPages: number }> => {
  const response = await apiClient.get(`/movie/now_playing`, {
    params: { page }
  });
  return {
    results: response.data.results,
    totalPages: response.data.total_pages
  };
};

export const fetchPopularMovies = async (
  page: number
): Promise<{ results: Movie[]; totalPages: number }> => {
  const response = await apiClient.get(`/movie/popular`, {
    params: { page }
  });
  return {
    results: response.data.results,
    totalPages: response.data.total_pages
  };
};

export const fetchTopRatedMovies = async (
  page: number
): Promise<{ results: Movie[]; totalPages: number }> => {
  const response = await apiClient.get(`/movie/top_rated`, {
    params: { page }
  });
  return {
    results: response.data.results,
    totalPages: response.data.total_pages
  };
};

export const fetchUpcomingMovies = async (
  page: number
): Promise<{ results: Movie[]; totalPages: number }> => {
  const response = await apiClient.get(`/movie/upcoming`, {
    params: { page }
  });
  return {
    results: response.data.results,
    totalPages: response.data.total_pages
  };
};

export const fetchAiringTodaySeries = async (
  page: number
): Promise<{ results: SerieTV[]; totalPages: number }> => {
  const response = await apiClient.get(`/tv/airing_today`, {
    params: { page }
  });
  return {
    results: response.data.results,
    totalPages: response.data.total_pages
  };
};

export const fetchOnTheAirSeries = async (
  page: number
): Promise<{ results: SerieTV[]; totalPages: number }> => {
  const response = await apiClient.get(`/tv/on_the_air`, {
    params: { page }
  });
  return {
    results: response.data.results,
    totalPages: response.data.total_pages
  };
};

export const fetchPopularSeries = async (
  page: number
): Promise<{ results: SerieTV[]; totalPages: number }> => {
  const response = await apiClient.get(`/tv/popular`, {
    params: { page }
  });
  return {
    results: response.data.results,
    totalPages: response.data.total_pages
  };
};

export const fetchTopRatedSeries = async (
  page: number
): Promise<{ results: SerieTV[]; totalPages: number }> => {
  const response = await apiClient.get(`/tv/top_rated`, {
    params: { page }
  });
  return {
    results: response.data.results,
    totalPages: response.data.total_pages
  };
};

export const fetchGenres = async (
  mediaType: 'movie' | 'tv'
): Promise<{ id: number; name: string }[]> => {
  const data = await fetchFromAPI(`/genre/${mediaType}/list`);
  return data.genres;
};

export const fetchMediaByGenre = async (
  mediaType: 'movie' | 'tv',
  genreId: number | null,
  page: number = 1
): Promise<{ media: Movie[] | SerieTV[]; totalPages: number }> => {
  try {
    let endpoint;

    if (genreId) {
      endpoint =
        mediaType === 'movie'
          ? `/discover/movie?with_genres=${genreId}&page=${page}&api_key=${API_KEY}`
          : `/discover/tv?with_genres=${genreId}&page=${page}&api_key=${API_KEY}`;
    } else {
      endpoint =
        mediaType === 'movie'
          ? `/discover/movie?page=${page}&api_key=${API_KEY}`
          : `/discover/tv?page=${page}&api_key=${API_KEY}`;
    }

    const response = await apiClient.get(endpoint);

    const totalPages = response.data.total_pages;
    const mediaResults = response.data.results.slice(0, 20);

    return {
      media: mediaResults.map((item: any) => ({
        id: item.id,
        poster_path: item.poster_path,
        backdrop_path: item.backdrop_path,
        overview: item.overview,
        vote_average: item.vote_average,
        media_type: mediaType,
        genre_ids: item.genre_ids,
        genres: [],
        videoUrl: '',
        ...(mediaType === 'movie'
          ? {
              title: item.title,
              release_date: item.release_date,
              runtime: item.runtime || 0
            }
          : {
              name: item.name,
              first_air_date: item.first_air_date,
              number_of_seasons: item.number_of_seasons || 0,
              number_of_episodes: item.number_of_episodes || 0,
              last_episode_to_air: item.last_episode_to_air || null
            })
      })),
      totalPages
    };
  } catch (error) {
    console.error('Error fetching media by genre:', error);
    throw error;
  }
};

export const fetchSeasons = async (seriesId: number): Promise<Season[]> => {
  const data = await fetchFromAPI(`/tv/${seriesId}`);
  return data.seasons;
};

export const fetchEpisodes = async (
  seriesId: number,
  seasonNumber: number
): Promise<Episode[]> => {
  const data = await fetchFromAPI(`/tv/${seriesId}/season/${seasonNumber}`);
  return data.episodes;
};

export const fetchMovieVideos = async (
  movieId: number
): Promise<VideoDetails[]> => {
  const response = await apiClient.get(`/movie/${movieId}/videos`);
  return response.data.results;
};

export const fetchSeriesVideos = async (
  seriesId: number
): Promise<VideoDetails[]> => {
  const response = await apiClient.get(`/tv/${seriesId}/videos`);
  return response.data.results;
};

export const fetchMoviesSearch = async (query: string): Promise<Media[]> => {
  const response = await apiClient.get(`/search/movie`, {
    params: {
      query
    }
  });
  return response.data.results.map((item: any) => ({
    ...item,
    media_type: 'movie'
  }));
};

export const fetchSeriesSearch = async (query: string): Promise<Media[]> => {
  const response = await apiClient.get(`/search/tv`, {
    params: {
      query
    }
  });
  return response.data.results.map((item: any) => ({
    ...item,
    media_type: 'tv'
  }));
};
