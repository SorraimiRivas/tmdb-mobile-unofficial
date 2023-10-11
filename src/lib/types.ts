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
export interface IMovies {
  id: number;
  title: string;
  poster: string;
  releaseDate: string;
  rating?: number;
}

export type TMovie = {
  adult?: boolean;
  backdrop_path?: string;
  budget?: number;
  genres?: Genre[];
  homepage?: string;
  id: number;
  imdb_id?: string;
  original_language?: string;
  original_title?: string;
  overview: string;
  popularity: number;
  poster_path?: string;
  release_date: string;
  revenue?: number;
  runtime?: number;
  status?: string;
  tagline?: string;
  title: string;
  video?: boolean;
  vote_average: number;
  vote_count?: number;
  videos: Video;
};
export interface ISeries {
  id: number | undefined;
  title: string | undefined;
  poster: string | undefined;
  releaseDate: string | undefined;
  rating: number | undefined;
}

export type TSeries = {
  adult?: boolean;
  backdrop_path?: string;
  id?: number;
  name?: string;
  original_language?: string;
  original_name?: string;
  overview?: string;
  poster_path?: string;
  media_type?: string;
  genre_ids?: number[];
  popularity?: number;
  first_air_date?: string;
  vote_average?: number;
  vote_count?: number;
  origin_country?: string[];
};

export type Genre = {
  id: number;
  name: string;
};

export type Video = {
  results: {
    iso_639_1: string;
    iso_3166_1: string;
    name: string;
    key: string;
    site: string;
    size: number;
    type: string;
    official: boolean;
    published_at: string;
    id: string;
  }[];
};
