import { connect } from 'react-redux';
import ActionTypes, { Dispatch } from '../actionTypes';
import { CharacterState, State } from '../reducers';
import CharacterDetails from './CharacterDetailsContainer';
import CharacterTiles from './CharacterTilesContainer';
import CharacterView from './CharacterView';

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
  (state: CharacterState) => state.characters.selectedItem ? detailsViewProps : tilesViewProps,
  (dispatch: Dispatch<{ characters: State }>) => ({
    onNavigationRequested: (state: string | null): void => dispatch({
      type: ActionTypes.NAVIGATION_REQUESTED,
      payload: state
    })
  }),
  (stateProps, dispatchProps) => ({
    ...stateProps,
    ...dispatchProps
  })
)(CharacterView);
