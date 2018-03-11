import { call, put, PutEffect, take } from 'redux-saga/effects';

import callAPI, { CallAPIResult, CallAPIResultType } from '../../../server/callAPI';
import ActionTypes, { CharacterAction } from './actionTypes';
import { CharacterCollection } from './reducers';

// const publicKey = '...';
// const privateKey = '...';
// const ts = Math.trunc(Date.now() / 1000)
// 'http://gateway.marvel.com/v1/public/characters?ts=' + ts + '&apikey=' + API_PUBLIC + '&hash=' + crypto.createHash('md5').update(ts + API_PRIVATE + API_PUBLIC).digest('hex')

const MARVEL_URL = 'https://gateway.marvel.com/v1/public';
const URL_QUERY = 'ts=1494860896&apikey=298bab46381a6daaaee19aa5c8cafea5&hash=94546204dccb6a0268849f0ba2aac768';

interface MarvelCharacter {
  data: {
    results: Array<{
      id: string,
      name: string,
      description: string,
      comics: CharacterCollection,
      series: CharacterCollection,
      thumbnail: {
        extension: string,
        path: string,
      },
      urls: Array<{
        type: string,
        url: string,
      }>,
    }>,
  };
}

// character-typed put function
const characterActionPut = (action: CharacterAction): PutEffect<CharacterAction> => put(action);

/**
 * Handle the navigation.
 * Go back to the tiles view when requested
 */
export function* navigation() {

  const CHARACTER_TILES_PAGE = 'CHARACTER_TILES';

  // Initialize the navigation history
  yield call([ window.history, 'replaceState' ], CHARACTER_TILES_PAGE, '');

  for ( ; ; ) {

    // wait for a navigation event
    const action = yield take(ActionTypes.NAVIGATION_REQUESTED);

    if (action.payload === CHARACTER_TILES_PAGE) {

      // reset the details to go back to the tiles view
      yield characterActionPut({ type: ActionTypes.ITEM_DETAILS_RESET });
    }
  }
}

/**
 * Load the characters
 */
export function* loadCharacters() {

  // wait until the view has been loaded
  yield take(ActionTypes.TILES_VIEW_LOADED);

  // notify about the loading of the items
  yield characterActionPut({ type: ActionTypes.ITEMS_LOADING });

  const callAPIResult: CallAPIResult<MarvelCharacter> = yield call(callAPI, `${MARVEL_URL}/characters?${URL_QUERY}`);

  if (callAPIResult.type === CallAPIResultType.SUCCESS && callAPIResult.status === 200 && callAPIResult.body) {
    yield characterActionPut({
      type: ActionTypes.ITEMS_LOADED,
      payload: callAPIResult.body.data.results.map((item) => ({
        ...item,
        thumbnail: `${item.thumbnail.path}/standard_xlarge.${item.thumbnail.extension}`,
        thumbnail_details: `${item.thumbnail.path}/portrait_incredible.${item.thumbnail.extension}`
      })),
    });
  }
  else {
    // the API call failed
    yield characterActionPut({
      type: ActionTypes.ITEMS_LOADING_FAILED,
      payload: callAPIResult.type === CallAPIResultType.SUCCESS ? new Error('The API call failed') : callAPIResult.error
    });
  }
}

/**
 * characters sagas
 */
export default function* () {
  yield [
    call(navigation),
    call(loadCharacters) // called only once
  ];
}
