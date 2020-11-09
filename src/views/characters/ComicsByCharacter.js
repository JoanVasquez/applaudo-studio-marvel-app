import React, { useEffect, useState, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComicsByCharacter } from "../../store/actions/characters//characterAction";
import { setFavoriteItemsToLocalStorage } from "../../util/LocalStorageUtil";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  resetPagination,
  setPagination,
} from "../../store/actions/pagination/paginationAction";
import { genericFilteredItem } from "../../util/filterUtil";
import { ComicWrapper } from "../comics/ComicWrapper";
import { Paginator } from "../../components/paginator/Paginator";
import { QTY_ITEMS_BY_PAGE } from "../../constants/constants";
import { ComicCard } from "../../components/comic-card/ComicCard";

export const ComicsByCharacter = ({ characterId }) => {
  const comics = useSelector(
    (state) => state.characterReducer.comicsByCharacter
  );
  const isLoading = useSelector((state) => state.characterReducer.isLoading);
  const paginator = useSelector((state) => state.paginatorReducer.paginator);
  const errors = useSelector((state) => state.characterReducer.error);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getComicsByCharacter(characterId));
  }, [characterId, dispatch]);

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
            <article key={comic.id} className="col-md-6 col-sm-12 mt-3">
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
