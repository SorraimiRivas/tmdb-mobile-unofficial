/**
 * Simple Movies Type for Movies Array Result from TMDB
 */
export type Movies = {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number | string;
};

export type Movie = {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
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
  mediaType: string;
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
  adult?: boolean;
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
  genreIds?: Array<number>;
  mediaType: string;
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
  mediaType: string;
};

/**
 *
 */
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

/**
 *
 */
export type FormattedSeriesDetails = {
  id: number;
  poster: string | null;
  backdrop: string | null;
  title: string;
  voteAverage: number;
  firstAirDate: string;
  genres: Genre[];
  tagline: string;
  overview: string;
  credits: Credits;
  videos: Videos;
  mediaType: string;
};

/**
 *
 */
export type People = {
  adult: boolean;
  gender: number;
  id: number;
  known_for: KnownFor[];
  known_for_department: string;
  name: string;
  popularity: number;
  profile_path: string;
};

export type PeopleDetails = {
  adult: boolean;
  also_known_as: Array<string>;
  biography: string;
  birthday: string;
  deathday: any;
  gender: number;
  homepage: any;
  id: number;
  known_for_department: string;
  name: string;
  place_of_birth: string;
  popularity: number;
  profile_path: string;
  external_ids: ExternalIds;
  combined_credits: CombinedCredits;
};

export type FormattedPeopleDetails = {
  adult?: boolean;
  alsoKnownAs?: Array<string>;
  biography: string;
  birthday: string;
  deathday: any;
  gender: number;
  homepage?: string;
  id: number;
  knownForDepartment: string;
  name: string;
  placeOfBirth: string;
  popularity?: number;
  profilePath: string;
  externalIds: ExternalIds;
  combinedCredits: CombinedCredits;
};

export type ExternalIds = {
  freebase_mid: string;
  freebase_id: string;
  imdb_id: string;
  tvrage_id: number;
  wikidata_id: string;
  facebook_id: any;
  instagram_id: any;
  tiktok_id: any;
  twitter_id: any;
  youtube_id: any;
};

export type CombinedCredits = {
  cast: CreditsCast[];
  crew: CreditsCrew[];
};

export type CreditsCast = {
  adult?: boolean;
  backdrop_path?: string;
  genre_ids?: Array<number>;
  id: number;
  original_language?: string;
  original_title?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  release_date?: string;
  title?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
  character?: string;
  credit_id?: string;
  order?: number;
  media_type: string;
  origin_country?: Array<string>;
  original_name?: string;
  first_air_date?: string;
  name?: string;
  episode_count?: number;
};

export type CreditsCrew = {
  adult?: boolean;
  backdrop_path?: string;
  genre_ids?: Array<number>;
  id: number;
  original_language?: string;
  original_title?: string;
  overview?: string;
  popularity?: number;
  poster_path?: string;
  release_date?: string;
  title?: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
  credit_id?: string;
  department?: string;
  job?: string;
  media_type: string;
  origin_country?: Array<string>;
  original_name?: string;
  first_air_date?: string;
  name?: string;
  episode_count?: number;
};

export type KnownFor = {
  id: number;
  media_type: string;
  poster_path: string;
  title: string;
  vote_count: number;
};

export type KnownForCardTypes = {
  name?: string | undefined;
  title?: string | undefined;
  id: number;
  poster: string;
  media_type: "tv" | "movie";
  episode_count: number;
  original_title: string;
};

export type FormattedPeople = {
  id: number;
  name: string;
  profilePath: string;
  mediaType: string;
};

/**
 *
 */
export type RequestToken = {
  success: boolean;
  expires_at: string;
  request_token: string;
};

export type Account = {
  avatar: Avatar | null;
  id: number | null;
  iso_639_1?: string;
  iso_3166_1?: string;
  name: string | null;
  include_adult?: boolean;
  username: string | null;
};

export type Avatar = {
  gravatar: TGravatar;
  tmdb: {
    avatar_path: string;
  };
};

export type TGravatar = {
  hash: string;
};

export type SocialMedia = {
  href: string;
  icon: string | React.ReactElement;
};
