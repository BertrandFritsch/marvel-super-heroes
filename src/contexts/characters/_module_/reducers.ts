import { List } from "immutable";
import ActionTypes, { CharacterAction } from "./actionTypes";

export interface CharacterCollection {
  items: Array<{
    name: string,
  }>;
}

export interface Character {
  id: string;
  name: string;
  description: string;
  thumbnail: string;
  thumbnail_details: string;
  comics: CharacterCollection;
  series: CharacterCollection;
  urls: Array<{
    type: string,
    url: string,
  }>;
}

export interface State {
  items: List<Character>;
  selectedItem: Character | null;
  loadingItems: boolean;
  loadingError: Error | null;
}

export interface CharacterState {
  characters: State;
}

const initialState: State = {
  items: List<Character>(),  // the characters list
  selectedItem: null,        // the selected character
  loadingItems: false,       // whether the characters are loading
  loadingError: null         // contains the error if the items failed to load
};

export interface Dispatch<S> {
  (action: CharacterAction): void;
}

export default (state: State | undefined, action: CharacterAction): State => {
  const locState = state || initialState;

  switch (action.type) {

    case ActionTypes.ITEMS_LOADING:
      return { ...initialState, loadingItems: true };

    case ActionTypes.ITEMS_LOADING_FAILED:
      return { ...locState, loadingError: action.payload };

    case ActionTypes.ITEMS_LOADED:
      return { ...locState, items: List(action.payload), loadingItems: false };

    case ActionTypes.ITEM_DETAILS_REQUESTED:
      return { ...locState, selectedItem: action.payload };

    case ActionTypes.ITEM_DETAILS_RESET:
      return { ...locState, selectedItem: null };

    default:
      return locState;
  }
};
