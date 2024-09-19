/* eslint-disable react/prop-types */
import style from "./TutorialCard.module.css";
import Btn from "../Btn/Btn";
import { Link } from "react-router-dom";
const TutorialCard = function ({ tutorial }) {
  return (
    <div className={style["tut-card"]}>
      <h1>{tutorial.title}</h1>

      <p>{tutorial.description}</p>
      <Link
        to={`/${tutorial.title}`}
        style={{ textDecoration: "none" }}
        state={{ tutorialId: tutorial.id, userType: "user" }}
      >
        <Btn textProp={"Learn More"} customClass={style.button} />
      </Link>
    </div>
  );
};

export default TutorialCard;
