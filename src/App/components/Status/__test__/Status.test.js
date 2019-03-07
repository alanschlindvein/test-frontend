import React from 'react';
import { render, act } from 'commons/test-utils';

import { Status } from '../Status';

test('should call didMount getUsers on mounting', () => {
  const handleGetStatus = jest.fn();
  const status = {
    uptime: 1551899212604,
    request: 3
  };

  act(() => {
    render(<Status status={status} getStatus={handleGetStatus} />);
  });

  expect(handleGetStatus).toHaveBeenCalled();
});

test('should render date and requests', () => {
  const handleGetStatus = jest.fn();
  const status = {
    uptime: 1551899212604,
    requests: 3
  };

  const { getByText } = render(
    <Status status={status} getStatus={handleGetStatus} />
  );

  expect(getByText('06/03/2019 16:06:52')).toBeInTheDocument();
  expect(getByText('3')).toBeInTheDocument();
});