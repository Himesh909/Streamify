import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../../lib/api";
import toast from "react-hot-toast";

const useLogin = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success("Logged in successfully! Welcome back to Streamify.");
    },
    onError: (err) => {
      toast.error(
        err.response?.data?.message || "Login failed. Please try again."
      );
    },
  });
  return { loginMutation: mutate, isPending };
};

export default useLogin;
