// @flow

import { Map, List } from 'immutable';
import actionTypes from './actionTypes';

export type State = Map<string, *>;

export type Action = {
  type: string,
  payload: ?*
}

const initialState = Map({
  items: List(),       // the characters list
  selectedItem: null,  // the selected character
  loadingItems: false, // whether the characters are loading
  loadingError: null   // contains the error if the items failed to load
});

export default (state: State = initialState, action: Action) => {
  switch (action.type) {

    case actionTypes.ITEMS_LOADING:
      return state.set('loadingItems', true);

    case actionTypes.ITEMS_LOADING_FAILED:
      return state.set('loadingError', action.payload);

    case actionTypes.ITEMS_LOADED:
      return state
        .set('items', List(action.payload || []))
        .set('loadingItems', false);

    case actionTypes.ITEM_DETAILS_REQUESTED:
      return state.set('selectedItem', action.payload);

    case actionTypes.ITEM_DETAILS_RESET:
      return state.set('selectedItem', null);

    default:
      return state;
  }
};
