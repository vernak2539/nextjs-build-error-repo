import React, { Component } from 'react';

import { clearActiveInteractionId, getInteractions } from '../actions/interactionsActions';

import PageContainer from '../containers/Page';
import InteractionsPageWrapper from '../containers/InteractionsPageWrapper';

export class InteractionsHome extends Component {
  static async getPageData(context, dispatch, getState) {
    const { req } = context;
    const isServer = Boolean(req);

    if (isServer) {
      const { interactions, config } = getState();
      await dispatch(getInteractions());

      const interactionsError = interactions.error;
      const configError = config.error;

      if (interactionsError || configError) {
        return { serverError: true };
      }
    }

    await dispatch(clearActiveInteractionId());
    return { serverError: false };
  }

  render() {
    return (
      <PageContainer>
        <InteractionsPageWrapper>test</InteractionsPageWrapper>
      </PageContainer>
    );
  }
}

export default InteractionsHome;
