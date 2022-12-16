import { useEffect, useState } from 'react';
import styles from './item.module.scss';

export interface ItemProps {
  number: number
}

export function Item({ number }: ItemProps) {
  const [current, setCurrent] = useState(number);
  const [next, setNext] = useState(number);

  useEffect(() => {
    const t = requestAnimationFrame(() => {
      setNext(number)
    });
    return () => cancelAnimationFrame(t)
  }, [number]);

  return (
    <div className={styles.root}>
      <div
        className={`${styles.part} ${styles.top}`}
      >{next.toString()}</div>
      <div
        className={`${styles.middle} ${number === next ? styles.flip : ''}`}
        onAnimationEnd={() => setCurrent(number)}
      >
        <div
          className={`${styles.part} ${styles.bottom} ${styles.back}`}
        >{next.toString()}</div>
        <div
          className={`${styles.part} ${styles.top} ${styles.front}`}
        >{current.toString()}</div>
      </div>
      <div
        className={`${styles.part} ${styles.bottom}`}
      >{current.toString()}</div>
    </div>
  );
}

export default Item;
