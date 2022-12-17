import styles from './ui-navigate-slide.module.scss';

export interface UiNavigateSlideProps {
  visible: boolean; 
  active: number;
  setActive: (value: number) => void;
  length: number;
}

export function UiNavigateSlide({
  visible,
  active,
  setActive,
  length,
}: UiNavigateSlideProps) {
  const items = Array.from({ length });
  return (
    <div className={styles.root} data-visible={visible}>
      {items.map((_, i) => (
        <div
          key={i}
          className={styles.item}
          data-active={active === i}
          onClick={() => setActive(i)}
        />
      ))}
    </div>
  );
}

export default UiNavigateSlide;
