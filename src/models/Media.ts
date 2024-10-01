export interface MediaItem {
  id: number;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  vote_average: number;
  media_type: 'movie' | 'tv';
  genres: {
    id: number;
    name: string;
  }[];
}

export interface Movie extends MediaItem {
  title: string;
  release_date: string;
  runtime: number;
  media_type: 'movie';
}

export interface SerieTV extends MediaItem {
  name: string;
  first_air_date: string;
  number_of_seasons: number;
  last_episode_to_air: {
    episode_number: number;
    season_number: number;
  };
  media_type: 'tv';
}

export type Media = Movie | SerieTV;
