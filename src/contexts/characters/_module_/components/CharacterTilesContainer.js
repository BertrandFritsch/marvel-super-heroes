// @flow

import type { State, Item } from '../flowTypes';
import type { Dispatch } from 'redux';

import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import actions from '../actions';
import CharacterTiles from './CharacterTiles';

const LOADING_MESSAGE = 'Chargement des héros...';

// use a memoized selector to re-compute the props only when the store has changed
const getProps = createSelector(
  (state: State) => state.characters.get('items'),
  (state: State) => state.characters.get('loadingError'),
  (state: State) => state.characters.get('loadingItems'),
  (items, loadingError, loadingItems) => ({
    items: items.toArray(),
    message: loadingError ? loadingError.message : loadingItems ? LOADING_MESSAGE : null // eslint-disable-line no-nested-ternary
  })
);

export default connect(
  (state: State) => getProps(state),
  (dispatch: Dispatch<*>) => ({
    onTilesViewLoaded: () => dispatch(actions.onTilesViewLoaded()),
    onTileDetailsRequested: (item: Item) => dispatch(actions.onTileDetailsRequested(item))
  }))(CharacterTiles);
