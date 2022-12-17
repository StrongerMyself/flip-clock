import { UiDigit } from '@flip-clock/ui/digit';
import styles from './ui-timer.module.scss';

export interface UiTimerProps {
  status: "play" | "pause" | "stop" | "final";
  current: number;
  duration: number;
  setDuration: (duration: number) => void;
  play: () => void;
  pause: () => void;
  reset: () => void;
  toggle: () => void;
  loop: () => void;
}

export function UiTimer({
  status,
  current,
  duration,
  setDuration,
  play,
  pause,
  reset,
  toggle,
}: UiTimerProps) {

  const sec = Math.floor(current / 1000)
  const min = Math.floor(sec / 60)
  const hours = Math.floor(min / 60)

  return (
    <div className={styles.wrapper}>
      <div className={styles.timer} onClick={toggle}>
        <UiDigit number={hours}/>
        <UiDigit number={min % 60}/>
        <UiDigit number={sec % 60}/>
      </div>
      <div className={styles.control}>
        <div
          className={styles.target}
        >target: {timeToString(duration)}</div>
        {status === 'stop' && (
          <button onClick={play}>start</button>
        )}
        {status === 'play' && (
          <button onClick={pause}>pause</button>
        )}
        {status === 'pause' && (
          <button onClick={play}>play</button>
        )}
        {status === 'pause' && (
          <button onClick={reset}>reset</button>
        )}
        {status === 'final' ? (
          <>
            <button onClick={reset}>reset</button>
            <div className={styles.final}>finished!</div>
          </>
        ) : (
          <div className={styles.ms}>{current % 1000}</div>
        )}
      </div>
    </div>
  )
}

export default UiTimer;

const timeToString = (ms: number) => {
  const s = Math.floor(ms / 1000)
  const m = Math.floor(s / 60)
  const h = Math.floor(m / 60)
  return [h, m, s].map(item => ('0' + item).slice(-2)).join(':')
}

const timeToNumber = (value: string) => {
  // eslint-disable-next-line prefer-const
  let [h, m, s] = value.split(':').map(Number)
  m += h * 60
  s += m * 60
  const ms = s * 1000
  return ms
}
