import { render } from '@testing-library/react';

import DateView from './date-view';

describe('DateView', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<DateView />);
    expect(baseElement).toBeTruthy();
  });
});
