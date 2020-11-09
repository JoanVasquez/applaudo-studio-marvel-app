import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getStories } from "../../store/actions/stories/storyAction";
import {
  resetPagination,
  setPagination,
} from "../../store/actions/pagination/paginationAction";
import { Paginator } from "../../components/paginator/Paginator";
import { StoriesWrapper } from "./StoriesWrapper";
import { StoryCard } from "../../components/story-card/StoryCard";

export const Stories = () => {
  const stories = useSelector((state) => state.storyReducer.stories);
  const isLoading = useSelector((state) => state.storyReducer.isLoading);
  const paginator = useSelector((state) => state.paginatorReducer.paginator);
  const errors = useSelector((state) => state.storyReducer.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStories());
  }, [dispatch]);

  useEffect(() => {
    dispatch(setPagination(1, stories));
    return () => dispatch(resetPagination());
  }, [stories, dispatch]);

  const onPaginator = (currentPage) => {
    dispatch(setPagination(currentPage, stories));
  };

  return (
    <React.Fragment>
      <StoriesWrapper isLoading={isLoading} errors={errors}>
        {paginator.paginatedData &&
          paginator.paginatedData.map((story, index) => {
            return (
              <StoryCard
                key={index}
                title={story.title}
                storyId={story.id}
                description={story.description || ""}
                modified={story.modified}
                image={
                  story.thumbnail
                    ? story.thumbnail.path + "." + story.thumbnail.path
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
  );
};
