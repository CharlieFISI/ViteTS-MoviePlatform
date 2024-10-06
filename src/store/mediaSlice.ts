import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Episode, Media, Movie, Season, SerieTV } from '../models/Media';
import {
  fetchAiringTodaySeries,
  fetchEpisodes,
  fetchGenres,
  fetchLatestMovie,
  fetchLatestSeries,
  fetchMediaByGenre,
  fetchMovieDetails,
  fetchNowPlayingMovies,
  fetchOnTheAirSeries,
  fetchPopularMovies,
  fetchPopularSeries,
  fetchRecommendedMedia,
  fetchSeasons,
  fetchTopRatedMovies,
  fetchTopRatedSeries,
  fetchTrendingMedia,
  fetchTVDetails,
  fetchUpcomingMovies
} from '../services/api';

interface MediaState {
  trending: Media[];
  nowPlayingMovies: Movie[];
  popularMovies: Movie[];
  topRatedMovies: Movie[];
  upcomingMovies: Movie[];
  popularSeries: SerieTV[];
  airingTodaySeries: SerieTV[];
  topRatedSeries: SerieTV[];
  onTheAirSeries: SerieTV[];
  filteredMedia: Media[];
  currentPage: number;
  totalPages: number;
  recommended: Record<string, Media[]>;
  activeTab: 'movies' | 'series';
  movieDetails: Record<number, Movie>;
  serieDetails: Record<number, SerieTV>;
  seasons: Record<number, Season[]>;
  episodes: Record<string, Episode[]>;
  movieGenres: { id: number; name: string }[];
  tvGenres: { id: number; name: string }[];
  isLoading: boolean;
  error: string | null;
  currentIndex: number;
  isImageLoaded: boolean;
}

const initialState: MediaState = {
  trending: [],
  nowPlayingMovies: [],
  popularMovies: [],
  topRatedMovies: [],
  upcomingMovies: [],
  airingTodaySeries: [],
  popularSeries: [],
  topRatedSeries: [],
  onTheAirSeries: [],
  filteredMedia: [],
  currentPage: 1,
  totalPages: 0,
  recommended: {},
  activeTab: 'movies',
  movieDetails: {},
  serieDetails: {},
  seasons: {},
  episodes: {},
  movieGenres: [],
  tvGenres: [],
  isLoading: false,
  error: null,
  currentIndex: 0,
  isImageLoaded: false
};

export const fetchTrendingMediaData = createAsyncThunk(
  'media/fetchTrending',
  async (count: number) => {
    const media = await fetchTrendingMedia();
    const limitedMedia = media.slice(0, count);

    const detailsPromises = limitedMedia.map((item) =>
      item.media_type === 'movie'
        ? fetchMovieDetails(item.id)
        : fetchTVDetails(item.id)
    );

    const details = await Promise.all(detailsPromises);

    return limitedMedia.map((item, index) => ({
      ...item,
      ...details[index]
    })) as (Movie | SerieTV)[];
  }
);

export const fetchLatestMovieData = createAsyncThunk(
  'media/fetchLatestMovie',
  async () => {
    const movie = await fetchLatestMovie();
    return movie;
  }
);

export const fetchLatestSeriesData = createAsyncThunk(
  'media/fetchLatestSeries',
  async () => {
    const series = await fetchLatestSeries();
    return series;
  }
);

export const fetchNowPlayingMoviesData = createAsyncThunk(
  'media/fetchNowPlayingMovies',
  async ({ count, page }: { count: number; page: number }) => {
    const response = await fetchNowPlayingMovies(page);
    const limitedMovies = response.results.slice(0, count);

    const movieDetailsPromises = limitedMovies.map((movie) =>
      fetchMovieDetails(movie.id)
    );
    const movieDetails = await Promise.all(movieDetailsPromises);

    return {
      movies: limitedMovies.map((movie, index) => ({
        ...movie,
        ...movieDetails[index]
      })) as Movie[],
      totalPages: response.totalPages
    };
  }
);

