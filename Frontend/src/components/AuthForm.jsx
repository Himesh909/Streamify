import { useState } from "react";
import { Input, Button, Agree } from "../components";
import { Link } from "react-router";
import { CameraIcon, MapPinIcon, ShuffleIcon } from "lucide-react";

const AuthForm = ({
  formState,
  setFormState,
  handleFormSubmit,
  isSignup = false,
  isLogin = false,
  isOnboard = false,
  isPending,
  handleRandomAvatar,
}) => {
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  return (
    <>
      {(isSignup || isLogin) && (
        <div className="w-full">
          <form onSubmit={handleFormSubmit}>
            <div className="space-y-4">
              <div>
                <h2 className="text-xl font-semibold">
                  {isSignup
                    ? "Create an Account"
                    : isLogin
                    ? "Welcome Back"
                    : ""}
                </h2>
                <p className="text-sm opacity-70">
                  {isSignup
                    ? "Join Streamify and start your Learning Advanture!"
                    : isLogin
                    ? "Sign in to your account to continue your language journey"
                    : ""}
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {/* Full Name */}
              {isSignup && (
                <Input
                  label="Full Name"
                  type="text"
                  placeholder="Jhon Doe"
                  value={formState.fullName}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      fullName: e.target.value,
                    })
                  }
                  required
                />
              )}

              {/* Email */}
              <Input
                label="Email"
                type="email"
                placeholder="jhondoe@example.com"
                value={formState.email}
                onChange={(e) =>
                  setFormState({
                    ...formState,
                    email: e.target.value,
                  })
                }
                required
              />

              {/* Password */}
              <div className="form-control w-full">
                <Input
                  label="Password"
                  placeholder="********"
                  value={formState.password}
                  onChange={(e) =>
                    setFormState({
                      ...formState,
                      password: e.target.value,
                    })
                  }
                  required
                  isPassword={true}
                />
              </div>

              {/* Agree */}
              {isSignup && (
                <Agree
                  isButtonDisabled={isButtonDisabled}
                  setIsButtonDisabled={setIsButtonDisabled}
                />
              )}

              {/* Submit Button */}
              <Button
                disabled={
                  isPending ||
                  !formState?.email ||
                  !formState?.password ||
                  (isSignup && !formState?.fullName) ||
                  (isSignup && isButtonDisabled)
                }
                isPending={isPending}
                isSignup={isSignup}
                isLogin={isLogin}
              />

              <div className="text-center mt-4">
                <p className="text-sm">
                  {isSignup
                    ? "Already have an account? "
                    : isLogin
                    ? "Don't have an account? "
                    : ""}
                  <Link
                    to={`/${isSignup ? "login" : isLogin ? "signup" : ""}`}
                    className="text-primary hover:underline"
                  >
                    {isSignup ? "Sign in" : isLogin ? "Create one" : ""}
                  </Link>
                </p>
              </div>
            </div>
          </form>
        </div>
      )}
      {isOnboard && (
        <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
          <div className="card bg-base-200 shadow-xl w-full max-w-3xl p-6 ">
            <div className=" card-body p-6 sm:p-8">
              <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
                Complete Your Profile
              </h1>

              <form onSubmit={handleFormSubmit} className="space-y-6">
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
                <Button
                  disabled={
                    isPending ||
                    !formState.fullName ||
                    !formState.bio ||
                    !formState.nativeLanguage ||
                    !formState.learningLanguage ||
                    !formState.location
                  }
                  isPending={isPending}
                  idOnboarding={true}
                />
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AuthForm;
