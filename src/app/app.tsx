import { useLayoutEffect, useRef } from 'react';
import { useToggleFullscreen } from './fullscreen';
import { UiClock } from '@flip-clock/ui/clock';
import styles from './app.module.scss';

export function App() {
  const refRoot = useRef<HTMLDivElement>(null)
  const { toggleFullscreen } = useToggleFullscreen()

  useLayoutEffect(() => {
    refRoot.current?.scrollTo(0, refRoot.current.clientHeight * 0)
  }, [])

  return (
    <div
      ref={refRoot}
      className={styles.root}
      onDoubleClick={toggleFullscreen}
    >
      <div className={styles.screen}>
        <UiClock />
      </div>
      {/* <div className={styles.screen}>
        <Stopwatch />
      </div>
      <div className={styles.screen}>
        <Timer />
      </div> */}
    </div>
  )
}

export default App;
