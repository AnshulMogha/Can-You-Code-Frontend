/* eslint-disable react/prop-types */
import style from "./DeleteModal.module.css";
import { useRef, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import OperationPopUp from "../OperationPopup/OpeartionPopUp";

const DeleteModal = function ({
  setModalActive,
  entity,
  entityType, // "tutorial" or "topic"
  deleteFn,
  queryKey,
  tutorialId, // Only required for topics
}) {
  const [titleInput, setTitleInput] = useState("");
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const queryClient = useQueryClient();
  const isOpSuccess = useRef(false);
  const deleteMutation = useMutation({
    mutationFn: () => {
      if (entityType === "topic") {
        return deleteFn(tutorialId, entity._id);
      } else {
        return deleteFn(entity.id);
      }
    },
    onSuccess: () => {
      isOpSuccess.current = true;
      setIsPopupVisible(true);
      setTimeout(() => {
        setModalActive(false);
        queryClient.invalidateQueries({
          queryKey,
          exact: true,
        });
      }, 1000);
    },
    onError: () => {
      isOpSuccess.current = false;
      setIsPopupVisible(true);
    },
  });

  return (
    <div className={style["del-modal"]} onClick={() => setModalActive(false)}>
      {isPopupVisible && (
        <OperationPopUp
          setIsPopupVisible={setIsPopupVisible}
          isSucess={isOpSuccess.current}
        />
      )}
      <div
        className={style["del-modal-main"]}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={style["input-field"]}>
          <label>
            Type{" "}
            <q>
              <span>{entity.title}</span>
            </q>{" "}
            to confirm and press delete
          </label>
          <input
            type="text"
            value={titleInput}
            onChange={(e) => setTitleInput(e.target.value)}
          />
        </div>
        <div className={style["btn-container"]}>
          <div
            className={style["cancel-btn"]}
            onClick={() => setModalActive(false)}
          >
            Cancel
          </div>
          <button
            className={`${style["delete-btn"]} ${
              entity.title === titleInput ? style["delete-btn-enabled"] : ""
            }`}
            disabled={entity.title !== titleInput}
            onClick={() => deleteMutation.mutate()}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
