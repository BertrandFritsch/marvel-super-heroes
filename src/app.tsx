import * as React from 'react';
import { Provider } from 'react-redux';

import characters from './contexts/characters';

import { Store } from './createStore';

interface Props {
  store: Store;
}

// The UI structure
export default (props: Props) => (
  <Provider store={ props.store }>
    <div>
      <characters.components.CharacterView/>
    </div>
  </Provider>
);
