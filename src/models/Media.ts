export interface Genre {
  id: number;
  name: string;
}

export interface VideoDetails {
  id: string;
  key: string;
  name: string;
  site: string;
  type: string;
}

export interface CastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
}

export interface CrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
}

export interface Credits {
  cast: CastMember[];
  crew: CrewMember[];
}

export interface ProductionCompany {
  id: number;
  name: string;
  logo_path: string | null;
  origin_country: string;
}

export interface MediaItem {
  id: number;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  vote_average: number;
  media_type: 'movie' | 'tv';
  genre_ids: number[];
  genres: Genre[];
  videoUrl: string;
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
  number_of_episodes: number;
  last_episode_to_air: {
    episode_number: number;
    season_number: number;
  };
  media_type: 'tv';
}

export interface Season {
  id: number;
  name: string;
  season_number: number;
  episode_count: number;
  air_date: string;
  overview: string;
  poster_path: string;
}

export interface Episode {
  id: number;
  name: string;
  overview: string;
  episode_number: number;
  season_number: number;
  air_date: string;
  still_path: string;
  vote_average: number;
  videoUrl: string;
}

export type Media = Movie | SerieTV;

export interface MediaDetails extends MediaItem {
  tagline: string;
  status: string;
  production_companies: ProductionCompany[];
  videos: {
    results: VideoDetails[];
  };
  credits: Credits;
}

export interface MovieDetails extends MediaDetails {
  title: string;
  release_date: string;
  runtime: number;
  media_type: 'movie';
}

export interface SeriesTVDetails extends MediaDetails {
  name: string;
  first_air_date: string;
  number_of_seasons: number;
  number_of_episodes: number;
  last_episode_to_air: {
    episode_number: number;
    season_number: number;
  };
  media_type: 'tv';
  created_by: {
    id: number;
    name: string;
    profile_path: string | null;
  }[];
  seasons: Season[];
}
