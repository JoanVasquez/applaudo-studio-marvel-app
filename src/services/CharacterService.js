import axios from "axios";
import marvelApiConfig from "../configuration/MarvelApiConfig";

export default class CharacterService {
  constructor() {
    this.API_URL = process.env.REACT_APP_PROD_API_URL;
  }

  async getAllCharacters() {
    try {
      const url = `${this.API_URL}/v1/public/characters?orderBy=name&ts=1000&apikey=${marvelApiConfig.PUBLIC_KEY}&hash=${marvelApiConfig.HASH}`;
      const characters = await axios.get(url);
      return characters.data.data.results;
    } catch (ex) {
      throw ex;
    }
  }

  async getCharacterById(characterId) {
    try {
      const url = `${this.API_URL}/v1/public/characters/${characterId}?ts=1000&apikey=${marvelApiConfig.PUBLIC_KEY}&hash=${marvelApiConfig.HASH}`;
      const characters = await axios.get(url);
      return characters.data.data.results;
    } catch (ex) {
      throw ex;
    }
  }

  async getComicsByCharacter(characterId) {
    try {
      const url = `${this.API_URL}/v1/public/characters/${characterId}/comics?orderBy=title&ts=1000&apikey=${marvelApiConfig.PUBLIC_KEY}&hash=${marvelApiConfig.HASH}`;
      const comics = await axios.get(url);
      return comics.data.data.results;
    } catch (ex) {
      throw ex;
    }
  }

  async getStoriesByCharacter(characterId) {
    try {
      const url = `${this.API_URL}/v1/public/characters/${characterId}/stories?orderBy=id&ts=1000&apikey=${marvelApiConfig.PUBLIC_KEY}&hash=${marvelApiConfig.HASH}`;
      const stories = await axios.get(url);
      return stories.data.data.results;
    } catch (ex) {
      throw ex;
    }
  }
}
