import { Link } from "react-router-dom";
import styles from "./NotFoundPage.module.css"; // Ensure to create this CSS module

const NotFoundPage = ({ errorMessage, userType }) => {
  const homeRoute = userType === "admin" ? "/admin" : "/";
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className={styles.title}>404</h1>
        <p className={styles.message}>{errorMessage}</p>
        <Link to={homeRoute} className={styles.link}>
          Go back to Home
        </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
