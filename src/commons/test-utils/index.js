import React from 'react';

import { render } from 'react-testing-library';
import { IntlProvider } from 'react-intl';
import { Provider } from 'react-redux';

import store from '../../config/store';
import { initIntl, intlProviderProps } from '../../config/intl';

const customRender = (node, options) => {
  initIntl();

  return render(
    <Provider store={store()}>
      <IntlProvider {...intlProviderProps}>{node}</IntlProvider>
    </Provider>,
    options
  );
};

// re-export everything
export * from 'react-testing-library';

// override render method
export { customRender as render };
