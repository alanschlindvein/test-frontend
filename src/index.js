import React from 'react';
import ReactDOM from 'react-dom';

import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import * as serviceWorker from './serviceWorker';
import store from './config/store';
import { initIntl, intlProviderProps } from './config/intl';

import App from './App';
import { Status } from './App/components';

import 'antd/dist/antd.css';
import './index.css';

const renderApp = () => {
  ReactDOM.render(
    <Provider store={store()}>
      <IntlProvider {...intlProviderProps}>
        <Router>
          <React.Fragment>
            <Route exact path="/" component={App} />
            <Route exact path="/status" component={Status} />
          </React.Fragment>
        </Router>
      </IntlProvider>
    </Provider>,
    document.getElementById('root')
  );
  serviceWorker.unregister();
};

initIntl().then(renderApp);
