// @flow

import actionTypes from './actionTypes';
import type { Item } from './flowTypes';

// redux action builders
export default {
  onTilesViewLoaded: () => ({ type: actionTypes.TILES_VIEW_LOADED }),
  onTileDetailsRequested: (item: Item) => ({ type: actionTypes.ITEM_DETAILS_REQUESTED, payload: item }),
  onNavigationRequested: (state: ?string) => ({ type: actionTypes.NAVIGATION_REQUESTED, payload: state })
};
