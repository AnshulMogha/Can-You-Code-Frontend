import getTutorials from "../api/getTutorials";
import { useQuery } from "@tanstack/react-query";

const useTutorials = function (isAdmin) {
  const queryKey = isAdmin ? ["adminTutorials"] : ["userTutorials"];

  const query = useQuery({
    queryKey,
    queryFn: () => {
      return getTutorials(isAdmin);
    },
  });
  return { query, queryKey };
};
export default useTutorials;
