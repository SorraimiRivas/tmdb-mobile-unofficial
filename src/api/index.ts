const TOKEN = process.env.EXPO_PUBLIC_ACCESS_TOKEN;
const baseURL = "https://api.themoviedb.org/3/";

export const imageURL = "https://image.tmdb.org/t/p/";

/**
 * backdrop sizes
 */
export const backdrop = {
  sm: "w300",
  md: "w780",
  lg: "w1280",
};

/**
 * poster sizes
 */
export const poster = {
  sm: "w92",
  md: "w154",
  lg: "w185",
  xl: "w342",
  "2xl": "w500",
};

/**
 * api options
 */
export const getRequestOptions = {
  method: "GET",
  baseURL,
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + TOKEN,
  },
};
