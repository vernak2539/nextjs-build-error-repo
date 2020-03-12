import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import asyncAwait from 'redux-async-await';
import { composeWithDevTools } from 'redux-devtools-extension';
import defaultsDeep from 'lodash/defaultsDeep';

import defaultReducers from '../reducers';

export default function storeProvider(initialState = {}, isServer, isAdmin = false) {
  if (!isServer && typeof window !== 'undefined' && window.store) {
    return window.store;
  }

  // we don't want admin sharing state with non admin, so use different reducers
  const mergedState = defaultsDeep({}, initialState, defaultReducers());
  const composedMiddleware = composeWithDevTools(applyMiddleware(asyncAwait, thunk));
  const store = createStore(defaultReducers, mergedState, composedMiddleware);

  if (typeof window !== 'undefined') {
    if (module.hot) {
      module.hot.accept('../reducers', () => {
        // eslint-disable-next-line
        const nextReducer = require('../reducers').default;
        store.replaceReducer(nextReducer);
      });
    }
    window.store = store;
  }

  return store;
}
