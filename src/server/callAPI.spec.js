import { call, apply, race } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import callAPI, { callAPI_ } from './callAPI';

describe('callAPI', () => {
  const URI = 'https://server.com/api';

  const RETRY_DELAYS = [ 1000, 3000 ];
  const CALL_TIMEOUT = 15000;

  const defaultCallAPIOptions = {
    headers: {
      Accept: 'application/json'
    },
    method: 'GET'
  };

  describe('callAPI_', () => {

    it('should use the provided arguments', () => {
      const URL = 'https://server.com/api/profile';
      const options = {
        method: 'POST',
        body: {}
      };

      const gen = callAPI_(URL, options);

      // call the API
      expect(gen.next().value).toEqual(call(fetch, URL, { ...defaultCallAPIOptions, ...options }));

      const response = {
        json: () => {
        }
      };

      // get the JSON response
      expect(gen.next(response).value).toEqual(apply(response, response.json));

      const body = {};

      // get the body
      expect(gen.next(body)).toEqual({ done: true, value: { body: {}, status: 200 } });
    });

    it('should get a 0 status in case of an exception during the API call', () => {
      const gen = callAPI_(URI);

      // call the API
      expect(gen.next().value).toEqual(call(fetch, URI, defaultCallAPIOptions));

      const error = new Error('fetch exception...');

      // get the JSON response
      expect(gen.throw(error)).toEqual({ done: true, value: { status: 0, error } });
    });
  });

  it('should send a request with the default arguments', () => {
    const gen = callAPI();

    // call the API
    expect(gen.next().value).toEqual(race({
      response: call(callAPI_, undefined, undefined),
      timeout: call(delay, CALL_TIMEOUT)
    }));

    const response = {
      status: 200,
      headers: {
        get: header => ({ 'Content-Type': 'application/json' }[ header ])
      },

      json: () => {},
      text: () => {}
    };

    // get the response
    expect(gen.next({ response: { status: 200, response } })).toEqual({ done: true, value: { status: 200, response } });
  });

  it('should retry if the API call times out', () => {
    const gen = callAPI();

    // call the API
    expect(gen.next().value).toEqual(race({
      response: call(callAPI_, undefined, undefined),
      timeout: call(delay, CALL_TIMEOUT)
    }));

    // make timeout occur, should delay one time
    expect(gen.next({ timeout: true }).value).toEqual(call(delay, RETRY_DELAYS[ 0 ]));

    // call the API a second time
    expect(gen.next().value).toEqual(race({
      response: call(callAPI_, undefined, undefined),
      timeout: call(delay, CALL_TIMEOUT)
    }));

    const response = {
      status: 200,
      headers: {
        get: header => ({ 'Content-Type': 'application/json' }[ header ])
      },

      json: () => {},
      text: () => {}
    };

    // now, get the response
    expect(gen.next({ response: { status: 200, response } })).toEqual({ done: true, value: { status: 200, response } });
  });

  it('should fail if the API call times out three times', () => {
    const gen = callAPI();

    // call the API
    expect(gen.next().value).toEqual(race({
      response: call(callAPI_, undefined, undefined),
      timeout: call(delay, CALL_TIMEOUT)
    }));

    // make timeout occur, should delay one time
    expect(gen.next({ timeout: true }).value).toEqual(call(delay, RETRY_DELAYS[ 0 ]));

    // call the API a second time
    expect(gen.next().value).toEqual(race({
      response: call(callAPI_, undefined, undefined),
      timeout: call(delay, CALL_TIMEOUT)
    }));

    // make timeout occur, should delay a second time
    expect(gen.next({ timeout: true }).value).toEqual(call(delay, RETRY_DELAYS[ 1 ]));

    // call the API a third time
    expect(gen.next().value).toEqual(race({
      response: call(callAPI_, undefined, undefined),
      timeout: call(delay, CALL_TIMEOUT)
    }));

    // should return an error
    expect(gen.next({ timeout: true })).toEqual({ done: true, value: { status: 0, error: new Error('The API call timed out.') } });
  });

  it('should retry on 0', () => {
    const gen = callAPI();

    // call the API
    expect(gen.next().value).toEqual(race({
      response: call(callAPI_, undefined, undefined),
      timeout: call(delay, CALL_TIMEOUT)
    }));

    // make timeout occur, should delay one time
    expect(gen.next({ response: { status: 0 } }).value).toEqual(call(delay, RETRY_DELAYS[ 0 ]));

    // call the API a second time
    expect(gen.next().value).toEqual(race({
      response: call(callAPI_, undefined, undefined),
      timeout: call(delay, CALL_TIMEOUT)
    }));

    const response = {
      status: 200,
      headers: {
        get: header => ({ 'Content-Type': 'application/json' }[ header ])
      },

      json: () => {},
      text: () => {}
    };

    // now, get the response
    expect(gen.next({ response: { status: 200, response } })).toEqual({ done: true, value: { status: 200, response } });
  });

  it('should get 0 if the API call gets 0 three times ', () => {
    const gen = callAPI();

    // call the API
    expect(gen.next().value).toEqual(race({
      response: call(callAPI_, undefined, undefined),
      timeout: call(delay, CALL_TIMEOUT)
    }));

    const response = {
      status: 0,
      response
    };

    // make timeout occur, should delay one time
    expect(gen.next({ response }).value).toEqual(call(delay, RETRY_DELAYS[ 0 ]));

    // call the API a second time
    expect(gen.next().value).toEqual(race({
      response: call(callAPI_, undefined, undefined),
      timeout: call(delay, CALL_TIMEOUT)
    }));

    // make timeout occur, should delay a second time
    expect(gen.next({ response }).value).toEqual(call(delay, RETRY_DELAYS[ 1 ]));

    // call the API a third time
    expect(gen.next().value).toEqual(race({
      response: call(callAPI_, undefined, undefined),
      timeout: call(delay, CALL_TIMEOUT)
    }));

    // should return an error
    expect(gen.next({ response })).toEqual({ done: true, value: response });
  });
});
