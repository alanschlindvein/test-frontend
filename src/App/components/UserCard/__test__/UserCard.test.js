import React from 'react';

import { render, act, fireEvent } from 'commons/test-utils';

import { UserCard } from '../UserCard';

test('should render blank card', () => {

  const handleSave = jest.fn();
  const handleDelete = jest.fn();

  const { queryByText } = render(
    <UserCard create user={{}} onSave={handleSave} onDelete={handleDelete} />
  );

  expect(queryByText('Remover')).not.toBeInTheDocument();
});

test('should render a normal card', () => {
  const handleSave = jest.fn();
  const handleDelete = jest.fn();

  const { getByText } = render(
    <UserCard user={{}} onSave={handleSave} onDelete={handleDelete} />
  );

  expect(getByText('Salvar')).toBeInTheDocument();
  expect(getByText('Remover')).toBeInTheDocument();
});

test('should render a card with right initial values filled', () => {
  const handleSave = jest.fn();
  const handleDelete = jest.fn();
  const user = { id: '1', docNumber: '611.946.290-24', out: false };

  const { getByPlaceholderText, queryByText } = render(
    <UserCard user={user} onSave={handleSave} onDelete={handleDelete} />
  );

  expect(getByPlaceholderText('CPF/CNPJ').value).toBe(user.docNumber);
  expect(queryByText('CPF inválido')).not.toBeInTheDocument();
});

test('should render a card with invalid cpf message', () => {
  const handleSave = jest.fn();
  const handleDelete = jest.fn();
  const user = { id: '1', docNumber: '000.000.000-00', out: false };

  const { getByPlaceholderText, getByText } = render(
    <UserCard user={user} onSave={handleSave} onDelete={handleDelete} />
  );

  expect(getByPlaceholderText('CPF/CNPJ').value).toBe(user.docNumber);
  expect(getByText('CPF inválido')).toBeInTheDocument();
});

test('should render a card with invalid cnpj message', () => {
  const handleSave = jest.fn();
  const handleDelete = jest.fn();
  const user = { id: '1', docNumber: '00.000.000/0000-00', out: false };

  const { getByPlaceholderText, getByText } = render(
    <UserCard user={user} onSave={handleSave} onDelete={handleDelete} />
  );

  expect(getByPlaceholderText('CPF/CNPJ').value).toBe(user.docNumber);
  expect(getByText('CNPJ inválido')).toBeInTheDocument();
});

test('should not be able to save a invalid user', () => {
  const handleSave = jest.fn();
  const handleDelete = jest.fn();
  const user = { id: '1', docNumber: '', out: false };

  const { getByPlaceholderText, getByText, queryByText } = render(
    <UserCard user={user} onSave={handleSave} onDelete={handleDelete} />
  );

  act(() => {
    fireEvent.change(
      getByPlaceholderText('CPF/CNPJ'), {target: { value: '000.000.000-00' }}
    )
  });

  expect(queryByText('CPF inválido')).toBeInTheDocument();
  expect(getByText('Salvar')).toBeDisabled();
});

test('should be able to save a valid user', () => {
  const handleSave = jest.fn();
  const handleDelete = jest.fn();
  const user = { id: '1', docNumber: '', out: false };

  const { getByPlaceholderText, getByText, queryByText } = render(
    <UserCard user={user} onSave={handleSave} onDelete={handleDelete} />
  );

  act(() => {
    fireEvent.change(
      getByPlaceholderText('CPF/CNPJ'), {target: { value: '611.946.290-24' }}
    )
  });

  fireEvent.click(getByText('Salvar'));

  expect(queryByText('CPF inválido')).not.toBeInTheDocument();
  expect(handleSave).toBeCalled();
});

test('should be able to delete user', () => {
  const handleSave = jest.fn();
  const handleDelete = jest.fn();
  const user = { id: '1', docNumber: '611.946.290-24', out: false };

  const { getByText } = render(
    <UserCard user={user} onSave={handleSave} onDelete={handleDelete} />
  );

  fireEvent.click(getByText('Remover'));

  expect(handleDelete).toBeCalled();
});