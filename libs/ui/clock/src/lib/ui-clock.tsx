import { UiDigit } from '@flip-clock/ui/digit';
import { useEffect, useRef, useState } from 'react';
// import DateView from './date-view/date-view';
import styles from './ui-clock.module.scss';

/* eslint-disable-next-line */
export interface UiClockProps {}

export function UiClock(props: UiClockProps) {
  const [date, setDate] = useState(() => new Date())
  const refTimer = useRef<number>()

  const onTimer = () => {
    refTimer.current = window.setTimeout(() => {
      setDate(new Date())
      onTimer()
    }, 500)
  }

  useEffect(() => {
    onTimer()
    return () => {
      window.clearTimeout(refTimer.current)
    }
  }, [])

  return (
    <div className={styles.wrapper}>
      {/* <DateView date={date} />  */}
      <div className={styles.timer}>
        <UiDigit number={date.getHours()}/>
        <UiDigit number={date.getMinutes()}/>
        <UiDigit number={date.getSeconds()}/>
      </div>
    </div>
  )
}

export default UiClock;

