import { render } from '@testing-library/react';

import UiTimer from './ui-timer';

describe('UiTimer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiTimer />);
    expect(baseElement).toBeTruthy();
  });
});
