// @flow

import React from 'react';

type Props = {

  /**
   * The main component
   */
  component: React.Element<*>,

  /**
   * The title of the view
   */
  title: string,

  /**
   * Navigation requested
   */
  onNavigationRequested: (state: *) => void
};

/**
 * The view
 */
export default class CharacterView extends React.PureComponent<void, Props, void> {
  props: Props;

  componentDidMount() {
    window.addEventListener('popstate', this.onNavigationRequested);
  }

  componentWillUnmount() {
    window.removeEventListener('popstate', this.onNavigationRequested);
  }

  onNavigationRequested = (e: { state: ?string }) => this.props.onNavigationRequested(e.state);

  render() {
    return (
      <div className="main-container">
        <nav>
          <span className="marvel-logo">{ this.props.title }</span>
        </nav>
        <section className="character-section">
          <this.props.component />
        </section>
      </div>
    );
  }
}
