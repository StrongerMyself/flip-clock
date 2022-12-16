import Item from './item/item';
import styles from './ui-digit.module.scss';

export interface UiDigitProps {
  number: number
}

export function UiDigit({ number }: UiDigitProps) {
  const [n1, n2] = ('0' + number).slice(-2).split('').map(Number)
  return (
    <div className={styles.root}>
      <Item number={n1} key="n1" />
      <Item number={n2} key="n2" />
    </div>
  );
}

export default UiDigit;
