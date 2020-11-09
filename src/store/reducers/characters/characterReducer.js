import reducerCreator from "../../../util/reducerCreator";
import {
  GET_CHARACTERS,
  GET_CHARACTER_BY_ID,
  GET_COMICS_BY_CHARACTER,
  GET_ERRORS,
  GET_STORIES_BY_CHARACTER,
  LOADING_CHARACTERS,
} from "../../actions/characters/characterActionType";
import {
  getLocalStorageWithExpiry,
  setLocalStorageWithExpiry,
} from "../../../util/LocalStorageUtil";
import {
  SIX_HOURS_TO_MILLI_SECONDS,
  CHARACTERS,
} from "../../../constants/constants";

const initialState = {
  isLoading: false,
  characters: [],
  character: null,
  comicsByCharacter: [],
  storiesByCharacter: [],
  error: "",
};

const characterReducer = {
  [GET_CHARACTERS]: (state, action) => {
    const characters = getLocalStorageWithExpiry(CHARACTERS);
    if (!characters) {
      setLocalStorageWithExpiry(
        CHARACTERS,
        action.payload,
        SIX_HOURS_TO_MILLI_SECONDS
      );
    }
    return {
      ...state,
      characters: action.payload,
    };
  },
  [GET_CHARACTER_BY_ID]: (state, action) => {
    return {
      ...state,
      character: action.payload,
    };
  },
  [GET_COMICS_BY_CHARACTER]: (state, action) => {
    return {
      ...state,
      comicsByCharacter: action.payload,
    };
  },
  [GET_STORIES_BY_CHARACTER]: (state, action) => {
    return {
      ...state,
      storiesByCharacter: action.payload,
    };
  },
  [LOADING_CHARACTERS]: (state, action) => {
    return {
      ...state,
      isLoading: action.payload,
    };
  },
  [GET_ERRORS]: (state, action) => {
    console.log(action.payload);
    return {
      ...state,
      error: "Something went wrong with the server!",
    };
  },
};

export default reducerCreator(initialState, characterReducer);
