import { imageURL } from "../api";
import { TMovies } from "./types";

export const formattedMovies = (data: TMovies[]) => {
  return data.map((movie) => {
    return {
      id: movie.id,
      title: movie.title,
      overview: movie.overview,
      rating: movie.vote_average,
      popularity: movie.popularity,
      releaseDate: movie.release_date,
    };
  });
};

export const imageParser = (url: string, size: string) => {
  return `${imageURL}${size}${url}`;
};
