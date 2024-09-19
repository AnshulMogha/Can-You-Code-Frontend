/* eslint-disable react/prop-types */
import style from "./Navbar.module.css";
import Btn from "../Btn/Btn";
import logo from "/Images/logo.ico";
import { Link, useLocation } from "react-router-dom";
const Navbar = function ({ tutorials, userType }) {
  const location = useLocation();
  const { pathname } = location;

  const activeTutorial = pathname.replace(/^\/admin\//, "").replace(/^\//, "");
  return (
    <div className={`${style.navbar} mainWebText`}>
      <Logo />
      <ul>
        {tutorials.map((tutorial) => (
          <ListItem
            tutorial={tutorial}
            key={tutorial.id}
            userType={userType}
            activeTutorial={activeTutorial}
          />
        ))}
      </ul>
    </div>
  );
};
function ListItem({ tutorial, userType, activeTutorial }) {
  return (
    <li>
      <Link
        to={`${userType === "admin" ? "/admin" : ""}/${tutorial.title}`}
        style={{ textDecoration: "none" }}
        state={{ tutorialId: tutorial.id, userType }}
      >
        <Btn
          textProp={tutorial.title}
          customClass={
            activeTutorial === tutorial.title ? style["active-tut"] : ""
          }
        />
      </Link>
    </li>
  );
}
function Logo() {
  return (
    <div className={style["navbar-logo"]}>
      <img src={logo} alt="Logo" />
    </div>
  );
}

export default Navbar;
