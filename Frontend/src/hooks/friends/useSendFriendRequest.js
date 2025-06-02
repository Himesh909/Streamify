import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendFriendRequest } from "../../lib/api";
import toast from "react-hot-toast";

const useSendFriendRequest = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["outgoingFriendsReqs"] });
      toast.success("Friend request sent successfully!");
    },
    onError: (err) => {
      toast.error(
        err.response?.data?.message || "Failed to send friend request."
      );
    },
  });
  return { sendRequestMutation: mutate, isPending };
};

export default useSendFriendRequest;
