import * as React from "react";

interface Props {

  /**
   * The main component
   */
  component: React.ComponentClass<any>;

  /**
   * The title of the view
   */
  title: string;

  /**
   * Navigation requested
   */
  onNavigationRequested: (state: string | null) => void;
}

/**
 * The view
 */
export default class CharacterView extends React.PureComponent<Props, void> {

  componentDidMount() {
    window.addEventListener("popstate", this.onNavigationRequested);
  }

  componentWillUnmount() {
    window.removeEventListener("popstate", this.onNavigationRequested);
  }

  onNavigationRequested = (e: PopStateEvent): void => this.props.onNavigationRequested(e.state);

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
