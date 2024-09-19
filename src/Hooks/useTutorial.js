import getTutorial from "../api/getTutorial";
import { useQuery } from "@tanstack/react-query";
const useTutorial = function (tutorialIdentifier, isAdmin) {
  const query = useQuery({
    queryKey: ["tutorial", tutorialIdentifier],
    queryFn: () => getTutorial(tutorialIdentifier, isAdmin),
    gcTime: 1000 * 5,
  });
  return { query };
};
export default useTutorial;
