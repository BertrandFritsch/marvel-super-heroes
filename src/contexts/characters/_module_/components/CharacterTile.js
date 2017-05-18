// @flow

import React from 'react';
import type { Item } from '../flowTypes';

type Props = {

  /**
   * The item
   */
  item: Item,

  /**
   * Called when the component has been loaded
   */
  onTileDetailsRequested: (item: Item) => void
};

export default function CharacterTile(props: Props) {
  const { item } = props;

  return (
    <div className="character-tile">
      <a href="#" onClick={ () => props.onTileDetailsRequested(item) }>
        <img src={ item.thumbnail } />
      </a>
      <span className="character-tile-name">{item.name}</span>
      <div className="character-tile-links">
        { item.urls.map(link => (<a key={ link.type } href={ link.url }>{ link.type }</a>)) }
      </div>
    </div>
  );
}
