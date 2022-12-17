import { useEffect, useRef, useState } from 'react';
import { useToggleFullscreen } from './fullscreen';
import { FeatureStopwatch } from '@flip-clock/feature/stopwatch';
import { FeatureTimer } from '@flip-clock/feature/timer';
import { UiClock } from '@flip-clock/ui/clock';
import { selectStateApp, useStateApp } from '@flip-clock/state/app';
import { UiNavigateSlide } from '@flip-clock/ui/navigate-slide';
import styles from './app.module.scss';

export function App() {
  const refRoot = useRef<HTMLDivElement>(null);
  const { toggleFullscreen } = useToggleFullscreen();
  const { slide, setSlide } = useStateApp(selectStateApp);
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    scrollToSlide(slide, false);
  }, []);

  useEffect(() => {
    if (!visible) return
    const t = setTimeout(() => {
      setVisible(false)
    }, 3000);
    return () => clearTimeout(t)
  }, [visible])

  const onScroll = (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
    const elem = event.currentTarget;
    const { scrollTop, clientHeight } = elem;
    const scrollMiddle = scrollTop + clientHeight / 2;
    const slide = Math.floor(scrollMiddle / clientHeight);
    setSlide(slide);
    setVisible(true);
  };

  const onClickScreen = (event: React.UIEvent<HTMLDivElement, UIEvent>) => {
    if (event.currentTarget === event.target) {
      setVisible(true);
    }
  }

  const scrollToSlide = (toSlide: number, isSmooth = true) => {
    if (refRoot.current) {
      const scrollTop = toSlide * refRoot.current.clientHeight;
      refRoot.current.scrollTo({
        top: scrollTop,
        behavior: isSmooth ? 'smooth' : 'auto',
      });
    }
  };

  return (
    <div
      ref={refRoot}
      className={styles.root}
      onDoubleClick={toggleFullscreen}
      onScroll={onScroll}
    >
      <div className={styles.dots}>
        <UiNavigateSlide
          visible={visible}
          active={slide}
          setActive={scrollToSlide}
          length={3}
        />
      </div>
      <div className={styles.screen} onClick={onClickScreen}>
        <UiClock />
      </div>
      <div className={styles.screen} onClick={onClickScreen}>
        <FeatureStopwatch />
      </div>
      <div className={styles.screen} onClick={onClickScreen}>
        <FeatureTimer />
      </div>
    </div>
  );
}

export default App;
