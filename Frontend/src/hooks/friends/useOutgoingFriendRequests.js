import { useQuery } from "@tanstack/react-query";
import { getOutgoingFriendReqs } from "../../lib/api";

const useOutgoingFriendRequests = () => {
  const { data } = useQuery({
    queryKey: ["outgoingFriendsReqs"],
    queryFn: getOutgoingFriendReqs,
  });
  return { outgoingFriendsReqs: data || [] };
};

export default useOutgoingFriendRequests;
