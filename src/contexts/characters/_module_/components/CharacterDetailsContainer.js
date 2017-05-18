// @flow

import type { State } from '../flowTypes';

import { connect } from 'react-redux';
import CharacterDetails from './CharacterDetails';

export default connect(
  (state: State) => ({
    item: state.characters.get('selectedItem')
  }))(CharacterDetails);
