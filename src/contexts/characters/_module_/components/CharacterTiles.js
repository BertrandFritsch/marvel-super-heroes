// @flow

import React from 'react';
import { CSSGrid, makeResponsive } from 'react-stonecutter';

import CharacterTile from './CharacterTile';
import CharacterMessage from './CharacterMessage';

import type { Item } from '../flowTypes';

const Grid = makeResponsive(CSSGrid);

type Props = {

  /**
   * The characters
   */
  items: Array<Item>,

  /**
   * The message to display to the user
   */
  message: string,

  /**
   * Called when the component has been loaded
   */
  onTilesViewLoaded: () => void,

  /**
   * Called to display the details of a character
   */
  onTileDetailsRequested: (item: Item) => void
};

/**
 * CharacterTiles Component
 *
 * Use a pure component -- it doesn't re-render if neither its props or state has changed
 */
export default class CharacterTiles extends React.PureComponent<void, Props, void> {
  props: Props;

  componentDidMount() {
    this.props.onTilesViewLoaded();
  }

  render() {
    if (this.props.message) {
      return <CharacterMessage message={ this.props.message } />;
    }

    return (
      <Grid
          columnWidth={ 250 }
          duration={ 800 }
          gutterHeight={ 10 }
          gutterWidth={ 10 }
          itemHeight={ 280 }
      >
        {
          this.props.items.map(item => (
            <div key={ item.id }>
              <CharacterTile item={ item } onTileDetailsRequested={ this.props.onTileDetailsRequested } />
            </div>
          ))
        }
      </Grid>
    );
  }
}
