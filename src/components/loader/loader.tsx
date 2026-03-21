import styles from "./styles.module.css";

type Props = {
  isError?: boolean;
  onRetry?: () => void;
};

export const FullscreenLoader = ({ isError, onRetry }: Props) => {
  return (
    <div className={styles.overlay}>
      {!isError ? (
        <div className={styles.ring} />
      ) : (
        <div className={styles.errorBlock}>
          <div className={styles.emoji}>😞</div>
          <div className={styles.errorText}>Не удалось загрузить данные</div>
          <button onClick={onRetry} className={styles.retry}>
            Повторить
          </button>
        </div>
      )}
    </div>
  );
};
