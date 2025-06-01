import { useQuery } from "@tanstack/react-query";
import { getFriendRequests } from "../../lib/api";

const useIncomingFriendRequests = () => {
  const { data } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,
  });
  return { incomingFriendsReqs: data || [] };
};

export default useIncomingFriendRequests;
