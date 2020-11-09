import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getComicById } from "../../store/actions/comics/comicAction";
import { HorizontalCard } from "../../components/horizontal-card/HorizontalCard";
import { A } from "hookrouter";
import { ListGroup } from "../../components/list-group/ListGroup";
import { charactersById, storyById } from "../../routes";
import { Alert } from "../../components/alert/Alert";

export const ComicDetails = ({ comicId }) => {
  const comic = useSelector((state) => state.comicReducer.comic);
  const error = useSelector((state) => state.comicReducer.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getComicById(comicId));
  }, [dispatch, comicId]);

  return (
    <article className="container">
      {error.length !== 0 && (
        <div className="row" style={{ marginTop: "179px" }}>
          <div className="col-12">
            <Alert message={error} type="alert-danger" />
          </div>
        </div>
      )}
      {comic && (
        <section className="row mt-4 ">
          <div className="col-12">
            <div className="row shadow-sm">
              <div className="col-md-6 col-sm-12 bg-white pt-3 pb-3 pb-3 rounded ">
                <h2 className="text-center">{comic[0].name}</h2>
                <HorizontalCard
                  image={
                    comic[0].thumbnail
                      ? comic[0].thumbnail.path +
                        "." +
                        comic[0].thumbnail.extension
                      : null
                  }
                />
              </div>
              <div className="col-md-6 col-sm-12 pb-3 pt-3 bg-white text-center rounded">
                <h2 className="text-center">CHARACTERS</h2>
                {comic[0].characters.items.map((character, index) => {
                  const splitURI = character.resourceURI.split("/");
                  return (
                    <A
                      key={index}
                      href={`${charactersById}/${
                        splitURI[splitURI.length - 1]
                      }`}
                    >
                      <div className="badge badge-info ml-3 mr-3 text-wrap">
                        {character.name}
                      </div>
                    </A>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="col-12 bg-white mt-3 pt-3 pb-3 rounded shadow-sm">
            <h2 className="text-center">STORIES</h2>
            <ul className="list-group">
              {comic[0].stories.items.map((story, index) => {
                const splitURI = story.resourceURI.split("/");
                return (
                  <A
                    className="text-info"
                    href={`${storyById}/${splitURI[splitURI.length - 1]}`}
                  >
                    <ListGroup key={index} message={story.name} />
                  </A>
                );
              })}
            </ul>
          </div>
        </section>
      )}
    </article>
  );
};
