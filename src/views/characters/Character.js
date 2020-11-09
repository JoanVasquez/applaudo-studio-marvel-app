import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetPagination,
  setPagination,
} from "../../store/actions/pagination/paginationAction";
import { getCharacters } from "../../store/actions/characters/characterAction";
import { Paginator } from "../../components/paginator/Paginator";
import {
  genericFilteredItem,
  genericFilterItemByObject,
} from "../../util/filterUtil";
import { setFavoriteItemsToLocalStorage } from "../../util/LocalStorageUtil";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { CharacterWrapper } from "./CharacterWrapper";
import { QTY_ITEMS_BY_PAGE } from "../../constants/constants";
import { CharacterCard } from "../../components/character-card/CharacterCard";

export const Character = () => {
  const characters = useSelector((state) => state.characterReducer.characters);
  const isLoading = useSelector((state) => state.characterReducer.isLoading);
  const paginator = useSelector((state) => state.paginatorReducer.paginator);
  const errors = useSelector((state) => state.characterReducer.error);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getCharacters());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setPagination(1, characters));
    return () => dispatch(resetPagination());
  }, [characters, dispatch]);

  const onPaginator = useCallback(
    (currentPage) => {
      dispatch(setPagination(currentPage, characters));
      setCurrentPage(currentPage);
    },
    [dispatch, characters]
  );

  const onFilter = useCallback(
    (filterBy, filterText) => {
      if (filterText) {
        if (filterBy === "name") {
          const paginate = genericFilteredItem(
            filterText,
            filterBy,
            QTY_ITEMS_BY_PAGE,
            characters
          );
          dispatch(setPagination(1, paginate.filteredData));
        } else if (filterBy === "comics" || filterBy === "stories") {
          const paginate = genericFilterItemByObject(
            filterText,
            filterBy,
            QTY_ITEMS_BY_PAGE,
            characters
          );

          dispatch(setPagination(1, paginate.filteredData));
        }
      } else {
        onPaginator(currentPage);
      }
    },
    [characters, currentPage, dispatch, onPaginator]
  );

  const notify = () => toast("Added to favorite!");

  return (
    <React.Fragment>
      <ToastContainer />
      <CharacterWrapper
        errors={errors}
        onFilter={onFilter}
        isLoading={isLoading}
      >
        {paginator.paginatedData.map((character) => {
          return (
            <article key={character.id} className="col-md-3 col-sm-12 mt-3">
              <CharacterCard
                notify={notify}
                isFavorable={true}
                character={character}
                onAddToFavorite={setFavoriteItemsToLocalStorage}
                characterId={character.id}
                title={character.name}
                image={
                  character.thumbnail
                    ? character.thumbnail.path +
                      "." +
                      character.thumbnail.extension
                    : null
                }
              />
            </article>
          );
        })}
      </CharacterWrapper>
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
