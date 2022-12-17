import { render } from '@testing-library/react';

import UiNavigateSlide from './ui-navigate-slide';

describe('UiNavigateSlide', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<UiNavigateSlide />);
    expect(baseElement).toBeTruthy();
  });
});
