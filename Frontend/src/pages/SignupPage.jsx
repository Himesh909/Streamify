import { useState } from "react";
import { ShipWheelIcon } from "lucide-react";
import { Link } from "react-router";
import { useSignup } from "../hooks";
import { Input } from "../components";

const SignupPage = () => {
  const [signupData, setSignupData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signupMutation, isPending, error } = useSignup();

  const handleSignup = (e) => {
    e.preventDefault();
    signupMutation(signupData);
  };

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  return (
    <div className="h-screen flex items-center justify-center p-4 sm:p-6 md-p8">
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
        {/* Signup Form - Left Side */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          {/* Logo */}
          <div className="mb-4 flex items-center justify-start gap-2">
            <ShipWheelIcon className="size-9 text-primary" />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
              Streamify
            </span>
          </div>

          {/* Error Message if any*/}
          {error && (
            <div className="alert alert-error mb-4">
              <span>{error.response.data.message}</span>
            </div>
          )}

          <div className="w-full">
            <form onSubmit={handleSignup}>
              <div className="space-y-4">
                <div>
                  <h2 className="text-xl font-semibold">Create an Account</h2>
                  <p className="text-sm opacity-70">
                    Join Streamify and start your Learning Advanture!
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {/* Full Name */}
                <Input
                  label="Full Name"
                  type="text"
                  placeholder="Jhon Doe"
                  value={signupData.fullName}
                  onChange={(e) =>
                    setSignupData({
                      ...signupData,
                      fullName: e.target.value,
                    })
                  }
                  required
                />

                {/* Email */}
                <Input
                  label="Email"
                  type="email"
                  placeholder="jhondoe@example.com"
                  value={signupData.email}
                  onChange={(e) =>
                    setSignupData({
                      ...signupData,
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
                    value={signupData.password}
                    onChange={(e) =>
                      setSignupData({
                        ...signupData,
                        password: e.target.value,
                      })
                    }
                    required
                    isPassword={true}
                  />
                </div>

                {/* Agree */}
                <div className="form-control">
                  <div className="flex items-center gap-2">
                    <label className="label cursor-pointer justify-start gap-2">
                      <input
                        type="checkbox"
                        className="checkbox checkbox-sm"
                        required
                        onClick={() => setIsButtonDisabled(!isButtonDisabled)}
                      />
                    </label>
                    <span className="text-xs leading-tight">
                      I agree to the{" "}
                      <span className="text-primary hover:underline hover:cursor-pointer">
                        terms of service
                      </span>{" "}
                      and{" "}
                      <span className="text-primary hover:underline hover:cursor-pointer">
                        privacy policy
                      </span>
                    </span>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="btn w-full btn-primary disabled:bg-primary/50 disabled:text-base-content"
                  disabled={
                    isButtonDisabled ||
                    isPending ||
                    !signupData.email ||
                    !signupData.password ||
                    !signupData.fullName
                  }
                >
                  {isPending ? (
                    <>
                      <span className="loading loading-spinner loading-xs" />
                      Loading...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </button>

                <div className="text-center mt-4">
                  <p className="text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary hover:underline">
                      Sign in
                    </Link>
                  </p>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
            {/* Illustration */}
            <div className="relative aspect-square max-w-sm mx-auto">
              <img
                src="/VideoCall/VideoCall.svg"
                alt="Language connection illustration"
                className="w-full h-full"
              />
            </div>

            <div className="text-center space-y-3 mt-6">
              <h2 className="text-xl font-semibold">
                Connect with language partners worldwide
              </h2>
              <p className="opacity-70">
                Practice conversations, make friends, and improve your language
                skills together
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
