const TOKEN = process.env.EXPO_PUBLIC_ACCESS_TOKEN;
const baseURL = "https://api.themoviedb.org/3/";

export const imageURL = "https://image.tmdb.org/t/p/";

/**
 * backdrop sizes
 * @value sm w300
 * @value md w780
 * @value lg w1280
 */
export const backdropSize = {
  sm: "w300",
  md: "w780",
  lg: "w1280",
};

/**
 * poster sizes
 * @value sm: "w92"
 * @value md: "w154"
 * @value lg: "w185"
 * @value xl: "w342"
 * @value xxl: "w500"
 */
export const posterSize = {
  sm: "w92",
  md: "w154",
  lg: "w185",
  xl: "w342",
  xxl: "w500",
};

/**
 * @value sm: "w45"
 * @value md: "w185"
 * @value lg: "h632"
 * @value original: "original"
 */
export const profileSize = {
  sm: "w45",
  md: "w185",
  lg: "h632",
  original: "original",
};

/**
 * api get options
 */
export const getRequestOptions = {
  method: "GET",
  baseURL,
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + TOKEN,
  },
};

/**
 * api post options
 */
export const postRequestOptions = {
  method: "POST",
  baseURL,
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + TOKEN,
    "Content-Type": "application/json;charset=utf-8",

  },
};
