import React from "react";
import { FAVORITE_COMICS } from "../../constants/constants";
import { A } from "hookrouter";
import {
  charactersById,
  comicsById,
  charactersByComic,
  storiesByComic,
  storyById,
} from "../../routes";

export const ComicCard = ({
  title,
  image,
  characters,
  onAddToFavorite,
  comic,
  stories,
  isFavorable,
  notify,
}) => {
  return (
    <div className="card mb-3" style={{ maxWidth: "540px" }}>
      <div className="row no-gutters">
        <div className="col-md-4 p-3 rounded">
          <img src={image} className="card-img lozad" alt="Comic" />
        </div>
        <div className="col-md-8">
          <div className="card-body">
            <h6 className="card-title">{title}</h6>
            <span className="card-text">
              <hr />
              <h6>CHARACTERS</h6>
              {characters.length ? (
                characters.map((character, index) => {
                  const splitURI = character.resourceURI.split("/");
                  return (
                    <A
                      key={index}
                      className="text-info"
                      href={`${charactersById}/${
                        splitURI[splitURI.length - 1]
                      }`}
                    >
                      <div className="badge badge-info ml-3 text-wrap">
                        {character.name}
                      </div>
                    </A>
                  );
                })
              ) : (
                <span className="text-danger">No characters availables!</span>
              )}
            </span>
            <span className="card-text">
              <hr />
              <h6>STORIES</h6>
              {stories.length ? (
                stories.map((story, index) => {
                  const splitURI = story.resourceURI.split("/");
                  return (
                    <A
                      key={index}
                      className="text-info"
                      href={`${storyById}/${splitURI[splitURI.length - 1]}`}
                    >
                      <div className="badge badge-info ml-3 text-wrap">
                        {story.name}
                      </div>
                    </A>
                  );
                })
              ) : (
                <span className="text-danger">No stories availables!</span>
              )}
            </span>
          </div>
        </div>
        {isFavorable && (
          <div className="text-center col-12 mb-5 pl-4 pr-4">
            <button
              type="button"
              className="btn btn-outline-dark btn-block"
              onClick={() => {
                onAddToFavorite(comic, FAVORITE_COMICS);
                notify();
              }}
            >
              Add To Favorite
            </button>
            <A
              href={`${comicsById}/${comic.id}`}
              className="btn btn-outline-dark btn-block"
            >
              VIEW MORE
            </A>
            <A
              href={`${charactersByComic}/${comic.id}`}
              className="btn btn-outline-dark btn-block"
            >
              CHARACTERS
            </A>
            <A
              href={`${storiesByComic}/${comic.id}`}
              className="btn btn-outline-dark btn-block"
            >
              STORIES
            </A>
          </div>
        )}
      </div>
    </div>
  );
};
