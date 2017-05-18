// @flow

import type { CallAPIResult } from '../../../server/callAPI';
import type { Effect } from 'redux-saga/effects';
import type { Action } from './reducers';

import { take, call, put } from 'redux-saga/effects';

import callAPI from '../../../server/callAPI';
import actionTypes from './actionTypes';

// const publicKey = '...';
// const privateKey = '...';
// const ts = Math.trunc(Date.now() / 1000)
// 'http://gateway.marvel.com/v1/public/characters?ts=' + ts + '&apikey=' + API_PUBLIC + '&hash=' + crypto.createHash('md5').update(ts + API_PRIVATE + API_PUBLIC).digest('hex')

const MARVEL_URL = 'http://gateway.marvel.com/v1/public';
const URL_QUERY = 'ts=1494860896&apikey=298bab46381a6daaaee19aa5c8cafea5&hash=94546204dccb6a0268849f0ba2aac768';

type MarvelCharacter = {
  data: {
    results: Array<{
      id: string,
      name: string,
      thumbnail: {
        extension: string,
        path: string
      },
      urls: Array<{
        type: string,
        url: string
      }>
    }>
  }
}

/**
 * Handle the navigation.
 * Go back to the tiles view when requested
 */
export function* navigation(): Generator<Array<Effect>, void, Action> {

  const CHARACTER_TILES_PAGE = 'CHARACTER_TILES';

  // Initialize the navigation history
  yield call([ window.history, 'replaceState' ], CHARACTER_TILES_PAGE, '');

  for ( ; ; ) {

    // wait for a navigation event
    const action = yield take(actionTypes.NAVIGATION_REQUESTED);

    if (action.payload === CHARACTER_TILES_PAGE) {

      // reset the details to go back to the tiles view
      yield put({ type: actionTypes.ITEM_DETAILS_RESET });
    }
  }
}

/**
 * Load the characters
 */
export function* loadCharacters(): Generator<Array<Effect>, void, CallAPIResult<MarvelCharacter>> {

  // wait until the view has been loaded
  yield take(actionTypes.TILES_VIEW_LOADED);

  // notify about the loading of the items
  yield put({ type: actionTypes.ITEMS_LOADING });

  const callAPIResult = yield call(callAPI, `${MARVEL_URL}/characters?${URL_QUERY}`);

  if (callAPIResult.status === 200 && callAPIResult.body) {
    yield put({
      type: actionTypes.ITEMS_LOADED,
      payload: callAPIResult.body.data.results.map(item => ({
        ...item,
        thumbnail: `${item.thumbnail.path}/standard_xlarge.${item.thumbnail.extension}`,
        thumbnail_details: `${item.thumbnail.path}/portrait_incredible.${item.thumbnail.extension}`
      }))
    });
  }
  else {
    // the API call failed
    yield put({ type: actionTypes.ITEMS_LOADING_FAILED, payload: callAPIResult.error });
  }
}

/**
 * characters sagas
 */
export default function* (): Generator<Array<Effect>, void, void> {
  yield [
    call(navigation),
    call(loadCharacters) // called only once
  ];
}
