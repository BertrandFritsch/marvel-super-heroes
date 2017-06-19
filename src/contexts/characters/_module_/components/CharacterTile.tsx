import * as React from "react";
import { Character } from "../reducers";

interface Props {

  /**
   * The item
   */
  item: Character;

  /**
   * Called when the component has been loaded
   */
  onTileDetailsRequested: (item: Character) => void;
}

export default function CharacterTile(props: Props) {
  const { item } = props;

  return (
    <div className="character-tile">
      <a href="#" onClick={ () => props.onTileDetailsRequested(item) }>
        <img src={ item.thumbnail } />
      </a>
      <span className="character-tile-name">{item.name}</span>
      <div className="character-tile-links">
        { item.urls.map((link) => (<a key={ link.type } href={ link.url }>{ link.type }</a>)) }
      </div>
    </div>
  );
}
