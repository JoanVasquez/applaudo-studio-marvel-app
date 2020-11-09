import { A } from "hookrouter";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HorizontalCard } from "../../components/horizontal-card/HorizontalCard";
import { ListGroup } from "../../components/list-group/ListGroup";
import { getCharacterById } from "../../store/actions/characters/characterAction";
import { comicsById } from "../../routes";
import { Alert } from "../../components/alert/Alert";

export const CharacterDetails = ({ characterId }) => {
  const character = useSelector((state) => state.characterReducer.character);
  const error = useSelector((state) => state.characterReducer.error);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCharacterById(characterId));
  }, [dispatch, characterId]);

  return (
    <article className="container mt-3">
      {error.length !== 0 && (
        <div className="row" style={{ marginTop: "179px" }}>
          <div className="col-12">
            <Alert message={error} type="alert-danger" />
          </div>
        </div>
      )}
      {character && (
        <section className="row mt-4 ">
          <div className="col-12">
            <div className="row shadow-sm">
              <div className="col-md-6 col-sm-12 bg-white pt-3 pb-3 pb-3 rounded ">
                <h2 className="text-center">{character[0].name}</h2>
                <HorizontalCard
                  image={
                    character[0].thumbnail
                      ? character[0].thumbnail.path +
                        "." +
                        character[0].thumbnail.extension
                      : null
                  }
                  description={character[0].description || ""}
                  modified={character[0].modified}
                />
              </div>
              <div className="col-md-6 col-sm-12 pb-3 pt-3 bg-white text-center rounded">
                <h2 className="text-center">COMICS</h2>
                {character[0].comics.items.map((comic, index) => {
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
            <h2 className="text-center">STORIES</h2>
            <ul className="list-group">
              {character[0].stories.items.map((story, index) => {
                return <ListGroup key={index} message={story.name} />;
              })}
            </ul>
          </div>
        </section>
      )}
    </article>
  );
};
