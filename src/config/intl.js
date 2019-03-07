import en from 'react-intl/locale-data/en';

import { addLocaleData } from 'react-intl';

import { flattenLabels, labels } from 'commons/locale';

export const initIntl = () =>
  new Promise(resolve => {
    if (window.Intl) {
      addLocaleData([...en]);
      resolve();
      return;
    }

    Promise.all([import('intl'), import('intl/locale-data/jsonp/en')]).then(
      resolve
    );
  });

export const intlProviderProps = {
  locale: 'en',
  messages: flattenLabels(labels)
};
