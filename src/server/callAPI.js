// @flow

import 'whatwg-fetch';
import type { Effect } from 'redux-saga/effects';
import { call, apply, race } from 'redux-saga/effects';
import { delay } from 'redux-saga';

// number of times the API call will be retried in case of failure and delays between each call
const RETRY_DELAYS = [ 1000, 3000 ];

// timeout for an API call
const CALL_TIMEOUT = 15000;

const defaultCallAPIOptions = {
  headers: {
    Accept: 'application/json'
  },
  method: 'GET'
};

export type CallAPIResult<T> = {|
  status: number,
  body?: T,
  error?: Object,
  response?: Response
|};

/**
 * Internal function to call the API one time
 * @param {string} url
 * @param {object} opts
 * @returns {*} A saga effect
 *
 * @private
 */
export function* callAPI_<T>(url: string, opts?: Object): Generator<Effect, CallAPIResult<T>, *> {
  try {
    const response: Response = yield call(fetch, url, {
      ...defaultCallAPIOptions,
      ...opts
    });

    const body = yield apply(response, response.json);
    return {
      status: 200,
      body
    };
  }
  catch (error) {
    return {
      status: 0,
      error
    };
  }
}

/**
 * Calls a remote API - should be called by a saga
 *
 * @param {string} url
 * @param {object} opts
 * @returns {*} A saga effect
 */
export default function* callAPI<T>(url: string, opts?: Object): Generator<Effect, CallAPIResult<T>, *> {

  for (let retry = 0; retry <= RETRY_DELAYS.length; ++retry) {

    const { response } = yield race({
      response: call(callAPI_, url, opts),
      timeout: call(delay, CALL_TIMEOUT)
    });

    if (response && response.status > 0 && response.status < 500) {
      return response;
    }

    if (retry < RETRY_DELAYS.length) {
      yield call(delay, RETRY_DELAYS[ retry ]);
    }
    else if (response !== undefined) {
      return response;
    }
    else {
      // timeout
      return {
        status: 0,
        error: new Error('The API call timed out.')
      };
    }
  }

  throw new Error('Should never reach this line!');
}
