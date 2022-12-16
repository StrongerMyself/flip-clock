import { UiDigit } from '@flip-clock/ui/digit';
import { useEffect, useRef, useState } from 'react';
import styles from './ui-stopwatch.module.scss';

/* eslint-disable-next-line */
export interface UiStopwatchProps { }

export function UiStopwatch(props: UiStopwatchProps) {
  const [status, setStatus] = useState('stop')
  const [startDate, setStartDate] = useState(0)
  const [date, setDate] = useState(0)
  const refTimer = useRef<number>(0)

  const onTimer = () => {
    if (status === 'play') {
      refTimer.current = requestAnimationFrame(() => {
        const d = Date.now()
        setDate(d - startDate)
        onTimer()
      })
    }
  }

  useEffect(() => {
    onTimer()
    return () => cancelAnimationFrame(refTimer.current)
  }, [status])

  const onPlay = () => {
    const d = Date.now()
    setStartDate(d - date)
    setStatus('play')
  }

  const onPause = () => {
    setStatus('pause')
    window.clearTimeout(refTimer.current)
  }

  const onReset = () => {
    setStartDate(0)
    setDate(0)
    setStatus('stop')
    window.clearTimeout(refTimer.current)
  }

  const onClickTimer = () => {
    if (status === 'play') {
      onPause()
    } else {
      onPlay()
    }
  }

  const sec = Math.floor(date / 1000)
  const min = Math.floor(sec / 60)
  const hours = Math.floor(min / 60)

  return (
    <div className={styles.wrapper}>
      <div className={styles.timer} onClick={onClickTimer}>
        <UiDigit number={hours} />
        <UiDigit number={min % 60} />
        <UiDigit number={sec % 60} />
      </div>
      <div className={styles.control}>
        {status === 'stop' && (
          <button onClick={onPlay}>start</button>
        )}
        {status === 'play' && (
          <button onClick={onPause}>pause</button>
        )}
        {status === 'pause' && (
          <button onClick={onPlay}>play</button>
        )}
        {date > 0 && (
          <button onClick={onReset}>reset</button>
        )}
        <div className={styles.ms}>{date % 1000}</div>
      </div>
    </div>
  )
}

export default UiStopwatch;
