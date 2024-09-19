/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import style from "./TutorialModal.module.css";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import OperationPopUp from "../OperationPopup/OpeartionPopUp";
import { Link, useNavigate } from "react-router-dom";
import updateTutorial from "../../api/updateTutorial";
import createTutorial from "../../api/createTutorial";
const TutorialModel = function ({ setTutModelActive, modelType, tutorial }) {
  const [tutorialTitle, setTutorialTitle] = useState(tutorial.title || "");
  const [tutorialDesc, setTutorialDesc] = useState(tutorial.description || "");
  const [isPublic, setIsPublic] = useState(tutorial.active || false);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const IsOpSuccess = useRef(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const createMutation = useMutation({
    mutationFn: async (tutorialData) => {
      return createTutorial(tutorialData);
    },
    onSuccess: (data) => {
      navigate(`/admin/${data.data.tutorial.title}`, {
        state: {
          tutorialId: data.data.tutorial.id,
          userType: "admin",
        },
      });
    },
    onError: () => {
      console.log("error");
    },
  });
  const updateMutation = useMutation({
    mutationFn: (tutorialData) => {
      return updateTutorial(tutorialData, tutorial.id);
    },
    onSuccess: () => {
      IsOpSuccess.current = true;
      setIsPopupVisible(true); // Hide popup after 3 seconds
      queryClient.invalidateQueries({
        queryKey: ["adminTutorials"],
        exact: true,
      });

      setTimeout(() => {
        setTutModelActive(false);
      }, 1000);
    },
    onError: () => {
      IsOpSuccess.current = true;
      setIsPopupVisible(true);
    },
  });
  function handleCreateUpdateClick() {
    if (modelType === "edit")
      updateMutation.mutate({
        title: tutorialTitle,
        description: tutorialDesc,
        active: isPublic,
      });
    else
      createMutation.mutate({
        title: tutorialTitle,
        description: tutorialDesc,
        active: isPublic,
      });
  }
  return (
    //edit new
    <div
      className={style.wrapper}
      onClick={() => {
        setTutModelActive(false);
      }}
    >
      {isPopupVisible && (
        <OperationPopUp
          setIsPopupVisible={setIsPopupVisible}
          isSucess={IsOpSuccess.current}
        />
      )}
      <div
        className={style.main}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <div
          className={style["cancel-btn"]}
          onClick={() => {
            setTutModelActive(false);
          }}
        >
          <img src="./Images/cross.png" alt="edit icon" />
        </div>
        <div>
          <label>Tutorial Title:</label>
          <InputField
            tutorialTitle={tutorialTitle}
            setTutorialTitle={setTutorialTitle}
          />
          <div className={style.checkBox}>
            <label htmlFor="Public">Public:</label>
            <input
              type="checkbox"
              name="Public"
              id="Public"
              checked={isPublic}
              onChange={() => {
                setIsPublic(!isPublic);
              }}
            />
          </div>
          <div className={style["overview"]}>
            <textarea
              name="overview"
              placeholder="Write an overview here"
              value={tutorialDesc}
              onChange={(e) => {
                setTutorialDesc(e.target.value);
              }}
            ></textarea>
          </div>
          <div>
            {modelType === "edit" ? (
              <Link
                to={`/admin/${tutorial.title}`}
                style={{ textDecoration: "none" }}
                state={{ tutorialId: tutorial.id, userType: "admin" }}
              >
                <button type="button" className={style["edit-top-btn"]}>
                  Edit Topics
                </button>
              </Link>
            ) : (
              ""
            )}
            <button
              type="button"
              className={style["submit-btn"]}
              onClick={handleCreateUpdateClick}
            >
              {modelType === "edit" ? "Update" : "Create"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const InputField = function ({ tutorialTitle, setTutorialTitle }) {
  const [isDisabled, setIsDisabled] = useState(true);
  return (
    <div className={`${style.inputfield} ${!isDisabled ? style["focus"] : ""}`}>
      <input
        type="text"
        name="title"
        id="title"
        value={tutorialTitle}
        disabled={isDisabled}
        onChange={(e) => {
          setTutorialTitle(e.target.value);
        }}
      />
      <span
        onClick={() => {
          setIsDisabled(false);
        }}
      >
        <img src="./Images/edit.png" alt="edit icon" />
      </span>
    </div>
  );
};
export default TutorialModel;
