import { Paginator } from "../../components/paginator/Paginator";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComics } from "../../store/actions/comics/comicAction";
import {
  resetPagination,
  setPagination,
} from "../../store/actions/pagination/paginationAction";
import { genericFilteredItem } from "../../util/filterUtil";
import { setFavoriteItemsToLocalStorage } from "../../util/LocalStorageUtil";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ComicWrapper } from "./ComicWrapper";
import { QTY_ITEMS_BY_PAGE } from "../../constants/constants";
import { ComicCard } from "../../components/comic-card/ComicCard";

export const Comic = () => {
  const comics = useSelector((state) => state.comicReducer.comics);
  const isLoading = useSelector((state) => state.comicReducer.isLoading);
  const paginator = useSelector((state) => state.paginatorReducer.paginator);
  const errors = useSelector((state) => state.comicReducer.error);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getComics());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setPagination(1, comics));
    return () => dispatch(resetPagination());
  }, [comics, setCurrentPage, dispatch]);

  const onPaginator = useCallback(
    (currentPage) => {
      dispatch(setPagination(currentPage, comics));
      setCurrentPage(currentPage);
    },
    [dispatch, comics]
  );

  const onFilter = useCallback(
    (filterBy, filterText) => {
      if (filterText.length) {
        const paginate = genericFilteredItem(
          filterText,
          filterBy,
          QTY_ITEMS_BY_PAGE,
          comics
        );
        dispatch(setPagination(1, paginate.filteredData));
      } else {
        onPaginator(currentPage);
      }
    },
    [comics, currentPage, dispatch, onPaginator]
  );

  const notify = () => toast("Added to favorite!");

  return (
    <React.Fragment>
      <ToastContainer />
      <ComicWrapper errors={errors} onFilter={onFilter} isLoading={isLoading}>
        {paginator.paginatedData.map((comic, index) => {
          return (
            <article key={index} className="col-md-6 col-sm-12 mt-3">
              <ComicCard
                notify={notify}
                isFavorable={true}
                comic={comic}
                onAddToFavorite={setFavoriteItemsToLocalStorage}
                title={comic.title}
                image={
                  comic.thumbnail
                    ? comic.thumbnail.path + "." + comic.thumbnail.extension
                    : null
                }
                characters={comic.characters ? comic.characters.items : []}
                stories={comic.stories ? comic.stories.items : []}
              />
            </article>
          );
        })}
      </ComicWrapper>
      <article className="container">
        <section className="row text-center">
          <article className="col-12">
            <Paginator
              onPaginate={onPaginator}
              paginatorData={paginator.paginatorData}
              pages={paginator.pages}
            />
          </article>
        </section>
      </article>
    </React.Fragment>
  );
};
