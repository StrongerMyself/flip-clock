import { useStateStopwatch } from '@flip-clock/state/stopwatch';
import { UiStopwatch } from '@flip-clock/ui/stopwatch';
import { useEffect } from 'react';

/* eslint-disable-next-line */
export interface FeatureStopwatchProps {}

export function FeatureStopwatch(props: FeatureStopwatchProps) {
  const state = useStateStopwatch()

  useEffect(() => {
    if (state.status === 'play') {
      state.start()
    }
  }, [])

  return (
    <UiStopwatch {...state} />
  );
}

export default FeatureStopwatch;
