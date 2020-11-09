import axios from "axios";

import marvelApiConfig from "../configuration/MarvelApiConfig";

export default class ComicService {
  constructor() {
    this.API_URL = process.env.REACT_APP_PROD_API_URL;
  }

  async getAllComics() {
    try {
      const url = `${this.API_URL}/v1/public/comics?orderBy=issueNumber&ts=1000&apikey=${marvelApiConfig.PUBLIC_KEY}&hash=${marvelApiConfig.HASH}`;
      const comics = await axios.get(url);
      return comics.data.data.results;
    } catch (ex) {
      throw ex;
    }
  }

  async getComicById(comicId) {
    try {
      const url = `${this.API_URL}/v1/public/comics/${comicId}?ts=1000&apikey=${marvelApiConfig.PUBLIC_KEY}&hash=${marvelApiConfig.HASH}`;
      const comics = await axios.get(url);
      return comics.data.data.results;
    } catch (ex) {
      throw ex;
    }
  }

  async getCharactersByComic(comicId) {
    try {
      const url = `${this.API_URL}/v1/public/comics/${comicId}/characters?orderBy=name&ts=1000&apikey=${marvelApiConfig.PUBLIC_KEY}&hash=${marvelApiConfig.HASH}`;
      const characters = await axios.get(url);
      return characters.data.data.results;
    } catch (ex) {
      throw ex;
    }
  }

  async getStoriesByComic(comicId) {
    try {
      const url = `${this.API_URL}/v1/public/comics/${comicId}/stories?ts=1000&apikey=${marvelApiConfig.PUBLIC_KEY}&hash=${marvelApiConfig.HASH}`;
      const stories = await axios.get(url);
      return stories.data.data.results;
    } catch (ex) {
      throw ex;
    }
  }
}
