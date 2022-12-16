import { UiDigit } from '@flip-clock/ui/digit';
import { useEffect } from 'react';
import styles from './ui-stopwatch.module.scss';

export interface UiStopwatchProps {
  status: 'stop' | 'play' | 'pause'
  current: number
  start: () => void
  pause: () => void
  stop: () => void
  toggle: () => void
}

export function UiStopwatch({
  status,
  current,
  start,
  pause,
  stop,
  toggle,
}: UiStopwatchProps) {

  const sec = Math.floor(current / 1000)
  const min = Math.floor(sec / 60)
  const hours = Math.floor(min / 60)

  return (
    <div className={styles.wrapper}>
      <div className={styles.timer} onClick={toggle}>
        <UiDigit number={hours} />
        <UiDigit number={min % 60} />
        <UiDigit number={sec % 60} />
      </div>
      <div className={styles.control}>
        {status === 'stop' && (
          <button onClick={start}>start</button>
        )}
        {status === 'play' && (
          <button onClick={pause}>pause</button>
        )}
        {status === 'pause' && (
          <button onClick={start}>play</button>
        )}
        {current > 0 && (
          <button onClick={stop}>stop</button>
        )}
        <div className={styles.ms}>{current % 1000}</div>
      </div>
    </div>
  )
}

export default UiStopwatch;
