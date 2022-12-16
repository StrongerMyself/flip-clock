import { render } from '@testing-library/react';

import UiDigit from './ui-digit';

describe('UiDigit', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiDigit />);
    expect(baseElement).toBeTruthy();
  });
});
