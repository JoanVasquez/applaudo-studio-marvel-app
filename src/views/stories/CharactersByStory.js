import React, { useState, useEffect, useCallback } from "react";
import { getCharactersByStory } from "../../store/actions/stories/storyAction";
import { useSelector, useDispatch } from "react-redux";
import {
  setPagination,
  resetPagination,
} from "../../store/actions/pagination/paginationAction";
import { setFavoriteItemsToLocalStorage } from "../../util/LocalStorageUtil";
import { genericFilteredItem } from "../../util/filterUtil";
import { QTY_ITEMS_BY_PAGE } from "../../constants/constants";
import { toast } from "react-toastify";
import { Paginator } from "../../components/paginator/Paginator";
import { CharacterWrapper } from "../characters/CharacterWrapper";
import { CharacterCard } from "../../components/character-card/CharacterCard";

export const CharactersByStory = ({ storyId }) => {
  const characters = useSelector(
    (state) => state.storyReducer.charactersByStory
  );
  const isLoading = useSelector((state) => state.storyReducer.isLoading);
  const paginator = useSelector((state) => state.paginatorReducer.paginator);
  const errors = useSelector((state) => state.storyReducer.error);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    dispatch(getCharactersByStory(storyId));
  }, [storyId, dispatch]);

  useEffect(() => {
    dispatch(setPagination(1, characters));
    return () => dispatch(resetPagination());
  }, [characters, setCurrentPage, dispatch]);

  const onPaginator = useCallback(
    (currentPage) => {
      dispatch(setPagination(currentPage, characters));
      setCurrentPage(currentPage);
    },
    [dispatch, characters]
  );

  const onFilter = useCallback(
    (filterBy, filterText) => {
      if (filterText.length) {
        const paginate = genericFilteredItem(
          filterText,
          filterBy,
          QTY_ITEMS_BY_PAGE,
          characters
        );
        dispatch(setPagination(1, paginate.filteredData));
      } else {
        onPaginator(currentPage);
      }
    },
    [characters, currentPage, dispatch, onPaginator]
  );

  const notify = () => toast("Added to favorite!");

  return (
    <React.Fragment>
      <CharacterWrapper
        errors={errors}
        onFilter={onFilter}
        isLoading={isLoading}
      >
        {paginator.paginatorData ? (
          <span className="text-danger p-5">No characters avalable</span>
        ) : (
          paginator.paginatedData.map((character, index) => {
            return (
              <article key={index} className="col-md-3 col-sm-12 mt-3">
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
          })
        )}
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
