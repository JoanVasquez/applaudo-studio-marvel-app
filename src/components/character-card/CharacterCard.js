import React from "react";
import { A } from "hookrouter";
import {
  charactersById,
  comicsByCharacter,
  storiesByCharacter,
} from "../../routes";
import { FAVORITE_CHARACTERS } from "../../constants/constants";

export const CharacterCard = ({
  characterId,
  title,
  image,
  onAddToFavorite,
  character,
  isFavorable,
  notify,
}) => {
  return (
    <div className="card text-center" style={{ margin: "0 auto" }}>
      <img
        src={image ? image : "/assets/images/no-image.png"}
        className="card-img-top lozad"
        alt="Characters"
      />
      <div className="card-body">
        <h6 className="card-title">{title}</h6>
        <hr />
        <A
          href={`${charactersById}/${characterId}`}
          className="btn btn-outline-dark btn-block"
        >
          View More
        </A>
        <A
          href={`${comicsByCharacter}/${characterId}`}
          className="btn btn-outline-dark btn-block"
          type="button"
        >
          Comics
        </A>
        <A
          href={`${storiesByCharacter}/${characterId}`}
          className="btn btn-outline-dark btn-block"
          type="button"
        >
          Stories
        </A>
        {isFavorable && (
          <button
            type="button"
            className="btn btn-outline-dark mb-3 btn-block"
            onClick={() => {
              onAddToFavorite(character, FAVORITE_CHARACTERS);
              notify();
            }}
          >
            Add To Favorite
          </button>
        )}
      </div>
    </div>
  );
};
