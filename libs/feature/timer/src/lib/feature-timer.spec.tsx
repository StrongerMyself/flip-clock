import { render } from '@testing-library/react';

import FeatureTimer from './feature-timer';

describe('FeatureTimer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FeatureTimer />);
    expect(baseElement).toBeTruthy();
  });
});
