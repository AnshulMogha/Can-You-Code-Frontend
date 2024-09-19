/* eslint-disable react/prop-types */
import style from "./AdminDashboard.module.css";
import Navbar from "../../components/Navbar/Navbar";
import SearchBar from "../../components/Searchbar/SearchBar";
import TutorialModel from "../../components/TutorialModal/TutorialModal";
import { useState, useRef } from "react";
import editImg from "/Images/edit.png";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import deleteTutorial from "../../api/deleteTutorial";
import logout from "../../api/logout";
import { useOutletContext } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
const AdminDashboard = function () {
  const queryClient = useQueryClient();
  const clickTutorial = useRef();
  const [isTutModelActive, setTutModelActive] = useState(false);
  const [isDeleteModelActive, setDeleteModelActive] = useState(false);
  const [modelType, setModelType] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // Track search input
  function activateEditModel() {
    setModelType("edit");
    setTutModelActive(true);
  }

  function activateCreateModal() {
    setModelType("new");
    setTutModelActive(true);
  }

  async function handleLogout() {
    try {
      await logout();
      queryClient.invalidateQueries({
        queryKey: ["userAuthStatus"],
        exact: true,
      });
    } catch (e) {
      console.log("Error in logout", e);
    }
  }

  // const query = useTutorials(true);

  const tutorials = useOutletContext();
  // Filter tutorials based on search input
  const filteredTutorials = tutorials.filter((tutorial) =>
    tutorial.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={style["admin-dashboard"]}>
      {isDeleteModelActive && (
        <DeleteModal
          setModalActive={setDeleteModelActive}
          entity={filteredTutorials[clickTutorial.current]}
          entityType={"tutorial"}
          deleteFn={deleteTutorial}
          queryKey={["adminTutorials"]}
        />
      )}

      {isTutModelActive && (
        <TutorialModel
          setTutModelActive={setTutModelActive}
          modelType={modelType}
          tutorial={
            clickTutorial.current >= 0
              ? filteredTutorials[clickTutorial.current]
              : {}
          }
        />
      )}

      <Navbar tutorials={tutorials} userType="admin" />

      <div className={style["dash-main-con"]}>
        <div className={style["searchbar-con"]}>
          <SearchBar
            setSearchTerm={setSearchTerm}
            userType={"admin"}
            searchTerm={searchTerm}
          />{" "}
          {/* Pass setSearchTerm */}
        </div>

        <div className={style["admin-tut-con"]}>
          {filteredTutorials.map((tutorial, i) => (
            <TutorialNameCard
              key={tutorial.id}
              activateModal={activateEditModel}
              ind={i}
              clickTutorial={clickTutorial}
              activeStatus={tutorial.active}
              setDeleteModelActive={setDeleteModelActive}
            >
              {tutorial.title}
            </TutorialNameCard>
          ))}

          <TutorialNameCard
            customStyles={{ padding: "1rem .5rem .5rem", cursor: "pointer" }}
            activateModal={activateCreateModal}
            ind={-1}
            clickTutorial={clickTutorial}
          >
            <img src="/Images/add.png" alt="" style={{ height: "5.8rem" }} />
          </TutorialNameCard>
        </div>
      </div>

      <div className={style["logout-btn"]} onClick={handleLogout}>
        Logout
      </div>
    </div>
  );
};

function TutorialNameCard({
  customStyles,
  children,
  activateModal,
  clickTutorial,
  ind,
  activeStatus,
  setDeleteModelActive,
}) {
  function handleClick() {
    activateModal();
  }

  return (
    <div
      className={style["tut-name-card"]}
      style={customStyles}
      onMouseEnter={() => {
        clickTutorial.current = ind;
      }}
      onClick={ind == -1 ? handleClick : null}
    >
      {ind > -1 && (
        <>
          <div
            className={`${style["status-indicator"]} ${
              activeStatus && style["status-indicator-active"]
            }`}
          ></div>
          <div className={style["tut-edit-btn"]} onClick={handleClick}>
            Edit | <img src={editImg} alt="" />
          </div>
          <div
            className={style["tut-del-btn"]}
            onClick={() => {
              setDeleteModelActive(true);
            }}
          >
            Delete
          </div>
        </>
      )}
      <div>{children}</div>
    </div>
  );
}

export default AdminDashboard;
