import * as React from "react";
import { Character } from "../reducers";
import CharacterDetailsCollection from "./CharacterDetailsCollection";

interface Props {

  /**
   * The item
   */
  item: Character;
}

/**
 * Character details
 */
export default function CharacterDetails(props: Props) {
  const { item } = props;

  return (
    <div className="character-details">
      <img src={ item.thumbnail_details }/>
      <div className="character-details-desc">
        <span className="character-details-name">{ item.name }</span>
        <p className="character-details-description">{ item.description }</p>
        <CharacterDetailsCollection name="Comics" items={ item.comics.items }/>
        <CharacterDetailsCollection name="Series" items={ item.series.items }/>
      </div>
    </div>
  );
}
