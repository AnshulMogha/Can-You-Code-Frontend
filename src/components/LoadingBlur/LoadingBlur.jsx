import style from "./LoadingBlur.module.css";
import logo from "/Images/logo.ico";
const LoadingBlur = function () {
  return (
    <div className={style["loading-container"]}>
      <div className={style["loading-animation"]}>
        <img src={logo} alt="" />
      </div>
    </div>
  );
};

export default LoadingBlur;
