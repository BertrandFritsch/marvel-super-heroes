// @flow

import type { State as CharacterState } from './reducers';

export type Item = {
  id: string,
  name: string,
  description: string,
  thumbnail: string,
  thumbnail_details: string,
  urls: Array<{
    type: string,
    url: string
  }>,
  comics: {
    items: Array<{
      name: string
    }>
  },
  series: {
    items: Array<{
      name: string
    }>
  }
};

export type State = {
  characters: CharacterState
}
