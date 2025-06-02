import { useState } from "react";
import { useAuthUser, useOnboarding } from "../hooks";
import toast from "react-hot-toast";
import {
  CameraIcon,
  MapPinIcon,
  ShipWheelIcon,
  ShuffleIcon,
} from "lucide-react";
import { LANGUAGES } from "../constants";
import { Input } from "../components";

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

  const handleSubmit = (e) => {
    e.preventDefault();
    onboardingMutation(formState);
  };

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random() * 100) + 1; // Generate a number between 1-100
    const randomAvatarURL = `https://avatar.iran.liara.run/public/${idx}`;
    setFormState({ ...formState, profilePic: randomAvatarURL });
    toast.success("Random Profile Picture Generated");
  };
  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
      <div className="card bg-base-200 shadow-xl w-full max-w-3xl p-6 ">
        <div className=" card-body p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
            Complete Your Profile
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Profile Pic Container */}
            <div className="flex flex-col items-center justify-center space-y-4">
              {/* IMAGE PREVIEW */}
              <div className="size-32 rounded-full bg-base-300 overflow-hidden">
                {formState.profilePic ? (
                  <img
                    src={formState.profilePic}
                    alt="Profile Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <CameraIcon className="size-12 text-base-content opacity-40" />
                  </div>
                )}
              </div>

              {/* Generate Random Avatar BTN */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleRandomAvatar}
                  className="btn btn-accent"
                >
                  <ShuffleIcon className="size-4 mr-2" />
                  Generate Random Avatar
                </button>
              </div>
            </div>
            {/* FULL NAME */}
            <Input
              label="Full Name"
              type="text"
              name="fullName"
              placeholder="Your full name"
              value={formState.fullName}
              onChange={(e) =>
                setFormState({ ...formState, fullName: e.target.value })
              }
              required
            />
            {/* BIO */}
            <Input
              label="Bio"
              name="bio"
              placeholder="Tell others about yourself and your language learning goals"
              value={formState.bio}
              onChange={(e) =>
                setFormState({ ...formState, bio: e.target.value })
              }
              isTextarea={true}
              rows={4}
            />
            {/* Languages */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Native Language */}
              <Input
                label="Native Language"
                name="nativeLanguage"
                value={formState.nativeLanguage}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    nativeLanguage: e.target.value,
                  })
                }
                isSelect={true}
                defaultOption="Select your native language"
                required
              />

              {/* LEARNING LANGUAGE */}
              <Input
                label="Learning Language"
                name="learningLanguage"
                value={formState.learningLanguage}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    learningLanguage: e.target.value,
                  })
                }
                isSelect={true}
                defaultOption="Select language you're learning"
                required
              />
            </div>{" "}
            {/* LOCATION */}
            <Input
              label="Location"
              type="text"
              name="location"
              value={formState.location}
              onChange={(e) =>
                setFormState({ ...formState, location: e.target.value })
              }
              placeholder="City, Country"
              icon={<MapPinIcon className="size-5" />}
            />
            {/* SUBMIT BUTTON */}
            <button
              className="btn btn-primary w-full disabled:bg-primary/50 disabled:text-base-content"
              disabled={isPending}
              type="submit"
            >
              {!isPending ? (
                <>
                  <ShipWheelIcon className="size-5 mr-2" />
                  Complete Onboarding
                </>
              ) : (
                <>
                  <span className="loading loading-spinner loading-xs" />
                  Onboarding...
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default OnboardingPage;
