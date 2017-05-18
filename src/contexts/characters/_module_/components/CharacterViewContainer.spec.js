import React from 'react';
import { Provider } from 'react-redux';
import { Map, List } from 'immutable';
import CharacterViewContainer from './CharacterViewContainer';

describe('CharacterViewContainer', () => {
  let store;
  let state;

  beforeEach(() => {
    state = {
      characters: Map({
        items: List(),
        selectedItem: null
      })
    };
    store = ({
      default: () => {
      },
      subscribe: () => {
      },
      dispatch: jest.fn(),
      getState: () => state
    });
  });

  it('should render correctly', () => {
    const wrapper = mount(
      <Provider store={ store }>
        <CharacterViewContainer />
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should render the tiles view', () => {
    state.characters = state.characters.set('items', List([
      {
        id: 'id1',
        name: 'name1',
        thumbnail: 'http://.../standard_xlarge.jpg',
        thumbnail_details: 'http://.../portrait_incredible.jpg',
        urls: [
          {
            type: 'details',
            url: 'http://...'
          }
        ]
      }
    ]));

    const wrapper = mount(
      <Provider store={ store }>
        <CharacterViewContainer />
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should render the tiles view while loading', () => {
    state.characters = state.characters.set('loadingItems', 'true');

    const wrapper = mount(
      <Provider store={ store }>
        <CharacterViewContainer />
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
  });

  it('should render the details view', () => {
    state.characters = state.characters
      .set('items', List([
        {
          id: 'id1',
          name: 'name1',
          thumbnail: 'http://.../standard_xlarge.jpg',
          thumbnail_details: 'http://.../portrait_incredible.jpg',
          urls: [
            {
              type: 'details',
              url: 'http://...'
            }
          ]
        }
      ]))
      .set('selectedItem', {
        id: 'id1',
        name: 'name1',
        thumbnail: 'http://.../standard_xlarge.jpg',
        thumbnail_details: 'http://.../portrait_incredible.jpg',
        urls: [
          {
            type: 'details',
            url: 'http://...'
          }
        ],
        comics: {
          items: [
            {
              name: 'comics1'
            }
          ]
        },
        series: {
          items: [
            {
              name: 'series1'
            }
          ]
        }
      });

    const wrapper = mount(
      <Provider store={ store }>
        <CharacterViewContainer />
      </Provider>
    );

    expect(wrapper).toMatchSnapshot();
  });
});
