import { render } from '@testing-library/react';

import FeatureStopwatch from './feature-stopwatch';

describe('FeatureStopwatch', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<FeatureStopwatch />);
    expect(baseElement).toBeTruthy();
  });
});
