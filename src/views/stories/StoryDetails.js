import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getStoryById } from "../../store/actions/stories/storyAction";
import { HorizontalCard } from "../../components/horizontal-card/HorizontalCard";
import { A } from "hookrouter";
import { comicsById } from "../../routes";
import { ListGroup } from "../../components/list-group/ListGroup";
import { Alert } from "../../components/alert/Alert";

export const StoryDetails = ({ storyId }) => {
  const story = useSelector((state) => state.storyReducer.story);
  const error = useSelector((state) => state.storyReducer.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getStoryById(storyId));
  }, [dispatch, storyId]);

  return (
    <article className="container">
      {error.length !== 0 && (
        <div className="row" style={{ marginTop: "179px" }}>
          <div className="col-12">
            <Alert message={error} type="alert-danger" />
          </div>
        </div>
      )}
      {story && (
        <section className="row mt-4 ">
          <div className="col-12">
            <div className="row shadow-sm">
              <div className="col-md-6 col-sm-12 bg-white pt-3 pb-3 pb-3 rounded ">
                <h2 className="text-center">{story[0].name}</h2>
                <HorizontalCard
                  description={story[0].description}
                  image={
                    story[0].thumbnail
                      ? story[0].thumbnail.path +
                        "." +
                        story[0].thumbnail.extension
                      : null
                  }
                />
              </div>
              <div className="col-md-6 col-sm-12 pb-3 pt-3 bg-white text-center rounded">
                <h2 className="text-center">COMICS</h2>
                {story[0].comics.items.map((comic, index) => {
                  const splitURI = comic.resourceURI.split("/");
                  return (
                    <A
                      key={index}
                      href={`${comicsById}/${splitURI[splitURI.length - 1]}`}
                    >
                      <div className="badge badge-info ml-3 mr-3 text-wrap">
                        {comic.name}
                      </div>
                    </A>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="col-12 bg-white mt-3 pt-3 pb-3 rounded shadow-sm">
            <h2 className="text-center">CHARACTERS</h2>
            <ul className="list-group">
              {story[0].characters.length ? (
                story[0].characters.items.map((character, index) => {
                  return <ListGroup key={index} message={character.name} />;
                })
              ) : (
                <span className="text-danger text-center mt-3">
                  No characters available
                </span>
              )}
            </ul>
          </div>
        </section>
      )}
    </article>
  );
};
