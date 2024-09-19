import styles from "./OfflineIndicator.module.css";

const OfflineIndicator = () => {
  return (
    <div className={styles.offlineIndicator}>
      <div className={styles.offlineContent}>
        <h1>You are offline</h1>
        <p>Please check your internet connection.</p>
        <div className={styles.bouncingBall}></div>
      </div>
    </div>
  );
};

export default OfflineIndicator;
