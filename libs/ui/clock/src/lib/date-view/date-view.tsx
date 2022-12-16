import styles from './date-view.module.scss';

export interface DateViewProps {
  date: Date
}

export function DateView({ date }: DateViewProps) {
  return (
    <div className={styles.root}>{date.toLocaleDateString('ru', { dateStyle: 'full' })}</div>
  );
}

export default DateView;
