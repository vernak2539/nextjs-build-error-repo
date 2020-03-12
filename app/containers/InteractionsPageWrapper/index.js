import React from 'react';
import PropTypes from 'prop-types';

import AppWrapperContainer from '../AppWrapper';

const InteractionsPageWrapper = (props) => (
  <AppWrapperContainer isError={props.isError}>{props.children}</AppWrapperContainer>
);

InteractionsPageWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  /* if the app is in error state, ie SHS is down */
  isError: PropTypes.bool,
};

InteractionsPageWrapper.defaultProps = {
  isError: false,
};

export default InteractionsPageWrapper;
