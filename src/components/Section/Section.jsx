/* eslint-disable react/prop-types */
import QuillEditor from "../../utils/QuillEditor";
import style from "./Section.module.css";
// import Btn from "../Btn/Btn";
import editLogo from "/Images/edit.png";
import { useRef, useState, useEffect } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import OperationPopUp from "../OperationPopup/OpeartionPopUp";
import updateTopic from "../../api/updateTopic";

// eslint-disable-next-line react/prop-types
const Section = function ({ type, topic, topicInfo, tutorialId }) {
  const quillRef = useRef();
  const [topicTitle, setTopicTitle] = useState(topic.title);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const queryClient = useQueryClient();
  const IsOpSuccess = useRef(false);

  useEffect(() => {
    setTopicTitle(topic.title);
  }, [topic.title]);

  const updateTopicMutation = useMutation({
    mutationFn: (topicData) => {
      return updateTopic(topicData, tutorialId, topic._id);
    },
    onSuccess: () => {
      IsOpSuccess.current = true;
      setIsPopupVisible(true); // Hide popup after 3 seconds
      queryClient.invalidateQueries({
        queryKey: ["tutorial", tutorialId],
        exact: true,
      });
    },
    onError: () => {
      IsOpSuccess.current = false;
      setIsPopupVisible(true);
    },
  });
  function handleSaveClick() {
    console.log("btn clicked");
    const description = JSON.stringify(quillRef.current.getContents());
    updateTopicMutation.mutate({ title: topicTitle, description });
  }
  return (
    <div className={style["section"]}>
      {isPopupVisible && (
        <OperationPopUp
          setIsPopupVisible={setIsPopupVisible}
          isSucess={IsOpSuccess.current}
        />
      )}
      <div className={style["section-main"]}>
        {type === "admin" ? (
          <InputField topicTitle={topicTitle} setTopicTitle={setTopicTitle} />
        ) : (
          <TuorialSectionTop topicTitle={topicTitle} topicInfo={topicInfo} />
        )}
        <div className={style["text-editor"]}>
          <QuillEditor
            type={type}
            topicDes={topic.description}
            quillRefParent={quillRef}
          />
        </div>
      </div>
      {type === "admin" ? (
        <SaveBtn handleSaveClick={handleSaveClick} />
      ) : (
        <NavigationBtn topicInfo={topicInfo} />
      )}
    </div>
  );
};
const TuorialSectionTop = function ({ topicTitle, topicInfo }) {
  return (
    <div className={style["section-top"]}>
      <NavigationBtn topicInfo={topicInfo} />
      <h1>{topicTitle}</h1>
    </div>
  );
};
const NavigationBtn = function ({ topicInfo }) {
  const { activeTopic, numOfTopics, setActiveTopic } = topicInfo;
  function handlePrevious() {
    activeTopic > 0 ? setActiveTopic((state) => --state) : null;
  }
  function handleNext() {
    activeTopic < numOfTopics - 1 ? setActiveTopic((state) => ++state) : null;
  }
  return (
    <div className={style["navigation-btn"]}>
      <div className={style["section-btn"]} onClick={handlePrevious}>
        ← Previous
      </div>
      <div className={style["section-btn"]} onClick={handleNext}>
        Next →
      </div>
    </div>
  );
};
const InputField = function ({ topicTitle, setTopicTitle }) {
  const [isDisabled, setIsDisabled] = useState(true);
  function handleEditClick() {
    setIsDisabled(false);
  }
  return (
    <div className={style.inputfield}>
      <label>Topic Title:</label>
      <input
        type="text"
        name="title"
        id="title"
        disabled={isDisabled}
        value={topicTitle}
        onChange={(e) => {
          setTopicTitle(e.target.value);
        }}
        className={!isDisabled ? style.focus : ""}
      />
      <span>
        <img src={editLogo} alt="edit icon" onClick={handleEditClick} />
      </span>
    </div>
  );
};
const SaveBtn = function ({ handleSaveClick }) {
  return (
    <div className={style["save-btn"]} onClick={handleSaveClick}>
      Save
    </div>
  );
};
export default Section;
