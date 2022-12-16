import { useStateStopwatch } from '@flip-clock/state/stopwatch';
import { UiStopwatch } from '@flip-clock/ui/stopwatch';

/* eslint-disable-next-line */
export interface FeatureStopwatchProps {}

export function FeatureStopwatch(props: FeatureStopwatchProps) {
  const state = useStateStopwatch()
  return (
    <UiStopwatch {...state} />
  );
}

export default FeatureStopwatch;
