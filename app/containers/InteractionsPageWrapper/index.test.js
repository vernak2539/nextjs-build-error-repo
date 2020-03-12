import React from 'react';
import { shallow } from 'enzyme';

import InteractionsPageWrapper from '.';

describe('InteractionsPageWrapper container', () => {
  it('renders as expected', () => {
    const container = shallow(<InteractionsPageWrapper>Child</InteractionsPageWrapper>);
    expect(container).toMatchSnapshot();
  });
});
