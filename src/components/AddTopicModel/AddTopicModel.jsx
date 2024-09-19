/* eslint-disable react/prop-types */
import { useMutation, useQueryClient } from "@tanstack/react-query";
import style from "./AddTopicModel.module.css";
import { useRef, useState } from "react";
import OperationPopUp from "../OperationPopup/OpeartionPopUp";
import addTopic from "../../api/addTopic";

const AddTopicModel = function ({
  setIsModelActive,
  tutorialId,
  setActiveTopic,
  numOfTopic,
}) {
  const queryClient = useQueryClient();
  const [topicTitle, setTopicTitle] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const isOpSuccess = useRef(false);
  const mutation = useMutation({
    mutationFn: async (topic) => {
      await addTopic(tutorialId, topic);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tutorial", tutorialId],
        exact: true,
      });
      isOpSuccess.current = true;
      setIsPopupVisible(true); // Hide popup after 3 seconds
      setTimeout(() => setIsModelActive(false), 1000);
      setActiveTopic(numOfTopic);
    },
    onError: () => {
      isOpSuccess.current = false;
      setIsPopupVisible(true);
    },
  });
  function handleClick() {
    setIsModelActive(false);
  }
  function handleCreateClick() {
    mutation.mutate({ title: topicTitle, description: "" });
  }
  return (
    <div className={style["add-topic-model"]} onClick={handleClick}>
      {isPopupVisible && (
        <OperationPopUp
          setIsPopupVisible={setIsPopupVisible}
          isSucess={isOpSuccess.current}
        />
      )}
      <div
        className={style["add-topic-model-main"]}
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <label htmlFor="topicTitle">Topic Title :</label>
        <input
          type="text"
          id="topicTitle"
          value={topicTitle}
          onChange={(e) => {
            setTopicTitle(e.target.value);
          }}
        />
        <div className={style["create-btn"]} onClick={handleCreateClick}>
          Create
        </div>
      </div>
    </div>
  );
};
export default AddTopicModel;
