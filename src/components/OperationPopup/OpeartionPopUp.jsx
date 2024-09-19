import { useEffect, useState } from "react";
import style from "./OperationPopUp.module.css";

const OperationPopUp = ({ setIsPopupVisible, isSucess }) => {
  const [exitAnimation, setExitAnimation] = useState(false);

  useEffect(() => {
    function handleClose() {
      setIsPopupVisible(false);
    }
    // Trigger unmount after a delay (e.g., 3 seconds)
    const timer = setTimeout(() => {
      setExitAnimation(true);
      setTimeout(handleClose, 300); // Wait for the exit animation to finish before closing
    }, 1000);

    return () => clearTimeout(timer);
  }, [setIsPopupVisible]);

  return (
    <div>
      <div
        className={`${style["popup"]} ${
          isSucess ? style["success-popup"] : style["failed-popup"]
        } ${exitAnimation ? style.exit : ""}`}
      >
        {isSucess ? <p>Successful!</p> : <p>Failed!</p>}
      </div>
    </div>
  );
};

export default OperationPopUp;
