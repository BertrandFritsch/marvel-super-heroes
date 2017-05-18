import { Map, List } from 'immutable';
import reducers from './reducers';
import actionTypes from './actionTypes';

describe('character reducers', () => {
  it('should throw an exception for malformed actions', () => {
    expect(reducers).toThrow(TypeError);
  });

  it('should return the provided state for unknown actions', () => {
    const state = Map({});

    expect(reducers(state, { type: 'XXX' }).toJSON()).toEqual({});
  });

  it('should get the default state', () => {
    const initialState = Map({
      items: List(),
      selectedItem: null,
      loadingItems: false,
      loadingError: null
    });

    expect(reducers(undefined, { type: 'XXX' }).toJSON()).toEqual(initialState.toJSON());
  });

  it(`should replace the loaded items on ${actionTypes.ITEMS_LOADED}`, () => {
    const initialState = Map({
      items: List([
        {
          id: 'id1',
          name: 'name1'
        }
      ]),
      selectedItem: null
    });

    const loadedItems = List([
      {
        id: 'id2',
        name: 'name2'
      }
    ]);

    const expectedState = initialState
      .set('items', loadedItems)
      .set('loadingItems', false);

    expect(reducers(initialState, { type: actionTypes.ITEMS_LOADED, payload: loadedItems }).toJSON()).toEqual(expectedState.toJSON());
  });

  it(`should set the selected item on ${actionTypes.ITEM_DETAILS_REQUESTED}`, () => {
    const initialState = Map({
      items: List([
        {
          id: 'id1',
          name: 'name1'
        }
      ]),
      selectedItem: null
    });

    const item = {
      id: 'id1',
      name: 'name1'
    };

    const expectedState = initialState.set('selectedItem', item);

    expect(reducers(initialState, { type: actionTypes.ITEM_DETAILS_REQUESTED, payload: item }).toJSON()).toEqual(expectedState.toJSON());
  });

  it(`should reset the selected item on ${actionTypes.ITEM_DETAILS_RESET}`, () => {
    const initialState = Map({
      items: List([
        {
          id: 'id1',
          name: 'name1'
        }
      ]),
      selectedItem: {
        id: 'id1',
        name: 'name1'
      }
    });

    const item = null;

    const expectedState = initialState.set('selectedItem', item);

    expect(reducers(initialState, { type: actionTypes.ITEM_DETAILS_RESET, payload: item }).toJSON()).toEqual(expectedState.toJSON());
  });
});
