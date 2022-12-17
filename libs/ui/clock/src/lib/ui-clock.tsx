import { UiDigit } from '@flip-clock/ui/digit';
import { useEffect, useRef, useState } from 'react';
// import DateView from './date-view/date-view';
import styles from './ui-clock.module.scss';

export interface UiClockProps {
  hideSecond?: boolean
}

export function UiClock({ hideSecond = false }: UiClockProps) {
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
      <div className={`${styles.timer} ${hideSecond ? styles.hideSecond : ''}`}>
        <UiDigit number={date.getHours()}/>
        <UiDigit number={date.getMinutes()}/>
        {!hideSecond && (
          <UiDigit number={date.getSeconds()}/>
        )}
      </div>
    </div>
  )
}

export default UiClock;

