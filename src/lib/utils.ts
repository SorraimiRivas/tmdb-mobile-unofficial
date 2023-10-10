import { imageURL } from "../api";
import { IMovies, ISeries, TMovies, TSeries } from "./types";

/**
 * takes in an array of type TMovies and returns a formatted array of type IMovies
 * @param data
 * @returns
 */
export const formattedMovies = (data: TMovies[]): IMovies[] => {
  return data.map((movie) => {
    const {
      id,
      title,
      vote_average: rating,
      release_date: releaseDate,
      poster_path: poster,
    } = movie;

    const formattedMovie: IMovies = {
      id,
      title,
      rating,
      releaseDate,
      poster,
    };

    return formattedMovie;
  });
};

/**
 * takes in an array of type TSeries and returns a formatted array of type ISeries
 * @param data
 * @returns
 */
export const formattedSeries = (data: TSeries[]): ISeries[] => {
  return data.map((series) => {
    const {
      id,
      name: title,
      poster_path: poster,
      vote_average: rating,
      first_air_date: releaseDate,
    } = series;

    const formatted: ISeries = {
      id,
      title,
      rating,
      releaseDate,
      poster,
    };

    return formatted;
  });
};

/**
 * takes a url and a size to return the whole image url
 * @param url /wwemzKWzjKYJFfCeiB57q3r4Bcm.png
 * @param size posterSize.xl
 * @returns https://image.tmdb.org/t/p/w500/wwemzKWzjKYJFfCeiB57q3r4Bcm.png
 * @example imageParser(poster, posterSize.xl)
 */
export const imageParser = (url: string = "", size: string = "w342") => {
  return `${imageURL}${size}${url}`;
};

/**
 * Takes in a string date and returns a formatted string date (8-20-2-23 => Aug 20, 2023)
 * @param string 8-20-2023
 * @returns string Aug 20, 2023
 */
export const formatDate = (date: string) => {
  const options: {} = { year: "numeric", month: "short", day: "numeric" };
  const [year, month, day] = date.split("-").map(Number);
  const formattedDate = new Date(year, month - 1, day).toLocaleDateString(
    "en-US",
    options
  );
  return formattedDate;
};
