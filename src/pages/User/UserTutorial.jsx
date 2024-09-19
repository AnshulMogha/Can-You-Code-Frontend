import style from "./UserTutorial.module.css";
import { default as ContentSection } from "../../components/Section/Section";
import SideBar from "../../components/Sidebar/Sidebar";
import { ScrollRestoration, useLocation, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import LoadingBlur from "../../components/LoadingBlur/LoadingBlur";
import OfflineIndicator from "../../components/OfflineIndictor/OfflineIndicator";
import APIErrorHandler from "../../utils/APIErrorHandler";
import useTutorial from "../../Hooks/useTutorial";

const UserTutorial = function () {
  const [activeTopic, setActiveTopic] = useState(0);
  const [isSidebarOpen, toggleSidebar] = useState(true);
  const { state } = useLocation();
  const { tutorialId, userType } = state || {};
  const { tutTitle } = useParams();
  const tutorialIdentifier = tutorialId || tutTitle;
  useEffect(() => {
    setActiveTopic(0); // Reset active topic when a new tutorial is loaded
  }, [tutorialIdentifier]);
  const { query } = useTutorial(tutorialIdentifier, false);
  const { isLoading, isError, isPaused, data, error } = query;
  if (isLoading) return <LoadingBlur />;
  if (isError) return <APIErrorHandler error={error} />;
  if (isPaused) return <OfflineIndicator />;
  const { tutorial } = data.data;
  const topic = (() => {
    const { topics } = tutorial;
    const isValidTopicIndex = topics.length > 0 && activeTopic < topics.length;
    return isValidTopicIndex ? topics[activeTopic] : {};
  })();
  function handleToggle() {
    toggleSidebar(!isSidebarOpen);
  }

  return (
    <div className={style["user-tut-page"]}>
      {!isSidebarOpen && (
        <div className={style["sidebar-toggle"]} onClick={handleToggle}>
          {">"}
        </div>
      )}
      {isSidebarOpen && (
        <div className={style["sidebar-con"]}>
          <SideBar
            topics={tutorial.topics}
            activeTopic={activeTopic}
            setActiveTopic={setActiveTopic}
            type={userType}
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={toggleSidebar}
          />
        </div>
      )}
      <div className={style["section-con"]}>
        <ContentSection
          tutorialId={tutorialId}
          type={userType}
          topic={topic}
          topicInfo={{
            numOfTopics: tutorial.topics.length,
            activeTopic,
            setActiveTopic,
          }}
          key={topic._id}
        />
      </div>
      <ScrollRestoration />
    </div>
  );
};

export default UserTutorial;
