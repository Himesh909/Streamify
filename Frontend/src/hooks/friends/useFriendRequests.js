import { useQuery } from "@tanstack/react-query";
import { getFriendRequests } from "../../lib/api";

const useFriendRequests = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  });
  const incomingRequests = data?.incomingReqs || [];
  const acceptedRequests = data?.acceptedReqs || [];
  return { incomingRequests, acceptedRequests, isLoading };
};

export default useFriendRequests;
