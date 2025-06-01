import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendFriendRequest } from "../../lib/api";

const useSendFriendRequest = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["outgoingFriendsReqs"] }),
  });
  return { sendRequestMutation: mutate, isPending };
};

export default useSendFriendRequest;
