// tslint:disable-next-line
/// <reference path="../../../../../typings/react-stonecutter.d.ts" />

import * as React from 'react';
import { CSSGrid, makeResponsive } from 'react-stonecutter';

import { Character } from '../reducers';
import CharacterMessage from './CharacterMessage';
import CharacterTile from './CharacterTile';

const Grid = makeResponsive(CSSGrid);

interface Props {

  /**
   * The characters
   */
  items: Character[];

  /**
   * The message to display to the user
   */
  message: string | null;

  /**
   * Called when the component has been loaded
   */
  onTilesViewLoaded: () => void;

  /**
   * Called to display the details of a character
   */
  onTileDetailsRequested: (item: Character) => void;
}

/**
 * CharacterTiles Component
 *
 * Use a pure component -- it doesn't re-render if neither its props or state has changed
 */
export default class CharacterTiles extends React.PureComponent<Props> {

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
          this.props.items.map((item) => (
            <div key={ item.id }>
              <CharacterTile item={ item } onTileDetailsRequested={ this.props.onTileDetailsRequested } />
            </div>
          ))
        }
      </Grid>
    );
  }
}
