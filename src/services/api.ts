import { Media, Movie, SerieTV } from '../models/Media';

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
};

async function fetchFromAPI(endpoint: string): Promise<any> {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
}

export const fetchTrendingMedia = async (): Promise<Media[]> => {
  const data = await fetchFromAPI('/trending/all/week');
  return data.results;
};

export const fetchNewReleases = async (
  type: 'movie' | 'tv'
): Promise<Media[]> => {
  const data = await fetchFromAPI(`/${type}/popular`);
  return data.results.map((item: any) => ({ ...item, media_type: type }));
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
