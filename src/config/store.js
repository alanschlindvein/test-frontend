import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import reducers from 'commons/store';

export default (initialState = {}) => {
  const store = createStore(
    reducers,
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
  );

  if (module.hot && process.env.NODE_ENV !== 'production') {
    module.hot.accept('commons/store', () => store.replaceReducer(reducers));
  }

  return store;
};
