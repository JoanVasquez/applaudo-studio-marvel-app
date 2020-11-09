import reducerCreator from "../../../util/reducerCreator";
import {
  GET_COMICS,
  GET_ERRORS,
  GET_COMIC_BY_ID,
  LOADING_COMICS,
  GET_CHARACTERS_BY_COMIC,
  GET_STORIES_BY_COMIC,
} from "../../actions/comics/comicActionType";
import {
  getLocalStorageWithExpiry,
  setLocalStorageWithExpiry,
} from "../../../util/LocalStorageUtil";
import {
  SIX_HOURS_TO_MILLI_SECONDS,
  COMICS,
} from "../../../constants/constants";

const initialState = {
  isLoading: false,
  comics: [],
  charactersByComic: [],
  storiesByComic: [],
  comic: null,
  error: "",
};

const comicReducer = {
  [GET_COMICS]: (state, action) => {
    const comics = getLocalStorageWithExpiry(COMICS);
    if (!comics) {
      setLocalStorageWithExpiry(
        COMICS,
        action.payload,
        SIX_HOURS_TO_MILLI_SECONDS
      );
    }
    return {
      ...state,
      comics: action.payload,
    };
  },
  [GET_COMIC_BY_ID]: (state, action) => {
    return {
      ...state,
      comic: action.payload,
    };
  },
  [GET_CHARACTERS_BY_COMIC]: (state, action) => {
    return {
      ...state,
      charactersByComic: action.payload,
    };
  },
  [GET_STORIES_BY_COMIC]: (state, action) => {
    return {
      ...state,
      storiesByComic: action.payload,
    };
  },
  [LOADING_COMICS]: (state, action) => {
    return {
      ...state,
      isLoading: action.payload,
    };
  },
  [GET_ERRORS]: (state, action) => {
    return {
      ...state,
      error: "Something went wrong with the server!",
    };
  },
};

export default reducerCreator(initialState, comicReducer);
