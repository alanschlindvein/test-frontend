import React from 'react';
import { render } from 'commons/test-utils';

import { BrowserRouter as Router } from 'react-router-dom';

import { App } from '../App';

test('should call didMount getUsers on mounting', () => {
  const handleGetUsers = jest.fn();
  const handleSaveUser = jest.fn();
  const handleUpdateUser = jest.fn();
  const handleDeleteUser = jest.fn();

  render(
    <Router>
      <App
        users={[]}
        getUsers={handleGetUsers}
        saveUser={handleSaveUser}
        updateUser={handleUpdateUser}
        deleteUser={handleDeleteUser}
      />
    </Router>
  );

  expect(handleGetUsers).toHaveBeenCalled();
});

test('should render the right number of cards', () => {
  const handleGetUsers = jest.fn();
  const handleSaveUser = jest.fn();
  const handleUpdateUser = jest.fn();
  const handleDeleteUser = jest.fn();

  const users = [
    { id: '1', docNumber: '1', out: false},
    { id: '2', docNumber: '2', out: false}
  ]

  const { getAllByTestId } = render(
    <Router>
      <App
        users={users}
        getUsers={handleGetUsers}
        saveUser={handleSaveUser}
        updateUser={handleUpdateUser}
        deleteUser={handleDeleteUser}
      />
    </Router>
  );

  //blank card adds 1
  expect(getAllByTestId('user-card').length).toBe(users.length + 1);
});
