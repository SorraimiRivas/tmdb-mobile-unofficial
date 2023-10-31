import { imageURL } from "../api";
import {
  FormattedMovieDetails,
  FormattedMovies,
  FormattedPeople,
  FormattedSeries,
  FormattedSeriesDetails,
  Genre,
  MovieDetails,
  People,
  SeriesDetails,
  Movies,
  TSeries,
  TrailerVideos,
  PeopleDetails,
  FormattedPeopleDetails,
  CombinedCredits,
  KnownForCardTypes,
  CreditsCast,
  CreditsCrew,
} from "./types";

/**
 * takes in an array of TMovies and returns a formatted array of FormattedMovies
 * @param data
 * @returns
 */
export const formattedMoviesArray = (data: Movies[]): FormattedMovies[] => {
  if (!data) {
    const obj = [
      {
        id: 0,
        title: "",
        voteAverage: 0,
        releaseDate: "",
        poster: "",
        mediaType: "",
      },
    ];

    return obj;
  }

  return data.map((movie) => {
    const {
      id,
      title,
      vote_average: voteAverage,
      release_date: releaseDate,
      poster_path: poster,
    } = movie;

    const formattedMovie: FormattedMovies = {
      id,
      title,
      voteAverage,
      releaseDate,
      poster,
      mediaType: "movie",
    };

    return formattedMovie;
  });
};

/**
 *
 * @param data
 * @returns
 */
export const formatMovie = (data: MovieDetails): FormattedMovieDetails => {
  const {
    id,
    title,
    poster_path: poster,
    backdrop_path: backdrop,
    vote_average: voteAverage,
    release_date: releaseDate,
    runtime,
    genres,
    tagline,
    overview,
    credits,
    videos,
  } = data;

  const formatted: FormattedMovieDetails = {
    id,
    title,
    poster,
    backdrop,
    voteAverage,
    releaseDate,
    runtime,
    genres,
    tagline,
    overview,
    credits,
    videos,
    mediaType: "movie",
  };
  return formatted;
};

/**
 * Takes in an array of type TSeries and returns a formatted array of type ISeries
 * @param data
 * @returns
 */
export const formatSeriesArray = (data: TSeries[]): FormattedSeries[] => {
  return data.map((series) => {
    const {
      id,
      name: title,
      poster_path: poster,
      vote_average: voteAverage,
      first_air_date: firstAirDate,
    } = series;

    const formatted: FormattedSeries = {
      id,
      title,
      voteAverage,
      firstAirDate,
      poster,
      mediaType: "tv",
    };
    return formatted;
  });
};

/**
 *
 * @param series
 * @returns
 */
export const formatSeries = (data: SeriesDetails): FormattedSeriesDetails => {
  const {
    id,
    name: title,
    poster_path: poster,
    backdrop_path: backdrop,
    vote_average: voteAverage,
    first_air_date: firstAirDate,
    genres,
    tagline,
    overview,
    credits,
    videos,
  } = data;

  const formatted = {
    id,
    title,
    poster,
    backdrop,
    voteAverage,
    firstAirDate,
    genres,
    tagline,
    overview,
    credits,
    videos,
    mediaType: "tv",
  };

  return formatted;
};

/**
 *
 * @param data
 * @returns
 */
export const formatPeople = (data: People[]) => {
  return data.map((person) => {
    const { id, name, profile_path } = person;

    const formatted: FormattedPeople = {
      id,
      name,
      profilePath: profile_path,
      mediaType: "person",
    };

    return formatted;
  });
};

/**
 * Takes an array of PeopleDetails and returns the same array formatted to camelCase
 * @param data
 * @returns
 */
export const formatPeopleDetails = (data: PeopleDetails) => {
  const {
    name,
    also_known_as: alsoKnownAs,
    biography,
    birthday,
    deathday,
    gender,
    homepage,
    id,
    known_for_department: knownForDepartment,
    place_of_birth: placeOfBirth,
    profile_path: profilePath,
    popularity,
    adult,
    external_ids: externalIds,
    combined_credits: combinedCredits,
  } = data;

  const formatted = {
    id,
    name,
    alsoKnownAs,
    biography,
    birthday,
    deathday,
    gender,
    homepage,
    knownForDepartment,
    placeOfBirth,
    profilePath,
    popularity,
    adult,
    externalIds,
    combinedCredits,
  };

  return formatted as FormattedPeopleDetails;
};

/**
 * takes a url and a size to return the whole image url
 * @param url /wwemzKWzjKYJFfCeiB57q3r4Bcm.png
 * @param size posterSize.xl
 * @returns https://image.tmdb.org/t/p/w500/wwemzKWzjKYJFfCeiB57q3r4Bcm.png
 * @example imageParser(poster, posterSize.xl)
 */
