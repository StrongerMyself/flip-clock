import { render } from '@testing-library/react';

import UiClock from './ui-clock';

describe('UiClock', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiClock />);
    expect(baseElement).toBeTruthy();
  });
});
