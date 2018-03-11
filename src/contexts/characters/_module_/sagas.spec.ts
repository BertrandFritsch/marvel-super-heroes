import { call, put, take } from 'redux-saga/effects';
import callAPI, { CallAPIResultType } from '../../../server/callAPI';
import ActionTypes from './actionTypes';
import sagas, { loadCharacters, navigation } from './sagas';

describe('characters sagas', () => {
  it('should start up the sagas', () => {
    const gen = sagas();

    expect(gen.next().value).toEqual([
      call(navigation),
      call(loadCharacters)
    ]);

    // expect the end of the generator
    expect(gen.next()).toEqual({ value: undefined, done: true });
  });

  describe('navigation', () => {

    const CHARACTER_TILES_PAGE = 'CHARACTER_TILES';

    it('should initialize the navigation history', () => {
      const gen = navigation();

      // Initialize the navigation history
      expect(gen.next().value).toEqual(call([ window.history, 'replaceState' ], CHARACTER_TILES_PAGE, ''));
    });

    it('should ignore unknown navigation events', () => {
      const gen = navigation();

      // Initialize the navigation history
      expect(gen.next().value).toEqual(call([ window.history, 'replaceState' ], CHARACTER_TILES_PAGE, ''));

      // wait for a navigation event
      expect(gen.next().value).toEqual(take(ActionTypes.NAVIGATION_REQUESTED));

      const action = { type: ActionTypes.NAVIGATION_REQUESTED, payload: null };

      // ignore the event and wait for the next navigation event
      expect(gen.next(action).value).toEqual(take(ActionTypes.NAVIGATION_REQUESTED));
    });

    it('should reset the character details', () => {
      const gen = navigation();

      // Initialize the navigation history
      expect(gen.next().value).toEqual(call([ window.history, 'replaceState' ], CHARACTER_TILES_PAGE, ''));

      // wait for a navigation event
      expect(gen.next().value).toEqual(take(ActionTypes.NAVIGATION_REQUESTED));

      const action = { type: ActionTypes.NAVIGATION_REQUESTED, payload: CHARACTER_TILES_PAGE };

      // ignore the event and wait for the next navigation event
      expect(gen.next(action).value).toEqual(put({ type: ActionTypes.ITEM_DETAILS_RESET }));

      // wait for the next navigation event
      expect(gen.next().value).toEqual(take(ActionTypes.NAVIGATION_REQUESTED));
    });
  });

  describe('loadCharacters', () => {
    it('should load the characters', () => {
      const gen = loadCharacters();

      // wait until the view has been loaded
      expect(gen.next().value).toEqual(take(ActionTypes.TILES_VIEW_LOADED));

      // notify about the loading of the items
      expect(gen.next().value).toEqual(put({ type: ActionTypes.ITEMS_LOADING }));

      const URI = 'https://gateway.marvel.com/v1/public/characters?ts=1494860896&apikey=298bab46381a6daaaee19aa5c8cafea5&hash=94546204dccb6a0268849f0ba2aac768';

      // call the API
      expect(gen.next().value).toEqual(call(callAPI, URI));

      const data = {
        results: [
          {
            id: 'id1',
            name: 'name1',
            thumbnail: {
              extension: 'jpg',
              path: 'http://...'
            },
            urls: [
              {
                type: 'details',
                url: 'http://...'
              },
            ],
          },
        ],
      };

      const items = [
        {
          id: 'id1',
          name: 'name1',
          thumbnail: 'http://.../standard_xlarge.jpg',
          thumbnail_details: 'http://.../portrait_incredible.jpg',
          urls: [
            {
              type: 'details',
              url: 'http://...'
            },
          ],
        },
      ];

      // dispatch the loaded characters
      expect(gen.next({
        type: CallAPIResultType.SUCCESS,
        status: 200,
        body: { data }
      }).value).toEqual(put({ type: ActionTypes.ITEMS_LOADED, payload: items }));

      // expect the end of the generator
      expect(gen.next()).toEqual({ value: undefined, done: true });
    });

    it('should dispatch errors', () => {
      const gen = loadCharacters();

      // wait until the view has been loaded
      expect(gen.next().value).toEqual(take(ActionTypes.TILES_VIEW_LOADED));

      // notify about the loading of the items
      expect(gen.next().value).toEqual(put({ type: ActionTypes.ITEMS_LOADING }));

      const URI = 'https://gateway.marvel.com/v1/public/characters?ts=1494860896&apikey=298bab46381a6daaaee19aa5c8cafea5&hash=94546204dccb6a0268849f0ba2aac768';

      // call the API
      expect(gen.next().value).toEqual(call(callAPI, URI));

      const error = new Error();

      // dispatch the error
      expect(gen.next({
        type: CallAPIResultType.ERROR,
        error
      }).value).toEqual(put({ type: ActionTypes.ITEMS_LOADING_FAILED, payload: error }));

      // expect the end of the generator
      expect(gen.next()).toEqual({ value: undefined, done: true });
    });
  });
});
