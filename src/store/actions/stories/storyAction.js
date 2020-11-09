import {
  GET_STORIES,
  GET_ERRORS,
  LOADING_STORIES,
  GET_STORY_BY_ID,
  GET_COMICS_BY_STORY,
  GET_CHARACTERS_BY_STORY,
} from "./storyActionType";
import StoryService from "../../../services/StoryService";
import actionCreator from "../../../util/actionCreator";
import { getLocalStorageWithExpiry } from "../../../util/LocalStorageUtil";
import { STORIES } from "../../../constants/constants";

const storyService = new StoryService();

export const getStories = () => {
  const storiesFromeLocalStorage = getLocalStorageWithExpiry(STORIES);
  if (storiesFromeLocalStorage) {
    return actionCreator(GET_STORIES, "payload")(storiesFromeLocalStorage);
  }
  return (dispatch) => {
    dispatch(actionCreator(LOADING_STORIES, "payload")(true));
    storyService
      .getAllStories()
      .then((data) => {
        dispatch(actionCreator(GET_STORIES, "payload")(data));
        dispatch(actionCreator(LOADING_STORIES, "payload")(false));
      })
      .catch((ex) => {
        dispatch(actionCreator(GET_ERRORS, "payload")(ex));
        dispatch(actionCreator(LOADING_STORIES, "payload")(false));
      });
  };
};

export const getStoryById = (storyId) => {
  return (dispatch) => {
    dispatch(actionCreator(LOADING_STORIES, "payload")(true));
    storyService
      .getStoryById(storyId)
      .then((data) => {
        dispatch(actionCreator(GET_STORY_BY_ID, "payload")(data));
        dispatch(actionCreator(LOADING_STORIES, "payload")(false));
      })
      .catch((ex) => {
        dispatch(actionCreator(GET_ERRORS, "payload")(ex));
        dispatch(actionCreator(LOADING_STORIES, "payload")(false));
      });
  };
};

export const getCharactersByStory = (storyId) => {
  return (dispatch) => {
    dispatch(actionCreator(LOADING_STORIES, "payload")(true));
    storyService
      .getCharactersByStory(storyId)
      .then((data) => {
        dispatch(actionCreator(GET_CHARACTERS_BY_STORY, "payload")(data));
        dispatch(actionCreator(LOADING_STORIES, "payload")(false));
      })
      .catch((ex) => {
        dispatch(actionCreator(GET_ERRORS, "payload")(ex));
        dispatch(actionCreator(LOADING_STORIES, "payload")(false));
      });
  };
};

export const getComicsByStory = (storyId) => {
  return (dispatch) => {
    dispatch(actionCreator(LOADING_STORIES, "payload")(true));
    storyService
      .getComicsByStory(storyId)
      .then((data) => {
        dispatch(actionCreator(GET_COMICS_BY_STORY, "payload")(data));
        dispatch(actionCreator(LOADING_STORIES, "payload")(false));
      })
      .catch((ex) => {
        dispatch(actionCreator(GET_ERRORS, "payload")(ex));
        dispatch(actionCreator(LOADING_STORIES, "payload")(false));
      });
  };
};
