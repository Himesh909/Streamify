import { useMutation, useQueryClient } from "@tanstack/react-query";
import { rejectFriendRequest } from "../../lib/api";
import toast from "react-hot-toast";

const useRejectFriendRequest = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: rejectFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
      toast.success("Friend request rejected successfully!");
    },
    onError: (err) => {
      toast.error(
        err.response?.data?.message || "Failed to reject friend request."
      );
    },
  });
  return { rejectRequestMutation: mutate, isRejecting: isPending };
};

export default useRejectFriendRequest;
