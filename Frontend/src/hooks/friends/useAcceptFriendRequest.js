import { useMutation, useQueryClient } from "@tanstack/react-query";
import { acceptFriendRequest } from "../../lib/api";
import toast from "react-hot-toast";

const useAcceptFriendRequest = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
      toast.success("Friend request accepted successfully!");
    },
    onError: (err) => {
      toast.error(
        err.response?.data?.message || "Failed to accept friend request."
      );
    },
  });
  return { acceptRequestMutation: mutate, isAccepting: isPending };
};

export default useAcceptFriendRequest;
