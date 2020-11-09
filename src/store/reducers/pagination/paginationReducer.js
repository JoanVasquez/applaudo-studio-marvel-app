import reducerCreator from "../../../util/reducerCreator";
import {
  SET_PAGINATION,
  RESET_PAGINATION,
} from "../../actions/pagination/paginationActionType";

const initialState = {
  paginator: {
    pages: [],
    paginatorData: {},
    paginatedData: [],
    totalData: [],
  },
};

const paginatorReducer = {
  [SET_PAGINATION]: (state, action) => {
    return {
      ...state,
      paginator: action.payload,
    };
  },
  [RESET_PAGINATION]: (state, action) => {
    return {
      paginator: {
        pages: [],
        paginatorData: {},
        paginatedData: [],
        totalData: [],
      },
    };
  },
};

export default reducerCreator(initialState, paginatorReducer);
