/* eslint-disable react/prop-types */
import style from "./Btn.module.css";
const Btn = function ({ textProp, customClass }) {
  return <div className={`${customClass} ${style.btn} `}>{textProp}</div>;
};

export default Btn;
