import { useMutation, useQueryClient } from "@tanstack/react-query";
import { rejectFriendRequest } from "../../lib/api";

const useRejectFriendRequest = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: rejectFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });
  return { rejectRequestMutation: mutate, isRejecting: isPending };
};

export default useRejectFriendRequest;
