import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={`${styles.footer} mainWebText`}>
      <div className={styles.container}>
        <div className={styles.links}>
          <a href="#top" className={styles.link}>
            Back to Top
          </a>
          <a href="#tutorials" className={styles.link}>
            Tutorials
          </a>
        </div>

        <div className={styles.contactForm}>
          <h3>Contact Us</h3>
          <form>
            <input type="text" name="name" placeholder="Your Name" required />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              required
            />
            <textarea
              name="message"
              rows="4"
              placeholder="Your Message"
              required
            ></textarea>
            <button type="submit">Send</button>
          </form>
        </div>

        <div className={styles.developer}>
          <h4>Developer Info</h4>
          <p>Developed by: Anshul</p>
          <p>Email: anshulmogha3000@gmail.com</p>
        </div>

        <div className={styles.copy}>
          &copy; {new Date().getFullYear()} Can You Code. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
