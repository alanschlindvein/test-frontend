import React from 'react';

import styled from 'styled-components';
import dayjs from 'dayjs';
import { object, func } from 'prop-types';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import { statusActions } from 'commons/store/status';

const StatusContainer = styled.div`
  margin: 2em;
`;

export function Status({ status, getStatus }) {
  React.useEffect(() => {
    getStatus();
  }, []);

  return (
    <StatusContainer>
      <h2>
        <FormattedMessage id="LABELS.COMMONS.SERVER_INFO" />
      </h2>
      <FormattedMessage id="LABELS.COMMONS.UPTIME" />
      <h3>{dayjs(status.uptime).format('DD/MM/YYYY HH:mm:ss')}</h3>
      <FormattedMessage id="LABELS.COMMONS.REQUESTS" />
      <h3>{status.requests}</h3>
    </StatusContainer>
  );
}

Status.protTypes = {
  /* status state */
  status: object.isRequired,
  /* status actions */
  getStatus: func.isRequired
};

const mapStateToProps = ({ status }) => ({
  status
});

const { getStatus } = statusActions;

const mapDispatchToProps = {
  getStatus
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Status);
