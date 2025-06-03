import { useState, useCallback } from "react";
import { useAuthUser, useOnboarding } from "../hooks";
import toast from "react-hot-toast";
import { AuthForm } from "../components";

const OnboardingPage = () => {
  const { authUser } = useAuthUser();
  const { onboardingMutation, isPending } = useOnboarding();

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      onboardingMutation(formState);
    },
    [formState, onboardingMutation]
  );

  const handleRandomAvatar = useCallback(() => {
    const idx = Math.floor(Math.random() * 100) + 1; // Generate a number between 1-100
    const randomAvatarURL = `https://avatar.iran.liara.run/public/${idx}`;
    setFormState((prev) => ({ ...prev, profilePic: randomAvatarURL }));
    toast.success("Random Profile Picture Generated");
  }, []);

  return (
    <AuthForm
      isOnboard={true}
      formState={formState}
      setFormState={setFormState}
      handleFormSubmit={handleSubmit}
      isPending={isPending}
      handleRandomAvatar={handleRandomAvatar}
    />
  );
};

export default OnboardingPage;
