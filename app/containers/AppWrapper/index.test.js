import React from 'react';
import { shallow } from 'enzyme';

import { AppWrapper } from '.';

describe('AppWrapper', () => {
  const props = {
    agentName: 'Matey Boy',
    agentServingCountry: 'United Kingdom',
    navigationLinks: [
      {
        badgeCount: 0,
        href: '/agent-support/interactions/123',
        icon: 'person',
        label: 'Mike Ly',
      },
    ],
    blockNavigationLinks: false,
    activeInteractionId: '123',
    dispatch: jest.fn(),
    hasSetCountryCode: true,
    homeUrl: '/agent-support/interactions/',
    isRooAcademyLinkAvailable: false,
    isProduction: true,
    rooAcademyDomain: 'roo-academy-domain.com',
    router: {
      query: {
        interactionId: '123',
      },
    },
    onChatRead: () => {},
    onCreateInteraction: () => {},
    onDeletingInteractions: () => {},
    trackSwitchedInteractionClick: () => {},
  };

  it('should render as expected', () => {
    const element = shallow(
      <AppWrapper {...props}>
        <div>App wrapper</div>
      </AppWrapper>,
    );

    expect(element).toMatchSnapshot();
    expect(element.find('Connect(AgentAppPreferences)').exists()).toEqual(true);
  });

  it('should render `delete interactions` button if isProduction is false', () => {
    const newProps = {
      ...props,
      isProduction: false,
    };

    const result = { label: 'Delete interactions', href: '#delete-interactions' };

    const element = shallow(
      <AppWrapper {...newProps}>
        <div>App wrapper</div>
      </AppWrapper>,
    );

    expect(element.prop('settingsLinks')[0]).toEqual(result);
  });

  it('should render the Roo Academy link if the flag is on', () => {
    const newProps = {
      ...props,
      isRooAcademyLinkAvailable: true,
    };

    const result = { label: 'Roo Academy', href: '#roo-academy' };

    const element = shallow(
      <AppWrapper {...newProps}>
        <div>App wrapper</div>
      </AppWrapper>,
    );

    expect(element.prop('settingsLinks')[0]).toEqual(result);
  });

  it('should not render the Roo Academy link if the flag is off', () => {
    const newProps = {
      ...props,
      isRooAcademyLinkAvailable: false,
    };

    const element = shallow(
      <AppWrapper {...newProps}>
        <div>App wrapper</div>
      </AppWrapper>,
    );

    const rooAcademyLink = { label: 'Roo Academy', href: '#roo-academy' };

    expect(element.prop('settingsLinks')).not.toEqual(
      expect.arrayContaining([expect.objectContaining(rooAcademyLink)]),
    );
  });

  describe('isError', () => {
    const newProps = {
      ...props,
      isError: true,
    };

    const element = shallow(
      <AppWrapper {...newProps}>
        <div>App wrapper</div>
      </AppWrapper>,
    );

    it('should not render AgentAppPreferences', () => {
      expect(element.find('Connect(AgentAppPreferences)').exists()).toEqual(false);
    });
    it('should not render feedback', () => {
      expect(element.prop('feedbackHref')).toEqual('');
      expect(element.prop('feedbackLabel')).toEqual('');
    });
    it('should not render userName', () => {
      expect(element.prop('userName')).toEqual(' ');
    });
    it('should not render navigationLinks', () => {
      expect(element.prop('navigationLinks')).toEqual([]);
    });
    it('should not render settingsLinks', () => {
      expect(element.prop('settingsLinks')).toEqual([]);
    });
  });
});
