import axios from "axios";
const API_KEY = "1f329821df085bdfe67fce7f8779e644";
export const getPopular = async () => {
  const temp = await axios
    .get(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&watch_region=KR&language=ko&page=1`
    )
    .then((res) => {
      return res.data.results;
    })
    .catch((err) => console.log(err));
  return temp;
};

export const getNow = async () => {
  const temp = await axios
    .get(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&watch_region=KR&language=ko&page=1`
    )
    .then((res) => {
      return res.data.results;
    })
    .catch((err) => console.log(err));
  return temp;
};
export const getTop = async () => {
  const temp = await axios
    .get(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&watch_region=KR&language=ko&page=1`
    )
    .then((res) => {
      return res.data.results;
    })
    .catch((err) => console.log(err));
  return temp;
};
export const getUpcoming = async () => {
  const temp = await axios
    .get(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&watch_region=KR&language=ko&page=1`
    )
    .then((res) => {
      return res.data.results;
    })
    .catch((err) => console.log(err));
  return temp;
};
export const getDetail = async (id) => {
  const temp = await axios
    .get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&watch_region=KR&language=ko`
    )
    .then((res) => {
      return res.data;
    })
    .catch((err) => console.log(err));
  return temp;
};
