import React from 'react';

import styled from 'styled-components';
import { string } from 'prop-types';
import { FormattedMessage } from 'react-intl';

const MessageContainer = styled.div`
  color: red;
  margin-top: .25em;
  font-size: .9em;
`;

export function ErrorMessage({ message }) {
  return (
    <FormattedMessage id={message}>
      {txt => <MessageContainer>{txt}</MessageContainer>}
    </FormattedMessage>
  );
}

ErrorMessage.propTypes = {
  /* own props */
  message: string.isRequired
};

export default ErrorMessage;