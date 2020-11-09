import React from "react";
import { A } from "hookrouter";
import { HorizontalCard } from "../horizontal-card/HorizontalCard";
import {
  storyById,
  charactersByStory,
  comicByStory,
  comicsById,
  charactersById,
} from "../../routes";

export const StoryCard = ({
  storyId,
  title,
  image,
  description,
  modified,
  comics,
  characters,
}) => {
  return (
    <section className="row mt-4 rounded bg-white p-3 rounded shadow-sm">
      <div className="col-md-4 col-sm-12">
        <h6 className="text-center">{title}</h6>
        <HorizontalCard
          image={image}
          description={description}
          modified={modified}
        />
        <A
          href={`${storyById}/${storyId}`}
          className="btn btn-outline-dark btn-block"
        >
          View More
        </A>
        <A
          href={`${charactersByStory}/${storyId}`}
          className="btn btn-outline-dark btn-block"
        >
          CHARACTERS
        </A>
        <A
          href={`${comicByStory}/${storyId}`}
          className="btn btn-outline-dark btn-block"
        >
          COMICS
        </A>
      </div>
      <div className="col-md-4 col-sm-12 text-center">
        <h6 className="text-center">COMICS</h6>
        <hr />
        {comics && comics.items.length ? (
          comics.items.map((comic, index) => {
            const splitURI = comic.resourceURI.split("/");
            return (
              <A
                key={index}
                href={`${comicsById}/${splitURI.length - 1}`}
                className="ml-3 mr-3"
              >
                <div className="badge badge-info text-wrap">{comic.name}</div>
              </A>
            );
          })
        ) : (
          <div className="text-danger text-center">No Comics available!</div>
        )}
      </div>
      <div className="col-md-4 col-sm-12 text-center">
        <h6 className="text-center">CHARACTERS</h6>
        <hr />
        {characters && characters.items.length ? (
          characters.items.map((character, index) => {
            const splitURI = character.resourceURI.split("/");
            return (
              <A
                key={index}
                href={`${charactersById}/${splitURI[splitURI.length - 1]}`}
              >
                <div className="badge badge-info text-wrap">
                  {character.name}
                </div>
              </A>
            );
          })
        ) : (
          <div className="text-danger text-center">
            No Characters available!
          </div>
        )}
      </div>
    </section>
  );
};
