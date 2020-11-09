import React, { useEffect, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStoriesByCharacter } from "../../store/actions/characters/characterAction";
import {
  setPagination,
  resetPagination,
} from "../../store/actions/pagination/paginationAction";
import { StoriesWrapper } from "../stories/StoriesWrapper";
import { Paginator } from "../../components/paginator/Paginator";
import { StoryCard } from "../../components/story-card/StoryCard";

export const StoryByCharacter = ({ characterId }) => {
  const stories = useSelector(
    (state) => state.characterReducer.storiesByCharacter
  );
  const isLoading = useSelector((state) => state.characterReducer.isLoading);
  const paginator = useSelector((state) => state.paginatorReducer.paginator);
  const errors = useSelector((state) => state.characterReducer.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStoriesByCharacter(characterId));
  }, [characterId, dispatch]);

  useEffect(() => {
    dispatch(setPagination(1, stories));
    return () => dispatch(resetPagination());
  }, [stories, dispatch]);

  const onPaginator = useCallback(
    (currentPage) => {
      dispatch(setPagination(currentPage, stories));
    },
    [dispatch, stories]
  );

  return (
    <React.Fragment>
      {paginator.paginatedData &&
        paginator.paginatedData.map((story, index) => {
          return (
            <StoriesWrapper key={index} isLoading={isLoading} errors={errors}>
              <StoryCard
                title={story.title}
                description={story.description || ""}
                modified={story.modified}
                image={
                  story.thumbnail
                    ? story.thumbnail.path + "." + story.thumbnail.extension
                    : null
                }
                comics={story.comics}
                characters={story.characters}
              />
            </StoriesWrapper>
          );
        })}
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
