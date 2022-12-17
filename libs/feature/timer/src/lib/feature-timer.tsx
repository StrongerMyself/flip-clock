import { selectStateTimer, useStateTimer } from '@flip-clock/state/timer';
import { UiTimer } from '@flip-clock/ui/timer';
import { useEffect } from 'react';
import styles from './feature-timer.module.scss';

/* eslint-disable-next-line */
export interface FeatureTimerProps {}

export function FeatureTimer(props: FeatureTimerProps) {
  const state = useStateTimer(selectStateTimer)

  useEffect(state.loop, [])

  return (
    <UiTimer {...state} />
  );
}

export default FeatureTimer;
