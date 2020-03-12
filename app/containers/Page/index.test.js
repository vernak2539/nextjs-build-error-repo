import React from 'react';
import { shallow } from 'enzyme';

import Page from '.';

describe('Page container', () => {
  it('renders as expected', () => {
    const container = shallow(<Page>Child</Page>);
    expect(container).toMatchSnapshot();
  });
});
