import { useMutation, useQueryClient } from "@tanstack/react-query";
import { acceptFriendRequest } from "../../lib/api";

const useAcceptFriendRequest = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    },
  });
  return { acceptRequestMutation: mutate, isAccepting: isPending };
};

export default useAcceptFriendRequest;
