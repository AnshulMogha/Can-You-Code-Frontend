import style from "./LoadingScreen.module.css"; // Make sure to import the CSS file
import iconImg from "/Images/logo.ico";
const LoadingScreen = () => {
  return (
    <div className={`${style["loading-screen"]} mainWebText`}>
      <div className={style["loading-spinner"]}>
        <img src={iconImg} alt="" className={style["icon-img"]} />
      </div>
      <div className={style["loading-icon"]}>
        {"  "}
        Loading{" "}
        <span className={`${style["dot"]} ${style["dot-first"]}`}></span>
        <span className={`${style["dot"]} ${style["dot-second"]}`}></span>
        <span className={`${style["dot"]} ${style["dot-third"]}`}></span>
      </div>
    </div>
  );
};

export default LoadingScreen;
