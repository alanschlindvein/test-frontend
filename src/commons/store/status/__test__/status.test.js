import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import api from 'commons/api';
import MockAxios from 'axios-mock-adapter';

import reducer from '../statusReducer';
import { actions, types } from '../statusActions';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

const mock = new MockAxios(api);

afterAll(() => mock.restore());

test('action', async () => {
  mock.onGet('/info').replyOnce(200, { info: 'test' });

  const expectedActions = [
    { type: types.GET_STATUS_SUCCESS, payload: { info: 'test' } },
  ];

  const store = mockStore({ status: {} });

  await store.dispatch(actions.getStatus());

  expect(store.getActions()).toEqual(expectedActions);
});

test('reducer', () => {
  expect(
    reducer(
      undefined,
      actions.updateStatus({
        info: 'test',
      }),
    ),
  ).toEqual({ info: 'test' });
});
