import { useQuery } from "@tanstack/react-query";
import { getRecommendedUsers } from "../../lib/api";

const useRecommendedUsers = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getRecommendedUsers,
  });
  return { recommendedUsers: data || [], loadingUsers: isLoading };
};

export default useRecommendedUsers;
