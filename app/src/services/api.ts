import axios from "axios";

export const api = axios.create({
  baseURL: `https://aerodatabox.p.rapidapi.com/`,
  headers: {
    'X-RapidAPI-Key': '5a4f29f7c5mshf05a11c02c835b8p1c47a3jsnc8898d976ea1',
  }
});
