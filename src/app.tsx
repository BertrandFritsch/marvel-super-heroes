import * as React from "react";
import { Provider } from "react-redux";

import store from "./createStore";

import characters from "./contexts/characters";

// The UI structure
export default () => (
  <Provider store={ store }>
    <characters.components.CharacterView />
  </Provider>
);
