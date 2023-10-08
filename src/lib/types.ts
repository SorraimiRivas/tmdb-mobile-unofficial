export type TMovies = {
  adult: boolean;
  backdrop_path: string;
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
};

export type TMovie = {
  adult?: boolean;
  backdrop_path?: string;
  budget?: number;
  genres?: string[];
  homepage?: string;
  id: number;
  imdb_id?: string;
  original_language?: string;
  original_title?: string;
  overview: string;
  popularity: number;
  poster_path?: string;
  releaseDate: string;
  revenue?: number;
  runtime?: number;
  status?: string;
  tagline?: string;
  title: string;
  video?: boolean;
  rating: number;
  vote_count?: number;
};

export type TSeries = {
  adult: boolean;
  backdrop_path: string;
  id: number;
  name: string;
  original_language: string;
  original_name: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  first_air_date: string;
  vote_average: number;
  vote_count: number;
  origin_country: string[];
};
