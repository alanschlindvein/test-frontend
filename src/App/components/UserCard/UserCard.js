import React from 'react';

import styled from 'styled-components';
import { object, func, bool } from 'prop-types';
import { Input, Checkbox, Button, Col } from 'antd';
import { FormattedMessage } from 'react-intl';
import { isCNPJ, isCPF } from 'brazilian-values';

import {
  cpfMask,
  cnpjMask,
  cleanValue
} from 'commons/formatter';

import ErrorMessage from './components/ErrorMessage';

const UserCardContainer = styled.div`
  width: 100%;
  height: 11em;
  padding: 1em;
  border: 1px solid lightgray;
  display: flex;
  border-radius: 4px;
  flex-direction: column;
  flex: 1 0;
  flex-grow: 1em;
  border: 1px solid lightgray;
`;

const ButtonStyled = styled(Button)`
  margin-right: 0.5em;
`;

const Footer = styled.div`
  position: absolute;
  bottom: 1em;
  margin-top: 1em;
  display: flex;
`;

const CheckboxWrapper = styled.div`
  margin-top: 0.5em;
`;

export function UserCard({ create, user, onSave, onDelete }) {
  const [docNumber, setDocNumber] = React.useState(user.docNumber || '');
  const [out, setOut] = React.useState(user.out || false);

  const showSaveButton = () =>
    isCPF(docNumber) || isCNPJ(docNumber);

  const showInvalidCpf = () =>
    cleanValue(docNumber).length === 11 && !isCPF(docNumber);

  const showInvalidCnpj = () =>
    cleanValue(docNumber).length === 14 && !isCNPJ(docNumber);

  const handleDocChange = ({ target }) => {
    const value = cleanValue(target.value).replace(/\D+/g, '');

    if (value.length > 14) {
      return;
    }

    if (value.length <= 11) {
      setDocNumber(cpfMask(value));
      return;
    }
    setDocNumber(cnpjMask(value));
  };

  const handleOutChange = ({ target }) => setOut(target.checked);

  const handleSave = () => {
    onSave({ ...user, docNumber, out });
    if (create) {
      setDocNumber('');
      setOut(false);
    }
  };

  const handleDelete = () => onDelete(user.id);

  const renderMessages = () => (
    <React.Fragment>
      {showInvalidCpf() && <ErrorMessage message="LABELS.MESSAGE.INVALID_CPF" />}
      {showInvalidCnpj() && <ErrorMessage message="LABELS.MESSAGE.INVALID_CNPJ" />}
    </React.Fragment>
  );

  return (
    <Col xl={6} lg={8} md={10} sm={12} xs={12}>
      <UserCardContainer data-testid="user-card">
        <Input placeholder="CPF/CNPJ" value={docNumber} onChange={handleDocChange} />
        {renderMessages()}
        <CheckboxWrapper>
          <Checkbox data-testid="checkbox" checked={out} onChange={handleOutChange}>
            <FormattedMessage id="LABELS.COMMONS.IRREGULAR" />
          </Checkbox>
        </CheckboxWrapper>
        <Footer>
          <ButtonStyled
            disabled={!showSaveButton()}
            type="primary"
            onClick={handleSave}
          >
            <FormattedMessage id="LABELS.COMMONS.SAVE" />
          </ButtonStyled>
          {!create && (
            <Button onClick={handleDelete}>
              <FormattedMessage id="LABELS.COMMONS.DELETE" />
            </Button>
          )}
        </Footer>
      </UserCardContainer>
    </Col>
  );
}

UserCard.defaultProps = {
  user: {}
};

UserCard.propTypes = {
  /* own props */
  create: bool,
  user: object,
  onSave: func.isRequired,
  onDelete: func
};

export default UserCard;