export const fetchPopularMoviesData = createAsyncThunk(
  'media/fetchPopularMovies',
  async ({ count, page }: { count: number; page: number }) => {
    const response = await fetchPopularMovies(page);
    const limitedMovies = response.results.slice(0, count);

    const movieDetailsPromises = limitedMovies.map((movie) =>
      fetchMovieDetails(movie.id)
    );
    const movieDetails = await Promise.all(movieDetailsPromises);

    return {
      movies: limitedMovies.map((movie, index) => ({
        ...movie,
        ...movieDetails[index]
      })) as Movie[],
      totalPages: response.totalPages
    };
  }
);

export const fetchTopRatedMoviesData = createAsyncThunk(
  'media/fetchTopRatedMovies',
  async ({ count, page }: { count: number; page: number }) => {
    const response = await fetchTopRatedMovies(page);
    const limitedMovies = response.results.slice(0, count);

    const movieDetailsPromises = limitedMovies.map((movie) =>
      fetchMovieDetails(movie.id)
    );
    const movieDetails = await Promise.all(movieDetailsPromises);

    return {
      movies: limitedMovies.map((movie, index) => ({
        ...movie,
        ...movieDetails[index]
      })) as Movie[],
      totalPages: response.totalPages
    };
  }
);

export const fetchUpcomingMoviesData = createAsyncThunk(
  'media/fetchUpcomingMovies',
  async ({ count, page }: { count: number; page: number }) => {
    const response = await fetchUpcomingMovies(page);
    const limitedMovies = response.results.slice(0, count);

    const movieDetailsPromises = limitedMovies.map((movie) =>
      fetchMovieDetails(movie.id)
    );
    const movieDetails = await Promise.all(movieDetailsPromises);

    return {
      movies: limitedMovies.map((movie, index) => ({
        ...movie,
        ...movieDetails[index]
      })) as Movie[],
      totalPages: response.totalPages
    };
  }
);

export const fetchAiringTodaySeriesData = createAsyncThunk(
  'media/fetchAiringTodaySeries',
  async ({ count, page }: { count: number; page: number }) => {
    const response = await fetchAiringTodaySeries(page);
    const limitedSeries = response.results.slice(0, count);

    const seriesDetailsPromises = limitedSeries.map((serie) =>
      fetchTVDetails(serie.id)
    );
    const seriesDetails = await Promise.all(seriesDetailsPromises);

    return {
      series: limitedSeries.map((serie, index) => ({
        ...serie,
        ...seriesDetails[index]
      })) as SerieTV[],
      totalPages: response.totalPages
    };
  }
);

export const fetchPopularSeriesData = createAsyncThunk(
  'media/fetchPopularSeries',
  async ({ count, page }: { count: number; page: number }) => {
    const response = await fetchPopularSeries(page);
    const limitedSeries = response.results.slice(0, count);

    const seriesDetailsPromises = limitedSeries.map((serie) =>
      fetchTVDetails(serie.id)
    );
    const seriesDetails = await Promise.all(seriesDetailsPromises);

    return {
      series: limitedSeries.map((serie, index) => ({
        ...serie,
        ...seriesDetails[index]
      })) as SerieTV[],
      totalPages: response.totalPages
    };
  }
);

export const fetchTopRatedSeriesData = createAsyncThunk(
  'media/fetchTopRatedSeries',
  async ({ count, page }: { count: number; page: number }) => {
    const response = await fetchTopRatedSeries(page);
    const limitedSeries = response.results.slice(0, count);

    const seriesDetailsPromises = limitedSeries.map((serie) =>
      fetchTVDetails(serie.id)
    );
    const seriesDetails = await Promise.all(seriesDetailsPromises);

    return {
      series: limitedSeries.map((serie, index) => ({
        ...serie,
        ...seriesDetails[index]
      })) as SerieTV[],
      totalPages: response.totalPages
    };
  }
);

