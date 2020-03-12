import React from 'react';
import { shallow } from 'enzyme';

import { AgentPreferences } from '.';

describe('AgentPreferences', () => {
  const props = {
    countries: {
      au: 'Australia',
      de: 'Germany',
      es: 'Spain',
      fr: 'France',
      uk: 'United Kingdom',
    },
    countryCode: 'uk',
    onModalClose: () => {},
    onUpdateConfig: (config) => config,
    languages: {
      de: 'Deutsch',
      en: 'English',
      es: 'Español',
      fr: 'Français',
    },
    preferredLanguage: 'en',
    isOpen: false,
    onClose: () => {},
    onSubmit: () => {},
  };

  it('should render as expected', () => {
    const element = shallow(<AgentPreferences {...props} />);

    expect(element).toMatchSnapshot();
  });
});
