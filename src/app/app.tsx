import { useEffect, useRef } from 'react';
import { useToggleFullscreen } from './fullscreen';
import { FeatureStopwatch } from '@flip-clock/feature/stopwatch';
import { FeatureTimer } from '@flip-clock/feature/timer';
import { UiClock } from '@flip-clock/ui/clock';
import { selectStateApp, useStateApp } from '@flip-clock/state/app';
import styles from './app.module.scss';

export function App() {
  const refRoot = useRef<HTMLDivElement>(null)
  const { toggleFullscreen } = useToggleFullscreen()
  const { scrollTop, onScroll } = useStateApp(selectStateApp)

  useEffect(() => {
    refRoot.current?.scrollTo(0, scrollTop)
  }, [])

  return (
    <div
      ref={refRoot}
      className={styles.root}
      onDoubleClick={toggleFullscreen}
      onScroll={onScroll}
    >
      <div className={styles.screen}>
        <UiClock />
      </div>
      <div className={styles.screen}>
        <FeatureStopwatch />
      </div>
      <div className={styles.screen}>
        <FeatureTimer />
      </div>
    </div>
  )
}

export default App;
