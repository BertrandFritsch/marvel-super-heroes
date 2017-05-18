// @flow

import React from 'react';
import CharacterDetailsCollection from './CharacterDetailsCollection';

import type { Item } from '../flowTypes';

type Props = {

  /**
   * The item
   */
  item: Item
};

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
