import { useQuery } from "@tanstack/react-query";
import getAuthStatus from "../api/getAuthStatus";
function useAuthentication() {
  const query = useQuery({
    queryKey: ["userAuthStatus"],
    queryFn: getAuthStatus,
    refetchInterval: 1000 * 20,
  });
  return query;
}
export default useAuthentication;
