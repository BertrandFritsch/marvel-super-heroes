import * as React from "react";
import * as ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";

import "./theme/marvel.scss";

import App from "./app";

/**
 * Entry point of the Application
 */
const render = (Component: typeof App) =>
  ReactDOM.render(
    <AppContainer>
      <Component />
    </AppContainer>, document.getElementById("root")
  );

render(App);

// Hot Module Replacement API
if (module.hot) {
  module.hot.accept("./app", () => {
    render(App);
  });
}
