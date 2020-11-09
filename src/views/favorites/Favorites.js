import React from "react";
import {
  FAVORITE_CHARACTERS,
  FAVORITE_COMICS,
} from "../../constants/constants";
import { setFavoriteItemsToLocalStorage } from "../../util/LocalStorageUtil";
import { CharacterCard } from "../../components/character-card/CharacterCard";
import { ComicCard } from "../../components/comic-card/ComicCard";
import { NoFound } from "../../components/no-found/NoFound";

export const Favorites = () => {
  const characters = JSON.parse(localStorage.getItem(FAVORITE_CHARACTERS));
  const comics = JSON.parse(localStorage.getItem(FAVORITE_COMICS));

  return (
    <article className="container">
      {characters && (
        <section className="row">
          <div className="col-12">
            <h2 className="mt-3">CHARACTERS</h2>
          </div>
          {characters.map((character, index) => {
            return (
              <div key={index} className="col-md-4 col-sm-12 mt-3">
                <CharacterCard
                  character={character}
                  onAddToFavorite={setFavoriteItemsToLocalStorage}
                  characterId={character.id}
                  title={character.name}
                  description={character.description || ""}
                  image={`${
                    character.thumbnail ? character.thumbnail.path : []
                  }.${
                    character.thumbnail ? character.thumbnail.extension : []
                  }`}
                />
              </div>
            );
          })}
        </section>
      )}
      {comics && (
        <section className="row">
          <div className="col-12">
            <h2 className="mt-3">COMICS</h2>
          </div>
          {comics.map((comic, index) => {
            return (
              <div key={index} className="col-md-4 col-sm-12 mt-3">
                <ComicCard
                  comic={comic}
                  title={comic.title}
                  image={`${comic.thumbnail.path}.${comic.thumbnail.extension}`}
                  characters={[]}
                  stories={comic.stories.items}
                />
              </div>
            );
          })}
        </section>
      )}
      {!characters && !comics && (
        <h2 className="text-center text-info" style={{ marginTop: "207px" }}>
          ADD SOME COMICS OR CHARACTERS TO FAVORITE!
        </h2>
      )}
    </article>
  );
};
