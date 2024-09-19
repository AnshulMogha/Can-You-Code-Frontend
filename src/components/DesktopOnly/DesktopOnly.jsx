import styles from "./DesktopOnly.module.css";

const DesktopOnly = () => {
  return (
    <div className={`${styles.container} mainWebText`}>
      <div className={styles.messageBox}>
        <h1 className={styles.title}>Desktop Only</h1>
        <p className={styles.description}>
          For the best experience, please access this page on a desktop device.
          Mobile support is currently unavailable.
        </p>
      </div>
    </div>
  );
};

export default DesktopOnly;
