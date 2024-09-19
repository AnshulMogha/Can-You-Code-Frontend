/* eslint-disable react/prop-types */
// importing resources
import { useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import SearchBar from "../../components/Searchbar/SearchBar";
import TutorialCard from "../../components/TutorialCard/TutorialCard";
import Footer from "../../components/Footer/Footer";
import style from "./Home.module.css";

//Home Component (Parent)
const Home = function () {
  //States
  const [searchTerm, setSearchTerm] = useState("");
  //Importing tutorials from ContentLayout
  const tutorials = useOutletContext();
  //Filtering tutorial when search term is enter
  const filteredTutorials = tutorials.filter((tutorial) =>
    tutorial.title.toLowerCase().startsWith(searchTerm.toLowerCase())
  );
  // Jsx of this componenet
  return (
    <div className={style["home-page"]}>
      <div className={style["home-top-con"]}>
        <div className={style["top-con-content"]}>
          <div>Can You Code</div>
          <p className="mainWebText">
            Explore our exiciting and beginner-friendly tutorials for free
          </p>
        </div>
        <div className={style["searchbar-con"]}>
          <SearchBar
            bgInputColor="white"
            color="black"
            setSearchTerm={setSearchTerm}
            userType="user"
            searchTerm={searchTerm}
          />
          {searchTerm && (
            <div className={style["search-res-con"]}>
              {filteredTutorials.map((tutorial) => (
                <SearchedItems tutorial={tutorial} key={tutorial.id} />
              ))}
            </div>
          )}
        </div>
      </div>
      <div id="tutorials" className={style["home-tut-con"]}>
        <div className={style["tut-con-heading"]}>
          <h1>Our Tutorials</h1>
        </div>
        <div>
          {tutorials.map((tutorial) => (
            <TutorialCard tutorial={tutorial} key={tutorial.id} />
          ))}
        </div>
      </div>
      <div>
        <Footer></Footer>
      </div>
    </div>
  );
};
//child component
function SearchedItems({ tutorial }) {
  return (
    <div className={style["searched-items"]}>
      <Link
        to={`/${tutorial.title}`}
        style={{ textDecoration: "none" }}
        state={{ tutorialId: tutorial.id, userType: "user" }}
      >
        <div>{tutorial.title}</div>
      </Link>
    </div>
  );
}

export default Home;
