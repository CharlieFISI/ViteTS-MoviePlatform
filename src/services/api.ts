import { Movie } from "../models/Movie";

const API_KEY = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${API_KEY}`,
  },
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function fetchFromAPI(endpoint: string): Promise<any> {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export const fetchTrendingMovies = async (): Promise<Movie[]> => {
  const data = await fetchFromAPI("/trending/movie/week");
  return data.results;
};

export const fetchNewReleases = async (
  type: "movie" | "tv"
): Promise<Movie[]> => {
  const data = await fetchFromAPI(`/${type}/popular`);
  return data.results;
};

export const fetchRecommendedMovies = async (): Promise<Movie[]> => {
  const data = await fetchFromAPI("/movie/top_rated");
  return data.results;
};
