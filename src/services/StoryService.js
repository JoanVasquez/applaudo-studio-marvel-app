import axios from "axios";

import marvelApiConfig from "../configuration/MarvelApiConfig";

export default class StoryService {
  constructor() {
    this.API_URL = process.env.REACT_APP_PROD_API_URL;
  }

  async getAllStories() {
    try {
      const url = `${this.API_URL}/v1/public/stories?orderBy=id&ts=1000&apikey=${marvelApiConfig.PUBLIC_KEY}&hash=${marvelApiConfig.HASH}`;
      const stories = await axios.get(url);
      return stories.data.data.results;
    } catch (ex) {
      throw ex;
    }
  }

  async getStoryById(storyId) {
    try {
      const url = `${this.API_URL}/v1/public/stories/${storyId}?ts=1000&apikey=${marvelApiConfig.PUBLIC_KEY}&hash=${marvelApiConfig.HASH}`;
      const stories = await axios.get(url);
      return stories.data.data.results;
    } catch (ex) {
      throw ex;
    }
  }

  async getCharactersByStory(storyId) {
    try {
      const url = `${this.API_URL}/v1/public/stories/${storyId}/characters?orderBy=name&ts=1000&apikey=${marvelApiConfig.PUBLIC_KEY}&hash=${marvelApiConfig.HASH}`;
      const stories = await axios.get(url);
      return stories.data.data.results;
    } catch (ex) {
      throw ex;
    }
  }

  async getComicsByStory(storyId) {
    try {
      const url = `${this.API_URL}/v1/public/stories/${storyId}/comics?orderBy=title&ts=1000&apikey=${marvelApiConfig.PUBLIC_KEY}&hash=${marvelApiConfig.HASH}`;
      const stories = await axios.get(url);
      return stories.data.data.results;
    } catch (ex) {
      throw ex;
    }
  }
}
