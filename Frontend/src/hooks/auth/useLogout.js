import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../lib/api";
import toast from "react-hot-toast";

const useLogout = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      // Clear the authUser data completely instead of just invalidating
      queryClient.setQueryData(["authUser"], null);
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success("Logged out successfully.");
    },
    onError: (err) => {
      toast.error(
        err.response?.data?.message || "Logout failed. Please try again."
      );
    },
  });
  return { logoutMutation: mutate };
};

export default useLogout;
