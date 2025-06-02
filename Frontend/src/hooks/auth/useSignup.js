import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup } from "../../lib/api";
import toast from "react-hot-toast";

const useSignup = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success("Account created successfully! Welcome to Streamify.");
    },
    onError: (err) => {
      toast.error(
        err.response?.data?.message || "Signup failed. Please try again."
      );
    },
  });
  return { signupMutation: mutate, isPending };
};

export default useSignup;
