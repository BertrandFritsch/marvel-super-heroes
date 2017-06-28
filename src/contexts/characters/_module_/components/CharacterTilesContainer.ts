import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import ActionTypes, { Dispatch } from '../actionTypes';
import { Character, CharacterState } from '../reducers';
import CharacterTiles from './CharacterTiles';

const LOADING_MESSAGE = 'Chargement des héros...';

// use a memoized selector to re-compute the props only when the store has changed
const getProps = createSelector(
  (state: CharacterState) => state.characters.items,
  (state: CharacterState) => state.characters.loadingError,
  (state: CharacterState) => state.characters.loadingItems,
  (items, loadingError, loadingItems) => ({
    items: items.toArray(),
    message: loadingError ? loadingError.message : loadingItems ? LOADING_MESSAGE : null
  }),
);

export default connect(
  (state: CharacterState) => getProps(state),
  (dispatch: Dispatch<CharacterState>) => ({
    onTilesViewLoaded: (): void => dispatch({ type: ActionTypes.TILES_VIEW_LOADED }),
    onTileDetailsRequested: (item: Character): void => dispatch({
      type: ActionTypes.ITEM_DETAILS_REQUESTED,
      payload: item
    })
  }),
  (stateProps, dispatchProps) => ({
    ...stateProps,
    ...dispatchProps
  }))(CharacterTiles);
