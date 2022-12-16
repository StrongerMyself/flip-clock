import { render } from '@testing-library/react';

import UiStopwatch from './ui-stopwatch';

describe('UiStopwatch', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiStopwatch />);
    expect(baseElement).toBeTruthy();
  });
});
