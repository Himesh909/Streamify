import { useMutation, useQueryClient } from "@tanstack/react-query";
import { completeOnBoarding } from "../../lib/api";
import toast from "react-hot-toast";

const useOnboarding = () => {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: completeOnBoarding,
    onSuccess: () => {
      toast.success("Profile Onboarded Successfully");
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message);
    },
  });
  return { onboardingMutation: mutate, isPending };
};

export default useOnboarding;
