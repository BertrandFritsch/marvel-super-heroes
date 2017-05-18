// @flow

import type { State } from '../flowTypes';
import type { Dispatch } from 'redux';

import { connect } from 'react-redux';
import actions from '../actions';
import CharacterView from './CharacterView';
import CharacterTiles from './CharacterTilesContainer';
import CharacterDetails from './CharacterDetailsContainer';

const tilesViewProps = {
  title: 'Liste des super héros',
  component: CharacterTiles
};

const detailsViewProps = {
  title: 'Fiche d\'identité',
  component: CharacterDetails
};

/**
 * Select the view to render:
 *  - the character details if a character is selected
 *  - the character tiles otherwise
 */
export default connect(
  (state: State) => state.characters.get('selectedItem') ? detailsViewProps : tilesViewProps,
  (dispatch: Dispatch<*>) => ({
    onNavigationRequested: state => dispatch(actions.onNavigationRequested(state))
  })
)(CharacterView);