export const fetchOnTheAirSeriesData = createAsyncThunk(
  'media/fetchOnTheAirSeries',
  async ({ count, page }: { count: number; page: number }) => {
    const response = await fetchOnTheAirSeries(page);
    const limitedSeries = response.results.slice(0, count);

    const seriesDetailsPromises = limitedSeries.map((serie) =>
      fetchTVDetails(serie.id)
    );
    const seriesDetails = await Promise.all(seriesDetailsPromises);

    return {
      series: limitedSeries.map((serie, index) => ({
        ...serie,
        ...seriesDetails[index]
      })) as SerieTV[],
      totalPages: response.totalPages
    };
  }
);

export const fetchMovieDetailsData = createAsyncThunk(
  'media/fetchMovieDetails',
  async (id: number) => {
    const details = await fetchMovieDetails(id);
    return { id, details };
  }
);

export const fetchTVDetailsData = createAsyncThunk(
  'media/fetchTVDetails',
  async (id: number) => {
    const details = await fetchTVDetails(id);
    return { id, details };
  }
);

export const fetchGenresData = createAsyncThunk(
  'media/fetchGenres',
  async (mediaType: 'movie' | 'tv') => {
    const genres = await fetchGenres(mediaType);
    return { mediaType, genres };
  }
);

export const fetchMediaByGenreData = createAsyncThunk(
  'media/fetchMediaByGenre',
  async ({
    genreId,
    mediaType,
    page = 1
  }: {
    genreId: number | null;
    mediaType: 'movie' | 'tv';
    page: number;
  }) => {
    const { media, totalPages } = await fetchMediaByGenre(
      mediaType,
      genreId,
      page
    );

    const detailsPromises = media.map((item) => {
      return item.media_type === 'movie'
        ? fetchMovieDetails(item.id)
        : fetchTVDetails(item.id);
    });

    const mediaDetails = await Promise.all(detailsPromises);

    return {
      media: media.map((item, index) => ({ ...item, ...mediaDetails[index] })),
      totalPages
    };
  }
);

export const fetchRecommendedMediaData = createAsyncThunk(
  'media/fetchRecommended',
  async ({ id, mediaType }: { id: number; mediaType: 'movie' | 'tv' }) => {
    const data = await fetchRecommendedMedia(id, mediaType);
    return { id, mediaType, data };
  }
);

export const fetchSeasonsData = createAsyncThunk(
  'media/fetchSeasons',
  async (seriesId: number) => {
    const seasons = await fetchSeasons(seriesId);
    return { seriesId, seasons };
  }
);

export const fetchEpisodesData = createAsyncThunk(
  'media/fetchEpisodes',
  async ({
    seriesId,
    seasonNumber
  }: {
    seriesId: number;
    seasonNumber: number;
  }) => {
    const episodes = await fetchEpisodes(seriesId, seasonNumber);
    return { seriesId, seasonNumber, episodes };
  }
);

