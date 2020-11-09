import React from "react";
import { Character } from "./views/characters/Character";
import { ComicsByCharacter } from "./views/characters/ComicsByCharacter";
import { Comic } from "./views/comics/Comics";
import { Stories } from "./views/stories/Stories";
import { StoryByCharacter } from "./views/characters/StoryByCharacter";
import { Favorites } from "./views/favorites/Favorites";
import { CharacterDetails } from "./views/characters/CharacterDetails";
import { ComicDetails } from "./views/comics/ComicDetails";
import { CharactersByComic } from "./views/comics/CharactersByComic";
import { StoriesByComic } from "./views/comics/StoriesByComic";
import { StoryDetails } from "./views/stories/StoryDetails";
import { CharactersByStory } from "./views/stories/CharactersByStory";
import { ComicsByStory } from "./views/stories/ComicsByStory";

export const router = {
  //CHARACTERS ROUTES
  "/": () => <Character />,
  "/character/:characterId": ({ characterId }) => (
    <CharacterDetails characterId={characterId} />
  ),
  "/comics/character/:characterId": ({ characterId }) => (
    <ComicsByCharacter characterId={characterId} />
  ),
  "/stories/character/:characterId": ({ characterId }) => (
    <StoryByCharacter characterId={characterId} />
  ),

  //COMICS ROUTES
  "/comics": () => <Comic />,
  "/comic/:comicId": ({ comicId }) => <ComicDetails comicId={comicId} />,
  "/characters/comic/:comicId": ({ comicId }) => (
    <CharactersByComic comicId={comicId} />
  ),
  "/stories/comic/:comicId": ({ comicId }) => (
    <StoriesByComic comicId={comicId} />
  ),

  //STORIES ROUTES
  "/stories": () => <Stories />,
  "/story/:storyId": ({ storyId }) => <StoryDetails storyId={storyId} />,
  "/characters/story/:storyId": ({ storyId }) => (
    <CharactersByStory storyId={storyId} />
  ),
  "/comics/story/:storyId": ({ storyId }) => (
    <ComicsByStory storyId={storyId} />
  ),

  //FAVORITES ROUTES
  "/favorites": () => <Favorites />,
};

export const navRoutes = [
  {
    name: "Characters",
    path: "/",
  },
  {
    name: "Comics",
    path: "/comics",
  },
  {
    name: "Stories",
    path: "/stories",
  },
  {
    name: "Favorites",
    path: "/favorites",
  },
];

export const charactersById = "/character";
export const comicsByCharacter = "/comics/character";
export const storiesByCharacter = "/stories/character";

export const comicsById = "/comic";
export const charactersByComic = "/characters/comic";
export const storiesByComic = "/stories/comic";

export const storyById = "/story";
export const charactersByStory = "/characters/story";
export const comicByStory = "/comics/story";
