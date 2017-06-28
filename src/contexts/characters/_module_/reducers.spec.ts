import { List } from 'immutable';
import ActionTypes from './actionTypes';
import charactersReducer from './reducers';

const reducer = charactersReducer.characters;

describe('character reducer', () => {
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

  it('should throw an exception for malformed actions', () => {
    expect(reducer).toThrow(TypeError);
  });

  it('should return the provided state for unhandled actions', () => {
    const state = {
      items: List([]),
      selectedItem: null,
      loadingItems: false,
      loadingError: null
    };

    expect(reducer(state, { type: ActionTypes.TILES_VIEW_LOADED })).toEqual(state);
  });

  it('should get the default state', () => {
    const initialState = {
      items: List(),
      selectedItem: null,
      loadingItems: false,
      loadingError: null
    };

    expect(reducer(undefined, { type: ActionTypes.TILES_VIEW_LOADED })).toEqual(initialState);
  });

  it(`should replace the loaded items on ${ActionTypes.ITEMS_LOADED}`, () => {
    const initialState = {
      items: List([ character ]),
      selectedItem: null,
      loadingItems: true,
      loadingError: null
    };

    const loadedItems = [
      { ...character, id: 'id2', name: 'name2' }
    ];

    const expectedState = { ...initialState, items: List(loadedItems), loadingItems: false };

    expect(reducer(initialState, { type: ActionTypes.ITEMS_LOADED, payload: loadedItems })).toEqual(expectedState);
  });

  it(`should set the selected item on ${ActionTypes.ITEM_DETAILS_REQUESTED}`, () => {
    const initialState = {
      items: List([ character ]),
      selectedItem: null,
      loadingItems: true,
      loadingError: null
    };

    const item = character;

    const expectedState = { ...initialState, selectedItem: item };

    expect(reducer(initialState, { type: ActionTypes.ITEM_DETAILS_REQUESTED, payload: item })).toEqual(expectedState);
  });

  it(`should reset the selected item on ${ActionTypes.ITEM_DETAILS_RESET}`, () => {
    const initialState = {
      items: List([ character ]),
      selectedItem: character,
      loadingItems: true,
      loadingError: null
    };

    const item = null;

    const expectedState = { ...initialState, selectedItem: item };

    expect(reducer(initialState, { type: ActionTypes.ITEM_DETAILS_RESET, payload: item })).toEqual(expectedState);
  });
});
