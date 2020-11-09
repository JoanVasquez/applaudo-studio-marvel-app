import { SET_PAGINATION, RESET_PAGINATION } from "./paginationActionType";
import actionCreator from "../../../util/actionCreator";
import { PaginationService } from "../../../services/PaginationService";

const paginationService = new PaginationService();

export const setPagination = (currentPage, dataSet) => {
  const paginator = paginationService.setPagination(currentPage, dataSet);
  return actionCreator(SET_PAGINATION, "payload")(paginator);
};

export const resetPagination = () => {
  return actionCreator(RESET_PAGINATION)();
};
