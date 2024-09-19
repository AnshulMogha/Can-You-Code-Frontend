/* eslint-disable react/prop-types */
import { useParams } from "react-router-dom";
import style from "./Sidebar.module.css";
import deleteIco from "/Images/delete.png";
export default function SideBar({
  topics,
  type,
  activeTopic,
  setActiveTopic,
  setIsModelActive,
  setDeleteModelActive,
  isSidebarOpen,
  toggleSidebar,
}) {
  const { tutTitle } = useParams();
  function handleHideBtnClick() {
    toggleSidebar(!isSidebarOpen);
  }
  return (
    <div className={style.sidebar}>
      <div className={style["sidebar-top"]}>
        {isSidebarOpen && type !== "admin" && (
          <div
            className={style["sidebar-hide-btn"]}
            onClick={handleHideBtnClick}
          >
            {"<="}
          </div>
        )}
        <h1>{tutTitle}</h1>
      </div>
      {type === "admin" ? (
        <AddTopicBtn setIsModelActive={setIsModelActive} />
      ) : (
        ""
      )}
      {topics.map((topic, index) => (
        <SideBarItem
          index={index}
          title={topic.title}
          key={topic._id}
          activeTopic={activeTopic}
          setActiveTopic={setActiveTopic}
          userType={type}
          setDeleteModelActive={setDeleteModelActive}
        />
      ))}
    </div>
  );
}
function SideBarItem({
  title,
  activeTopic,
  setActiveTopic,
  index,
  userType,
  setDeleteModelActive,
}) {
  const isActive = index === activeTopic ? true : false;
  function handleClick() {
    setActiveTopic(index);
  }
  return (
    <div className={style["sidebar-item"]} onClick={handleClick}>
      <div
        title={title}
        className={isActive ? style["sidebar-item-active"] : ""}
      >
        {title}
      </div>
      {userType === "admin" && isActive ? (
        <div
          title="Delete this topic"
          className={style["delete-icon"]}
          onClick={() => {
            setDeleteModelActive(true);
          }}
        >
          <img src={deleteIco} alt="dele-btn" />
        </div>
      ) : (
        ""
      )}
    </div>
  );
}
const AddTopicBtn = function ({ setIsModelActive }) {
  return (
    <div
      className={style["add-topic-btn"]}
      onClick={() => {
        console.log("clicked");
        setIsModelActive(true);
      }}
    >
      + Add New Topic
    </div>
  );
};