export const imageParser = (url: string = "", size: string = "w342") => {
  if (!url) {
    return "";
  }
  const wholeURL = `${imageURL}${size}${url}`;
  return wholeURL.toString();
};

/**
 * Takes in a string date and returns a formatted string date (8-20-2-23 => Aug 20, 2023)
 * @param string 8-20-2023
 * @returns string Aug 20, 2023
 */
export const formatDate = (date: string) => {
  if (!date) {
    return "";
  }
  const options: {} = { year: "numeric", month: "short", day: "numeric" };
  const [year, month, day] = date.split("-").map(Number);
  const formattedDate = new Date(year, month - 1, day).toLocaleDateString(
    "en-US",
    options,
  );
  return formattedDate;
};

/**
 *
 * @param minutes 82
 * @returns 1h 22m
 *
 * @example runtimeFormatter(82) = '1h 22m'
 */
export const runtimeFormatter = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  const hourString = hours > 0 ? `${hours}h ` : "";
  const minuteString = remainingMinutes > 0 ? `${remainingMinutes}m` : "";

  if (!hourString || !minuteString) {
    return "";
  }

  return `${hourString}${minuteString}`;
};

/**
 *
 * @param genres
 * @returns
 */
export const joinGenres = (genres: Genre[]) => {
  if (!genres) {
    return "";
  }
  const names = genres.map((genre) => genre.name).join(", ");
  return names;
};

/**
 *
 * @param number 7.725
 * @returns 77
 */
export const convertToWholeNumber = (number: number): number => {
  return Math.round(number * 10) || 0;
};

/**
 *
 * @param rating 77
 * @returns "#21D07A"
 */
export const getColorByRating = (rating: number) => {
  switch (true) {
    case rating >= 40 && rating <= 69:
      return "#D2D532";
      break;
    case rating >= 70:
      return "#21D07A";
      break;
    default:
      return "#DB2360";
  }
};

/**
 *
 * @param arr
 * @returns
 */
export const trailersArrayFilter = (arr: TrailerVideos[]) => {
  const filteredArray = (arr || []).filter((item) => item.type === "Trailer");

  if (filteredArray.length === 0) {
    filteredArray.push({
      iso_639_1: "",
      iso_3166_1: "",
      name: "No Trailers",
      key: "",
      site: "",
      size: 0,
      type: "Trailer",
      official: false,
      published_at: "",
      id: "",
    });
  }

  return filteredArray;
};

/**
 * takes in a celeb name and returns the initials to be use as fallback for when there is not profile picture available
 * @param name Tom Hanks
 * @returns TH
 */
export const getInitials = (name: string) => {
  const words = name.split(" ").filter((word) => word.trim() !== "");
  const initials = words
    .map((word) => {
      if (word.startsWith('"') && word.endsWith('"')) {
        return word[1].toUpperCase();
      } else {
        return word[0].toUpperCase();
      }
    })
    .join("");

  return initials || "";
};

/**
 *
 * @param gender
 * @returns
 */
export const genderSelector = (gender: number) => {
  switch (gender) {
    case 1:
      return "Female";
      break;
    case 2:
      return "Male";
      break;
    case 3:
      return "Non-binary";
      break;
    default:
      return "-";
  }
};

export const knownForConstructor = (
  data: CombinedCredits,
  department: string,
) => {
  if (department === "Acting" && data.cast) {
    const sort = data.cast.sort((a, b) => b.vote_count! - a.vote_count!);
    const result = formatCreditsCast(sort);
    return result;
  } else if (department !== "Acting" && data.crew) {
    const sort = data.crew.sort((a, b) => b.vote_average! - a.vote_average!);
    const result = formatCreditsCrew(sort);

    return result;
  } else {
    return [];
  }
};

const formatCreditsCast = (data: CreditsCast[]) => {
  return data.map((item) => {
    const {
      title,
      original_title,
      name,
      poster_path: poster,
      id,
      media_type,
      episode_count,
    } = item;

    const formatted = {
      title,
      name,
      poster,
      id,
      media_type,
      episode_count,
      original_title,
    };
    return formatted as KnownForCardTypes;
  });
};
const formatCreditsCrew = (data: CreditsCrew[]) => {
  return data.map((item) => {
    const { title, name, poster_path: poster, id, media_type } = item;

    const formatted = {
      title,
      name,
      poster,
      id,
      media_type,
    };
    return formatted as KnownForCardTypes;
  });
};