const mediaSlice = createSlice({
  name: 'media',
  initialState,
  reducers: {
    setActiveTab: (state, action: PayloadAction<'movies' | 'series'>) => {
      state.activeTab = action.payload;
    },
    initializeTab: (state, action: PayloadAction<'movies' | 'series'>) => {
      state.activeTab = action.payload;
    },
    setCurrentIndex: (state, action: PayloadAction<number>) => {
      state.currentIndex = action.payload;
    },
    setIsImageLoaded: (state, action: PayloadAction<boolean>) => {
      state.isImageLoaded = action.payload;
    },
    resetHeroState: (state) => {
      state.currentIndex = 0;
      state.isImageLoaded = false;
    },
    setTotalPages: (state, action: PayloadAction<number>) => {
      state.totalPages = action.payload;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrendingMediaData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTrendingMediaData.fulfilled, (state, action) => {
        state.trending = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchTrendingMediaData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Error fetching trending media';
      })
      .addCase(fetchNowPlayingMoviesData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchNowPlayingMoviesData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.nowPlayingMovies = action.payload.movies;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchNowPlayingMoviesData.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || 'Error fetching now playing movies';
      })
      .addCase(fetchPopularMoviesData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPopularMoviesData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.popularMovies = action.payload.movies;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchPopularMoviesData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Error fetching popular movies';
      })
      .addCase(fetchTopRatedMoviesData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTopRatedMoviesData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.topRatedMovies = action.payload.movies;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchTopRatedMoviesData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Error fetching top rated movies';
      })
      .addCase(fetchUpcomingMoviesData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUpcomingMoviesData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.upcomingMovies = action.payload.movies;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchUpcomingMoviesData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Error fetching upcoming movies';
      })
      .addCase(fetchAiringTodaySeriesData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchAiringTodaySeriesData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.airingTodaySeries = action.payload.series;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchAiringTodaySeriesData.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || 'Error fetching airing today series';
      })
      .addCase(fetchOnTheAirSeriesData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchOnTheAirSeriesData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.onTheAirSeries = action.payload.series;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchOnTheAirSeriesData.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || 'Error fetching on the air series';
      })
      .addCase(fetchPopularSeriesData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchPopularSeriesData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.popularSeries = action.payload.series;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchPopularSeriesData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Error fetching popular series';
      })
      .addCase(fetchTopRatedSeriesData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTopRatedSeriesData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.topRatedSeries = action.payload.series;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchTopRatedSeriesData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Error fetching top rated series';
      })
      .addCase(fetchMovieDetailsData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchMovieDetailsData.fulfilled, (state, action) => {
        state.isLoading = false;
        const { id, details } = action.payload;
        state.movieDetails[id] = details;
      })
      .addCase(fetchMovieDetailsData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Error fetching movie details';
      })
      .addCase(fetchTVDetailsData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTVDetailsData.fulfilled, (state, action) => {
        state.isLoading = false;
        const { id, details } = action.payload;
        state.serieDetails[id] = details;
      })
      .addCase(fetchTVDetailsData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Error fetching series details';
      })
      .addCase(fetchGenresData.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchGenresData.fulfilled, (state, action) => {
        state.isLoading = false;
        const { mediaType, genres } = action.payload;
        if (mediaType === 'movie') {
          state.movieGenres = genres;
        } else {
          state.tvGenres = genres;
        }
      })
      .addCase(fetchGenresData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Error fetching genres';
      })
      .addCase(fetchMediaByGenreData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchMediaByGenreData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.filteredMedia = action.payload.media;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchMediaByGenreData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Error fetching media by genre';
      })
      .addCase(fetchRecommendedMediaData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchRecommendedMediaData.fulfilled, (state, action) => {
        state.isLoading = false;
        const { id, mediaType, data } = action.payload;
        state.recommended[`${mediaType}-${id}`] = data;
      })
      .addCase(fetchRecommendedMediaData.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          action.error.message || 'Error fetching recommended media';
      })
      .addCase(fetchSeasonsData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchSeasonsData.fulfilled, (state, action) => {
        state.isLoading = false;
        const { seriesId, seasons } = action.payload;
        state.seasons[seriesId] = seasons;
      })
      .addCase(fetchSeasonsData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Error fetching seasons';
      })
      .addCase(fetchEpisodesData.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchEpisodesData.fulfilled, (state, action) => {
        state.isLoading = false;
        const { seriesId, seasonNumber, episodes } = action.payload;
        state.episodes[`${seriesId}-${seasonNumber}`] = episodes;
      })
      .addCase(fetchEpisodesData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message || 'Error fetching episodes';
      });
  }
});

export const {
  setActiveTab,
  initializeTab,
  setCurrentIndex,
  setIsImageLoaded,
  resetHeroState,
  setTotalPages,
  setCurrentPage
} = mediaSlice.actions;

export default mediaSlice.reducer;
