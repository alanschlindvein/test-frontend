import React from 'react';

import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { Link } from 'react-router-dom';

const HeaderConteiner = styled.div`
  background-color: #00a0d4;
  box-shadow: 0px 2px 4px #555;
  z-index: 999;
  height: 4em;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 1em;
`;

const LinkStyled = styled(Link)`
  color: white;
`;

function Header() {
  return (
    <HeaderConteiner>
      <FormattedMessage id="LABELS.COMMONS.APP_NAME">
        {txt => <LinkStyled to="/">{txt}</LinkStyled>}
      </FormattedMessage>
      <FormattedMessage id="LABELS.COMMONS.STATUS">
        {txt => <LinkStyled to="/status">{txt}</LinkStyled>}
      </FormattedMessage>
    </HeaderConteiner>
  );
}

export default Header;
