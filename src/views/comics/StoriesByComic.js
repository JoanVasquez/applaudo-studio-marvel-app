import React, { useEffect, useCallback } from "react";
import { getStoriesByComic } from "../../store/actions/comics/comicAction";
import { StoriesWrapper } from "../stories/StoriesWrapper";
import { useSelector, useDispatch } from "react-redux";
import {
  setPagination,
  resetPagination,
} from "../../store/actions/pagination/paginationAction";
import { Paginator } from "../../components/paginator/Paginator";
import { StoryCard } from "../../components/story-card/StoryCard";

export const StoriesByComic = ({ comicId }) => {
  const stories = useSelector((state) => state.comicReducer.storiesByComic);
  const isLoading = useSelector((state) => state.comicReducer.isLoading);
  const paginator = useSelector((state) => state.paginatorReducer.paginator);
  const errors = useSelector((state) => state.comicReducer.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStoriesByComic(comicId));
  }, [comicId, dispatch]);

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
    <article className="container">
      <React.Fragment>
        <StoriesWrapper isLoading={isLoading} errors={errors}>
          {paginator.paginatedData &&
            paginator.paginatedData.map((story, index) => {
              return (
                <StoryCard
                  key={index}
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
              );
            })}
        </StoriesWrapper>
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
    </article>
  );
};
