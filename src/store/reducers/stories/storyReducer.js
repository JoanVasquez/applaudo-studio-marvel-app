import reducerCreator from "../../../util/reducerCreator";
import {
  GET_STORIES,
  GET_ERRORS,
  LOADING_STORIES,
  GET_STORY_BY_ID,
  GET_CHARACTERS_BY_STORY,
  GET_COMICS_BY_STORY,
} from "../../actions/stories/storyActionType";
import {
  SIX_HOURS_TO_MILLI_SECONDS,
  STORIES,
} from "../../../constants/constants";
import {
  getLocalStorageWithExpiry,
  setLocalStorageWithExpiry,
} from "../../../util/LocalStorageUtil";

const initialState = {
  isLoading: false,
  stories: [],
  story: null,
  charactersByStory: [],
  comicsByStory: [],
  error: "",
};

const storyReducer = {
  [GET_STORIES]: (state, action) => {
    const stories = getLocalStorageWithExpiry(STORIES);
    if (!stories) {
      setLocalStorageWithExpiry(
        STORIES,
        action.payload,
        SIX_HOURS_TO_MILLI_SECONDS
      );
    }
    return {
      ...state,
      stories: action.payload,
    };
  },
  [GET_CHARACTERS_BY_STORY]: (state, action) => {
    return {
      ...state,
      charactersByStory: action.payload,
    };
  },
  [GET_COMICS_BY_STORY]: (state, action) => {
    return {
      ...state,
      comicsByStory: action.payload,
    };
  },
  [GET_STORY_BY_ID]: (state, action) => {
    return {
      ...state,
      story: action.payload,
    };
  },
  [LOADING_STORIES]: (state, action) => {
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

export default reducerCreator(initialState, storyReducer);
