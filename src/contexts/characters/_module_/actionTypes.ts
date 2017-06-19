/**
 * All redux actions are events
 */

import { Character } from "./reducers";

const enum ActionTypes {
  TILES_VIEW_LOADED = "TILES_VIEW_LOADED",
  ITEMS_LOADING = "ITEMS_LOADING",
  ITEMS_LOADED = "ITEMS_LOADED",
  ITEMS_LOADING_FAILED = "ITEMS_LOADING_FAILED",
  ITEM_DETAILS_REQUESTED = "ITEM_DETAILS_REQUESTED",
  ITEM_DETAILS_RESET = "ITEM_DETAILS_RESET",
  NAVIGATION_REQUESTED = "NAVIGATION_REQUESTED",
}

export default ActionTypes;

export type CharacterAction =
  { type: ActionTypes.TILES_VIEW_LOADED }
  | { type: ActionTypes.NAVIGATION_REQUESTED, payload: string | null }
  | { type: ActionTypes.ITEMS_LOADING }
  | { type: ActionTypes.ITEMS_LOADING_FAILED, payload: Error }
  | { type: ActionTypes.ITEMS_LOADED, payload: Character[] }
  | { type: ActionTypes.ITEM_DETAILS_REQUESTED, payload: Character }
  | { type: ActionTypes.ITEM_DETAILS_RESET };
