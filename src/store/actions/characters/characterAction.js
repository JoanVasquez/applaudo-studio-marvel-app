import {
  GET_CHARACTERS,
  GET_ERRORS,
  GET_COMICS_BY_CHARACTER,
  LOADING_CHARACTERS,
  GET_STORIES_BY_CHARACTER,
  GET_CHARACTER_BY_ID,
} from "./characterActionType";
import CharacterService from "../../../services/CharacterService";
import actionCreator from "../../../util/actionCreator";
import { getLocalStorageWithExpiry } from "../../../util/LocalStorageUtil";
import { CHARACTERS } from "../../../constants/constants";

const characterService = new CharacterService();

export const getCharacters = () => {
  const charactersFromLocalStorage = getLocalStorageWithExpiry(CHARACTERS);
  if (charactersFromLocalStorage) {
    return actionCreator(GET_CHARACTERS, "payload")(charactersFromLocalStorage);
  }
  return (dispatch) => {
    dispatch(actionCreator(LOADING_CHARACTERS, "payload")(true));
    characterService
      .getAllCharacters()
      .then((data) => {
        dispatch(actionCreator(GET_CHARACTERS, "payload")(data));
        dispatch(actionCreator(LOADING_CHARACTERS, "payload")(false));
      })
      .catch((ex) => {
        dispatch(actionCreator(GET_ERRORS, "payload")(ex));
        dispatch(actionCreator(LOADING_CHARACTERS, "payload")(false));
      });
  };
};

export const getCharacterById = (characterId) => {
  return (dispatch) => {
    dispatch(actionCreator(LOADING_CHARACTERS, "payload")(true));
    characterService
      .getCharacterById(characterId)
      .then((data) => {
        dispatch(actionCreator(GET_CHARACTER_BY_ID, "payload")(data));
        dispatch(actionCreator(LOADING_CHARACTERS, "payload")(false));
      })
      .catch((ex) => {
        dispatch(actionCreator(GET_ERRORS, "payload")(ex));
        dispatch(actionCreator(LOADING_CHARACTERS, "payload")(false));
      });
  };
};

export const getComicsByCharacter = (characterId) => {
  return (dispatch) => {
    dispatch(actionCreator(LOADING_CHARACTERS, "payload")(true));
    characterService
      .getComicsByCharacter(characterId)
      .then((data) => {
        dispatch(actionCreator(GET_COMICS_BY_CHARACTER, "payload")(data));
        dispatch(actionCreator(LOADING_CHARACTERS, "payload")(false));
      })
      .catch((ex) => {
        dispatch(actionCreator(GET_ERRORS, "payload")(ex));
        dispatch(actionCreator(LOADING_CHARACTERS, "payload")(false));
      });
  };
};

export const getStoriesByCharacter = (characterId) => {
  return (dispatch) => {
    characterService
      .getStoriesByCharacter(characterId)
      .then((data) => {
        dispatch(actionCreator(GET_STORIES_BY_CHARACTER, "payload")(data));
        dispatch(actionCreator(LOADING_CHARACTERS, "payload")(false));
      })
      .catch((ex) => {
        dispatch(actionCreator(GET_ERRORS, "payload")(ex));
        dispatch(actionCreator(LOADING_CHARACTERS, "payload")(false));
      });
  };
};
