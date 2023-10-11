import { imageURL } from "../api";
import { Genre, IMovies, ISeries, TMovies, TSeries, Video } from "./types";

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
    return "n/a";
  }
  const options: {} = { year: "numeric", month: "short", day: "numeric" };
  const [year, month, day] = date.split("-").map(Number);
  const formattedDate = new Date(year, month - 1, day).toLocaleDateString(
    "en-US",
    options
  );
  return formattedDate;
};

/**
 *
 * @param minutes 82
 * @returns 1h 22m
 *
 * @example formatMinutesToHoursAndMinutes(82) = '1h 22m'
 */
export const formatMinutesToHoursAndMinutes = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;

  const hourString = hours > 0 ? `${hours}h ` : "";
  const minuteString = remainingMinutes > 0 ? `${remainingMinutes}m` : "";

  return `${hourString}${minuteString}`;
};

/**
 *
 * @param genres
 * @returns
 */
export const joinGenres = (genres: Genre[]) => {
  if (!genres) {
    return "n/a";
  }
  const names = genres.map((genre) => genre.name).join(", ");
  return names;
};

/**
 *
 * @param number 7.725
 * @returns 77
 */
export const convertToWholeNumber = (number: number) => {
  if (!number) {
    return 0;
  }

  return Math.round((number / 10) * 100);
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

// export const getVideoURL = (data: Video["results"]) => {
//   if (!data) {
//     return "";
//   }

//   const officialTrailer = data.find(
//     (obj) =>
//       obj.name === "Official Trailer" ||
//       obj.name === "Official Trailer 2" ||
//       obj.type === "Trailer"
//   );

//   return officialTrailer
//     ? `s://www.youtube/watch?v=${officialTrailer.key}`
//     : "";
// };

export function filterOfficialTrailer(arr: any) {
  // console.log(JSON.stringify(arr, "", 2));

  if (!arr || arr.length === 0) {
    return null;
  }

  const officialTrailer = arr.find(
    (item: any) => item.name === "Official Trailer"
  );
  return officialTrailer ? officialTrailer.key : "";
}
