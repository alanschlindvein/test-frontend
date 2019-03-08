import React from 'react';

import { render, fireEvent } from 'commons/test-utils';
import { FILTER } from 'commons/constants';

import { Filter } from '../Filter';

test('should render radio with all value set to filter', () => {
  const handleFilter = jest.fn();

  const { getByLabelText } = render(
    <Filter filter={FILTER.ALL} updateFilter={handleFilter} />,
  );

  expect(getByLabelText('Todos').checked).toBe(true);
});

test('should render radio with regular value set to filter', () => {
  const handleFilter = jest.fn();

  const { getByLabelText } = render(
    <Filter filter={FILTER.REGULAR} updateFilter={handleFilter} />,
  );

  expect(getByLabelText('Regular').checked).toBe(true);
});

test('should render radio with irregular value set to filter', () => {
  const handleFilter = jest.fn();

  const { getByLabelText } = render(
    <Filter filter={FILTER.IRREGULAR} updateFilter={handleFilter} />,
  );

  expect(getByLabelText('Irregular').checked).toBe(true);
});

test('should trigger updateFilter', () => {
  const handleFilter = jest.fn();

  const { getByLabelText } = render(
    <Filter filter={FILTER.ALL} updateFilter={handleFilter} />,
  );

  fireEvent.change(getByLabelText('Regular'), {
    target: { value: FILTER.REGULAR },
  });
  fireEvent.click(getByLabelText('Regular'));

  expect(handleFilter).toHaveBeenCalled();
  expect(handleFilter).toHaveBeenCalledWith(FILTER.REGULAR);
});
