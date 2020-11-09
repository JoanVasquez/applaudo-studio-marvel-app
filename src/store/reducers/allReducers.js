import { combineReducers } from "redux";
import characterReducer from "./characters/characterReducer";
import comicReducer from "./comics/comicReducer";
import paginatorReducer from "./pagination/paginationReducer";
import storyReducer from "./stories/storyReducer";

export default combineReducers({
  characterReducer,
  comicReducer,
  storyReducer,
  paginatorReducer,
});
