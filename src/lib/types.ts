/**
 * Simple Movies Type for Movies Array Result from TMDB
 */
export type TMovies = {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number | string;
};

/**
 * Simple Movies Type for formatted Movies Array to be used as a middleware interface between App and API
 */
export type FormattedMovies = {
  id: number;
  title: string;
  poster: string;
  releaseDate: string;
  voteAverage: number | string;
};

/**
 *
 */
export type MovieDetails = {
  id: number;
  poster_path: string;
  backdrop_path: string;
  title: string;
  vote_average: number;
  release_date: string;
  runtime: number;
  genres: Genre[];
  tagline: string;
  overview: string;
  credits: Credits;
  videos: Videos;
};

/**
 *
 */
export type FormattedMovieDetails = {
  id: number;
  poster: string;
  backdrop: string;
  title: string;
  voteAverage: number;
  releaseDate: string;
  runtime: number;
  genres: Genre[];
  tagline: string;
  overview: string;
  credits: Credits;
  videos: Videos;
};

/**
 *
 */
export type Genre = {
  id: number;
  name: string;
};

/**
 *
 */
export type Credits = {
  cast: Cast[];
  crew: Crew[];
};

/**
 *
 */
export type Videos = {
  results: TrailerVideos[];
};

/**
 *
 */
export type TrailerVideos = {
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
};

/**
 *
 */
export type Cast = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path?: string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
};

/**
 *
 */
export type Crew = {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path?: string;
  credit_id: string;
  department: string;
  job: string;
};

/**
 * Simple Series Type for Series Array Result From TMDB
 */
export type TSeries = {
  id: number;
  name: string;
  poster_path: string;
  first_air_date: string;
  vote_average: string;
};

/**
 * Simple Movies Type for formatted Movies Array to be used as a middleware interface between App and API
 */
export type FormattedSeries = {
  id: number;
  title: string;
  poster: string;
  firstAirDate: string;
  voteAverage: number | string;
};

export type SeriesDetails = {
  id: number;
  poster_path: string;
  backdrop_path: string;
  name: string;
  vote_average: number;
  first_air_date: string;
  genres: Genre[];
  tagline: string;
  overview: string;
  credits: Credits;
  videos: Videos;
};

export type FormattedSeriesDetails = {
  id: number;
  poster: string;
  backdrop: string;
  title: string;
  voteAverage: number;
  firstAirDate: string;
  genres: Genre[];
  tagline: string;
  overview: string;
  credits: Credits;
  videos: Videos;
};
