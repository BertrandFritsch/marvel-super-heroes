import { mount } from 'enzyme';
import { List } from 'immutable';
import * as React from 'react';
import { Provider } from 'react-redux';
import { Store } from 'redux';
import { CharacterState } from '../reducers';
import CharacterViewContainer from './CharacterViewContainer';

describe('CharacterViewContainer', () => {
  let store: Store<CharacterState>;
  let state: CharacterState;

  beforeEach(() => {
    state = {
      characters: {
        items: List(),
        selectedItem: null,
        loadingItems: false,
        loadingError: null
      },
    };
    store = ({
      dispatch: (action) => action,
      getState: () => state,
      subscribe: (listener) => () => { },
      replaceReducer: () => { }
    });
  });

  it('should render correctly', () => {
    const wrapper = mount(
      <Provider store={ store }>
        <CharacterViewContainer />
      </Provider>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should render the tiles view', () => {
    const character = {
      id: 'id1',
      name: 'name1',
      description: 'desc 1',
      thumbnail: 'thumbnail1',
      thumbnail_details: 'thumbnail_details1',
      comics: {
        items: []
      },
      series: {
        items: []
      },
      urls: []
    };

    state.characters = {
      ...state.characters,
      items: List([ character ])
    };

    const wrapper = mount(
      <Provider store={ store }>
        <CharacterViewContainer />
      </Provider>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should render the tiles view while loading', () => {
    state.characters = {
      ...state.characters,
      loadingItems: true
    };

    const wrapper = mount(
      <Provider store={ store }>
        <CharacterViewContainer />
      </Provider>,
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should render the details view', () => {
    const character = {
      id: 'id1',
      name: 'name1',
      description: 'desc 1',
      thumbnail: 'thumbnail1',
      thumbnail_details: 'thumbnail_details1',
      comics: {
        items: [ { name: 'comics1' } ]
      },
      series: {
        items: [ { name: 'series1' } ]
      },
      urls: [ { type: 'details', url: 'http://...' } ]
    };

    state.characters = {
      ...state.characters,
      items: List([ character ]),
      selectedItem: character
    };

    const wrapper = mount(
      <Provider store={ store }>
        <CharacterViewContainer />
      </Provider>,
    );

    expect(wrapper).toMatchSnapshot();
  });
});
