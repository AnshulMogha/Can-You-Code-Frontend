import style from "./AdminTutorial.module.css";
import { default as ContentSection } from "../../components/Section/Section";
import SideBar from "../../components/Sidebar/Sidebar";
import { ScrollRestoration, useLocation, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "nprogress/nprogress.css";
import AddTopicModel from "../../components/AddTopicModel/AddTopicModel";
import DeleteModal from "../../components/DeleteModal/DeleteModal";
import deleteTopic from "../../api/deleteTopic";
import LoadingBlur from "../../components/LoadingBlur/LoadingBlur";
import APIErrorHandler from "../../utils/APIErrorHandler";
import OfflineIndicator from "../../components/OfflineIndictor/OfflineIndicator";
import useTutorial from "../../Hooks/useTutorial";
const AdminTutorial = function () {
  const [activeTopic, setActiveTopic] = useState(0);
  const { state } = useLocation();
  let { tutorialId, userType } = state || { userType: "admin" };
  const [isModelActive, setIsModelActive] = useState(false);
  const [isDeleteModelActive, setDeleteModelActive] = useState(false);
  const { tutTitle } = useParams();
  const tutorialIdentifier = tutorialId || tutTitle;

  useEffect(() => {
    setActiveTopic(0); // Reset active topic when a new tutorial is loaded
  }, [tutorialIdentifier]);

  const { query } = useTutorial(tutorialIdentifier, true);
  const { isLoading, isError, isPaused, data, error } = query;

  if (isLoading) return <LoadingBlur />;
  if (isError) return <APIErrorHandler error={error} userType={userType} />;
  if (isPaused) return <OfflineIndicator />;

  const { tutorial } = data.data;
  tutorialId = tutorial.id;
  const topic = (() => {
    const { topics } = tutorial;
    const isValidTopicIndex = topics.length > 0 && activeTopic < topics.length;

    return isValidTopicIndex ? topics[activeTopic] : {};
  })();

  return (
    <div className={style["admin-tut-page"]}>
      {isDeleteModelActive && (
        <DeleteModal
          setModalActive={setDeleteModelActive}
          entity={topic}
          entityType={"topic"}
          deleteFn={deleteTopic}
          queryKey={["tutorial", tutorialId]}
          tutorialId={tutorialId}
        />
      )}
      {isModelActive && (
        <AddTopicModel
          setIsModelActive={setIsModelActive}
          tutorialId={tutorialId}
          setActiveTopic={setActiveTopic}
          numOfTopic={tutorial.topics.length}
        />
      )}
      <div className={style["sidebar-con"]}>
        <SideBar
          topics={tutorial.topics}
          activeTopic={activeTopic}
          setActiveTopic={setActiveTopic}
          type={userType}
          setIsModelActive={setIsModelActive}
          setDeleteModelActive={setDeleteModelActive}
        />
      </div>
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

export default AdminTutorial;
