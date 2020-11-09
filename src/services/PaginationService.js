import { QTY_ITEMS_BY_PAGE } from "../constants/constants";
import { pagination } from "../util/paginationUtil";

export class PaginationService {
  setPagination(currentPage, dataSet) {
    const paginate = pagination(currentPage, QTY_ITEMS_BY_PAGE, dataSet);
    return {
      pages: paginate.pages,
      paginatedData: paginate.paginatedData,
      paginatorData: paginate.paginatorData,
      totalData: dataSet,
    };
  }
}
