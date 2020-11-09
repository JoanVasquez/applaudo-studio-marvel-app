import {
  GET_COMICS,
  GET_COMIC_BY_ID,
  GET_ERRORS,
  LOADING_COMICS,
  GET_CHARACTERS_BY_COMIC,
  GET_STORIES_BY_COMIC,
} from "./comicActionType";
import ComicService from "../../../services/ComicService";
import actionCreator from "../../../util/actionCreator";
import { getLocalStorageWithExpiry } from "../../../util/LocalStorageUtil";
import { COMICS } from "../../../constants/constants";

const comicService = new ComicService();

export const getComics = () => {
  const comicsFromLocalStorage = getLocalStorageWithExpiry(COMICS);
  if (comicsFromLocalStorage) {
    return actionCreator(GET_COMICS, "payload")(comicsFromLocalStorage);
  }
  return (dispatch) => {
    dispatch(actionCreator(LOADING_COMICS, "payload")(true));
    comicService
      .getAllComics()
      .then((data) => {
        dispatch(actionCreator(GET_COMICS, "payload")(data));
        dispatch(actionCreator(LOADING_COMICS, "payload")(false));
      })
      .catch((ex) => {
        dispatch(actionCreator(GET_ERRORS, "payload")(ex));
        dispatch(actionCreator(LOADING_COMICS, "payload")(false));
      });
  };
};

export const getComicById = (comicId) => {
  return (dispatch) => {
    dispatch(actionCreator(LOADING_COMICS, "payload")(true));
    comicService
      .getComicById(comicId)
      .then((data) => {
        dispatch(actionCreator(GET_COMIC_BY_ID, "payload")(data));
        dispatch(actionCreator(LOADING_COMICS, "payload")(false));
      })
      .catch((ex) => {
        dispatch(actionCreator(GET_ERRORS, "payload")(ex));
        dispatch(actionCreator(LOADING_COMICS, "payload")(false));
      });
  };
};

export const getCharactersByComic = (comicId) => {
  return (dispatch) => {
    dispatch(actionCreator(LOADING_COMICS, "payload")(true));
    comicService
      .getCharactersByComic(comicId)
      .then((data) => {
        dispatch(actionCreator(GET_CHARACTERS_BY_COMIC, "payload")(data));
        dispatch(actionCreator(LOADING_COMICS, "payload")(false));
      })
      .catch((ex) => {
        dispatch(actionCreator(GET_ERRORS, "payload")(ex));
        dispatch(actionCreator(LOADING_COMICS, "payload")(false));
      });
  };
};

export const getStoriesByComic = (comicId) => {
  return (dispatch) => {
    dispatch(actionCreator(LOADING_COMICS, "payload")(true));
    comicService
      .getCharactersByComic(comicId)
      .then((data) => {
        dispatch(actionCreator(GET_STORIES_BY_COMIC, "payload")(data));
        dispatch(actionCreator(LOADING_COMICS, "payload")(false));
      })
      .catch((ex) => {
        dispatch(actionCreator(GET_ERRORS, "payload")(ex));
        dispatch(actionCreator(LOADING_COMICS, "payload")(false));
      });
  };
};
