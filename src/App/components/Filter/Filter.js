import React from 'react';

import styled from 'styled-components';
import { func, string } from 'prop-types';
import { Radio } from 'antd';
import { connect } from 'react-redux';
import { FormattedMessage } from 'react-intl';

import { userActions } from 'commons/store/user';
import { FILTER } from 'commons/constants';

const FilterContainer = styled.div`
  background-color: lightgrey;
  padding: 1em;
`;

export function Filter({ filter, updateFilter }) {

  const handleChange = ({ target }) => updateFilter(target.value);

  return (
    <FilterContainer>
      <Radio.Group onChange={handleChange} value={filter}>
        <Radio value={FILTER.ALL}>
          <FormattedMessage id="LABELS.COMMONS.ALL"/>
        </Radio>
        <Radio value={FILTER.REGULAR}>
          <FormattedMessage id="LABELS.COMMONS.REGULAR"/>
        </Radio>
        <Radio value={FILTER.IRREGULAR}>
          <FormattedMessage id="LABELS.COMMONS.IRREGULAR"/>
        </Radio>
      </Radio.Group>
    </FilterContainer>
  );
}

Filter.propTypes ={
  /* user state */
  filter: string.isRequired,
  /* user actions */
  updateFilter: func.isRequired
};

const mapStateToProps = ({ users: { filter } }) => ({ filter });

const mapDispatchToProps = {
  updateFilter: userActions.updateFilter
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter);