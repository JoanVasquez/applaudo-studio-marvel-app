import React, { useState, useCallback, useEffect } from "react";
import { getComicsByStory } from "../../store/actions/stories/storyAction";
import { useSelector, useDispatch } from "react-redux";
import {
  setPagination,
  resetPagination,
} from "../../store/actions/pagination/paginationAction";
import { QTY_ITEMS_BY_PAGE } from "../../constants/constants";
import { genericFilteredItem } from "../../util/filterUtil";
import { toast } from "react-toastify";
import { ComicWrapper } from "../comics/ComicWrapper";
import { ComicCard } from "../../components/comic-card/ComicCard";
import { setFavoriteItemsToLocalStorage } from "../../util/LocalStorageUtil";
import { Paginator } from "../../components/paginator/Paginator";

export const ComicsByStory = ({ storyId }) => {
  const comics = useSelector((state) => state.storyReducer.comicsByStory);
  const isLoading = useSelector((state) => state.storyReducer.isLoading);
  const paginator = useSelector((state) => state.paginatorReducer.paginator);
  const errors = useSelector((state) => state.storyReducer.error);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getComicsByStory(storyId));
  }, [storyId, dispatch]);

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
